import { HandwritingAIError } from "./errors.js";
import type {
  CallOptions,
  DownloadOptions,
  Downloadable,
  ErrorBody,
  RenderFile,
  RenderPage,
  RenderRequest,
  RenderResult,
  StatusResult,
} from "./types.js";

const DEFAULT_BASE_URL = "https://api.handwriting-ai.com";
const REQUEST_TIMEOUT_MS = 90_000;

export type HandwritingAIOptions = {
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
};

type PageJson = {
  page: number;
  width: number;
  height: number;
  media_type: "image/jpeg" | "image/png";
  url: string;
};

type FileJson = {
  media_type: "application/pdf";
  url: string;
};

export class HandwritingAI {
  readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;

  readonly renders: {
    create: (request: RenderRequest, options?: CallOptions) => Promise<RenderResult>;
  };

  constructor(options: HandwritingAIOptions) {
    const apiKey = options.apiKey?.trim();
    if (!apiKey) {
      throw new HandwritingAIError({
        message: "An API key is required.",
        status: 0,
        code: "unauthorized",
      });
    }
    this.apiKey = apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.renders = {
      create: (request, callOptions) => this.createRender(request, callOptions),
    };
  }

  status(options?: CallOptions): Promise<StatusResult> {
    return this.request("/v1/status", { method: "GET", signal: options?.signal, auth: false });
  }

  private async createRender(request: RenderRequest, options?: CallOptions): Promise<RenderResult> {
    if (typeof request.text !== "string" || request.text.length === 0) {
      throw new HandwritingAIError({
        message: "text is required.",
        status: 422,
        code: "validation_error",
        details: [{ field: "text", code: "required" }],
      });
    }

    const body = await this.request<Record<string, unknown>>("/v1/renders", {
      method: "POST",
      body: compact(request),
      signal: options?.signal,
      requestId: options?.requestId,
      auth: true,
    });
    return this.toResult(body);
  }

  private toResult(body: Record<string, unknown>): RenderResult {
    const pages = Array.isArray(body.pages) && body.pages.length > 0
      ? body.pages.map((page) => this.toPage(page))
      : undefined;
    const file = body.file && typeof body.file === "object" ? this.toFile(body.file) : undefined;
    if (!pages && !file) {
      throw new HandwritingAIError({
        message: "The render response did not include a download URL.",
        status: 200,
        code: "invalid_response",
        requestId: typeof body.request_id === "string" ? body.request_id : undefined,
      });
    }

    return {
      request_id: requiredString(body.request_id, "request_id"),
      seed: requiredNumber(body.seed, "seed"),
      font_id: requiredString(body.font_id, "font_id"),
      font_size_pt: requiredNumber(body.font_size_pt, "font_size_pt"),
      page_count: requiredNumber(body.page_count, "page_count"),
      unsupported_characters: stringList(body.unsupported_characters),
      expires_at: requiredString(body.expires_at, "expires_at"),
      ...(pages ? { pages } : {}),
      ...(file ? { file } : {}),
    };
  }

  private toPage(value: unknown): RenderPage {
    const page = record(value, "pages");
    return {
      page: requiredNumber(page.page, "page"),
      width: requiredNumber(page.width, "width"),
      height: requiredNumber(page.height, "height"),
      media_type: page.media_type === "image/png" ? "image/png" : "image/jpeg",
      ...this.downloadable(requiredString(page.url, "url")),
    };
  }

  private toFile(value: unknown): RenderFile {
    const file = record(value, "file");
    return {
      media_type: "application/pdf",
      ...this.downloadable(requiredString(file.url, "url")),
    };
  }

  private downloadable(url: string): Downloadable {
    return {
      url,
      download: (options) => this.download(url, options),
      save: async (filePath) => {
        const bytes = await this.download(url);
        const { writeFile } = await import("node:fs/promises");
        await writeFile(filePath, bytes);
      },
    };
  }

  private async download(url: string, options?: DownloadOptions): Promise<Uint8Array> {
    let response: Response;
    try {
      response = await this.fetchImpl(url, { signal: withTimeout(options?.signal) });
    } catch (error) {
      throw networkError(error);
    }
    if (!response.ok) {
      throw new HandwritingAIError({
        message: `Download failed with status ${response.status}.`,
        status: response.status,
        code: "download_failed",
      });
    }
    return new Uint8Array(await response.arrayBuffer());
  }

  private async request<T>(
    path: string,
    options: {
      method: "GET" | "POST";
      body?: unknown;
      signal?: AbortSignal;
      requestId?: string;
      auth: boolean;
    },
  ): Promise<T> {
    const headers = new Headers();
    if (options.auth) headers.set("authorization", `Bearer ${this.apiKey}`);
    if (options.body !== undefined) headers.set("content-type", "application/json");
    if (options.requestId) headers.set("x-request-id", options.requestId);
    headers.set("accept", "application/json");
    headers.set("user-agent", "handwriting-ai/0.1.0");

    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}${path}`, {
        method: options.method,
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: withTimeout(options.signal),
      });
    } catch (error) {
      throw networkError(error);
    }

    const requestId = response.headers.get("x-request-id") ?? undefined;
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw errorFromResponse(response, payload, requestId);
    if (!payload || typeof payload !== "object") {
      throw new HandwritingAIError({
        message: "The API returned an unreadable response.",
        status: response.status,
        code: "invalid_response",
        requestId,
      });
    }
    return payload as T;
  }
}

function compact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(compact);
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      if (item === undefined) continue;
      result[key] = compact(item);
    }
    return result;
  }
  return value;
}

function withTimeout(signal?: AbortSignal): AbortSignal {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  if (!signal) return timeout;
  if (typeof AbortSignal.any === "function") return AbortSignal.any([signal, timeout]);
  return signal;
}

function networkError(error: unknown): HandwritingAIError {
  if (error instanceof HandwritingAIError) return error;
  const message = error instanceof Error ? error.message : "The request could not be completed.";
  return new HandwritingAIError({ message, status: 0, code: "network_error" });
}

function errorFromResponse(response: Response, payload: unknown, requestId: string | undefined): HandwritingAIError {
  const error = payload && typeof payload === "object" && "error" in payload
    ? (payload as { error?: ErrorBody }).error
    : undefined;
  const retryHeader = response.headers.get("retry-after");
  const retryAfter = numberOrUndefined(error?.retry_after) ?? (retryHeader ? Number(retryHeader) : undefined);
  return new HandwritingAIError({
    message: error?.message || `Request failed with status ${response.status}.`,
    status: response.status,
    code: error?.code || "request_failed",
    requestId: error?.request_id || requestId,
    details: error?.details,
    limit: error?.limit,
    used: error?.used,
    resetAt: error?.reset_at,
    retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
  });
}

function record(value: unknown, field: string): Record<string, unknown> {
  if (!value || typeof value !== "object") {
    throw new HandwritingAIError({
      message: `The render response is missing ${field}.`,
      status: 200,
      code: "invalid_response",
    });
  }
  return value as Record<string, unknown>;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new HandwritingAIError({
      message: `The render response is missing ${field}.`,
      status: 200,
      code: "invalid_response",
    });
  }
  return value;
}

function requiredNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new HandwritingAIError({
      message: `The render response is missing ${field}.`,
      status: 200,
      code: "invalid_response",
    });
  }
  return value;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function numberOrUndefined(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
