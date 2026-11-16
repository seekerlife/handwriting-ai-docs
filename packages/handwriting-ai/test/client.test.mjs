import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { HandwritingAI, HandwritingAIError } from "../dist/index.js";

const jpegBody = {
  request_id: "req_jpeg",
  seed: 7,
  font_id: "caveat",
  font_size_pt: 22,
  page_count: 1,
  unsupported_characters: [],
  expires_at: "2026-11-11T09:15:00Z",
  pages: [
    {
      page: 1,
      width: 1240,
      height: 1754,
      media_type: "image/jpeg",
      url: "https://files.handwriting-ai.com/page-1.jpg",
    },
  ],
};

function client(handler) {
  return new HandwritingAI({
    apiKey: "hw_live_test",
    baseUrl: "https://api.handwriting-ai.com",
    fetch: handler,
  });
}

test("create posts the render body and attaches a download", async () => {
  const calls = [];
  const api = client(async (url, init) => {
    calls.push({ url, init });
    if (String(url).endsWith("/page-1.jpg")) {
      return new Response(Uint8Array.from([1, 2, 3]), { status: 200 });
    }
    return Response.json(jpegBody, { status: 200, headers: { "x-request-id": "req_jpeg" } });
  });

  const result = await api.renders.create(
    {
      text: "Hello",
      font_id: "caveat",
      page_size: "a4",
      paper: "college-ruled",
      realism: "natural",
      output: { format: "jpeg", dpi: 150 },
      seed: undefined,
    },
    { requestId: "app-1" },
  );

  const request = calls[0];
  assert.equal(request.url, "https://api.handwriting-ai.com/v1/renders");
  assert.equal(request.init.headers.get("authorization"), "Bearer hw_live_test");
  assert.equal(request.init.headers.get("x-request-id"), "app-1");
  const body = JSON.parse(request.init.body);
  assert.equal(body.text, "Hello");
  assert.equal(body.paper, "college-ruled");
  assert.equal("seed" in body, false);

  assert.equal(result.pages[0].url, jpegBody.pages[0].url);
  const bytes = await result.pages[0].download();
  assert.equal(calls[1].init.headers, undefined);
  assert.deepEqual([...bytes], [1, 2, 3]);
});

test("pdf responses expose one file link", async () => {
  const api = client(async () => Response.json({
    request_id: "req_pdf",
    seed: 3,
    font_id: "patrick-hand",
    font_size_pt: 22,
    page_count: 4,
    unsupported_characters: ["字"],
    expires_at: "2026-11-11T09:15:00Z",
    file: { media_type: "application/pdf", url: "https://files.handwriting-ai.com/letter.pdf" },
  }));
  const result = await api.renders.create({ text: "A letter", output: { format: "pdf" } });
  assert.equal(result.file.url, "https://files.handwriting-ai.com/letter.pdf");
  assert.equal(result.pages, undefined);
  assert.deepEqual(result.unsupported_characters, ["字"]);
});

test("status does not send the API key", async () => {
  let authorization;
  const api = client(async (_url, init) => {
    authorization = init.headers.get("authorization");
    return Response.json({ status: "ok", version: "1.0.0" });
  });
  const status = await api.status();
  assert.equal(status.version, "1.0.0");
  assert.equal(authorization, null);
});

test("an API error keeps the code and field details", async () => {
  const api = client(async () => Response.json({
    error: {
      code: "access_not_enabled",
      message: "Rendering is not enabled for this key.",
      request_id: "req_denied",
    },
  }, { status: 403, headers: { "x-request-id": "req_denied" } }));

  await assert.rejects(
    () => api.renders.create({ text: "Hello" }),
    (error) => {
      assert.ok(error instanceof HandwritingAIError);
      assert.equal(error.status, 403);
      assert.equal(error.code, "access_not_enabled");
      assert.equal(error.requestId, "req_denied");
      return true;
    },
  );
});

test("empty text fails before a request", async () => {
  let called = false;
  const api = client(async () => {
    called = true;
    return Response.json(jpegBody);
  });
  await assert.rejects(
    () => api.renders.create({ text: "" }),
    (error) => error instanceof HandwritingAIError && error.code === "validation_error",
  );
  assert.equal(called, false);
});

test("save writes the downloaded bytes", async () => {
  const api = client(async (url) => {
    if (String(url).endsWith(".jpg")) return new Response(Uint8Array.from([9, 9]), { status: 200 });
    return Response.json(jpegBody);
  });
  const result = await api.renders.create({ text: "Hello" });
  const directory = await mkdtemp(join(tmpdir(), "handwriting-ai-"));
  const file = join(directory, "note.jpg");
  try {
    await result.pages[0].save(file);
    assert.deepEqual([...(await readFile(file))], [9, 9]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
