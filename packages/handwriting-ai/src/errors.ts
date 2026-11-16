import type { ErrorDetail } from "./types.js";

export class HandwritingAIError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId?: string;
  readonly details?: ErrorDetail[];
  readonly limit?: number;
  readonly used?: number;
  readonly resetAt?: string;
  readonly retryAfter?: number;

  constructor(options: {
    message: string;
    status: number;
    code: string;
    requestId?: string;
    details?: ErrorDetail[];
    limit?: number;
    used?: number;
    resetAt?: string;
    retryAfter?: number;
  }) {
    super(options.message);
    this.name = "HandwritingAIError";
    this.status = options.status;
    this.code = options.code;
    this.requestId = options.requestId;
    this.details = options.details;
    this.limit = options.limit;
    this.used = options.used;
    this.resetAt = options.resetAt;
    this.retryAfter = options.retryAfter;
  }
}
