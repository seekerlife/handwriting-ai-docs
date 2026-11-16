# handwriting-ai

Official client for the [Handwriting AI](https://handwriting-ai.com) text-to-handwriting API.

One request creates a handwritten JPEG, PNG, or PDF. The response returns a short-lived download link for each file. The guide is at [docs.handwriting-ai.com](https://docs.handwriting-ai.com). Request a key at [handwriting-ai.com/api-access](https://handwriting-ai.com/api-access).

```bash
npm install handwriting-ai
```

```js
import { HandwritingAI } from "handwriting-ai";

const client = new HandwritingAI({
  apiKey: process.env.HANDWRITING_AI_API_KEY,
});

const result = await client.renders.create({
  text: "Thank you for your order.",
  font_id: "caveat",
  page_size: "a4",
  paper: "college-ruled",
  realism: "natural",
  output: { format: "jpeg", dpi: 150 },
});

await result.pages[0].save("note.jpg");
```

`save` writes the file in Node.js 18 or newer. `download()` returns the bytes and works wherever `fetch` is available. Download links expire at `result.expires_at`, 15 minutes after the response. The download does not use the API key.

For a PDF, set `output.format` to `"pdf"` and save `result.file`.

Failed calls throw `HandwritingAIError` with `status`, `code`, and `requestId`. A key that is not enabled yet fails with `access_not_enabled`.

The API reference and OpenAPI description live in the [docs](https://docs.handwriting-ai.com/reference). The service terms are at [handwriting-ai.com/terms](https://handwriting-ai.com/terms). This package is MIT licensed.
