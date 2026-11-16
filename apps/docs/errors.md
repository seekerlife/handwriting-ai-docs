# Errors

Errors are JSON. The HTTP status and `error.code` tell you what to do next.

```json
{
  "error": {
    "code": "validation_error",
    "message": "font_size_pt must be from 8 to 72.",
    "request_id": "req_01h2err",
    "details": [
      { "field": "font_size_pt", "code": "out_of_range" }
    ]
  }
}
```

`X-Request-ID` is present on every response. Use `error.request_id` when it is in the body, and the header otherwise.

## Codes

| HTTP | code | What happened |
| --- | --- | --- |
| 401 | `unauthorized` | The API key is missing or not recognized. |
| 403 | `access_not_enabled` | The key cannot render yet. Email support@handwriting-ai.com. |
| 403 | `feature_not_enabled` | The key cannot use this font, paper, or realism setting. |
| 404 | `font_not_found` | `font_id` is not in the catalog. |
| 422 | `validation_error` | A field is missing or not usable. Read `details`. |
| 422 | `page_limit_exceeded` | The text needs more pages than this format allows. |
| 429 | `rate_limited` | The key sent more than 30 render requests in a minute. |
| 429 | `quota_exceeded` | The key has used its page allowance. |
| 500 | `server_error` | The render did not finish. No pages were counted. Send the request again. |

## Field details

`details` lists the fields to change. Common detail codes are:

| code | Meaning |
| --- | --- |
| `required` | The field is missing. |
| `out_of_range` | The number is outside the documented range. |
| `invalid_enum` | The value is not one of the allowed names. |
| `invalid_format` | The string does not match the expected format, such as a hex color. |
| `too_long` | The text is longer than the format allows. |
| `too_many_pages` | The text needs more pages than the format allows. |
| `unknown` | The id is not in the catalog. |
| `incompatible` | The combination is not available, such as a transparent JPEG. |

Field names use the request path, such as `output.background` or `margins_mm.left`.

## Rate and allowance

For `rate_limited`, wait the number of seconds in the `Retry-After` header, then send the request again.

For `quota_exceeded`, read `reset_at`. Creating the render again before the allowance resets returns the same error. `limit` and `used` show the allowance for the current period.

A `server_error` means the render did not finish. No page allowance is consumed. Send the request again. Include the same `seed` if you already chose one.
