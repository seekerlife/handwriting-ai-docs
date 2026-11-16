# Limits

Limits keep one render call bounded. A key also has its own monthly page allowance, which is confirmed when the key is issued.

## Pages and text

| Format | Pages | Characters |
| --- | --- | --- |
| JPEG | 8 | 20,000 |
| PNG | 8 | 20,000 |
| PDF | 40 | 40,000 |

Characters include line breaks. The count is the number of Unicode scalar values in `text`.

If the text would flow onto more pages than the format allows, the API returns `422` `page_limit_exceeded` and does not create a file. With `font_size_pt` set to `auto`, the service first reduces the type down to 8 points. If the text still does not fit, the same error is returned.

A successful JPEG or PNG counts each page toward the key's page allowance. A successful PDF counts `page_count`. A failed request does not count.

## Rate

Each key can make 30 render requests per rolling minute. `GET /v1/status` does not count toward that limit.

When the limit is reached, the API returns `429` `rate_limited` and a `Retry-After` header with the seconds to wait. These headers are included on render responses after the rate check:

| Header | Meaning |
| --- | --- |
| `X-RateLimit-Limit` | Requests allowed in the current window |
| `X-RateLimit-Remaining` | Requests left in the current window |
| `X-RateLimit-Reset` | Unix time, in seconds, when the window resets |

## Page allowance

Each key has a monthly allowance of successful pages. The allowance is part of the access you were issued. It is not a website subscription quota.

When the allowance is spent, the API returns `429` `quota_exceeded`. The body includes `limit`, `used`, and `reset_at`. Wait until `reset_at` or ask for a higher allowance. This response does not include `Retry-After`.

## Links

Every URL in a render response works until `expires_at`, 15 minutes after the response. Download the files before then. To get a fresh link, send the render request again. Include the previous `seed` when you want the same handwriting.

## Calls

The render call stays open until the files are ready. Give the HTTP client at least 90 seconds. The official client uses that timeout unless you pass your own `signal`.
