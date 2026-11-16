# Node.js client

The official client is the `handwriting-ai` package. It calls `POST /v1/renders` and downloads the returned links.

```bash
npm install handwriting-ai
```

The package requires Node.js 18 or newer. It uses the global `fetch` implementation.

```js
import { HandwritingAI, HandwritingAIError } from "handwriting-ai";

const client = new HandwritingAI({
  apiKey: process.env.HANDWRITING_AI_API_KEY,
});

try {
  const result = await client.renders.create({
    text: "Thank you for your order.",
    font_id: "caveat",
    page_size: "a4",
    paper: "college-ruled",
    realism: "natural",
    output: { format: "jpeg", dpi: 150 },
  });

  console.log(result.seed, result.expires_at);
  await result.pages[0].save("note.jpg");
} catch (error) {
  if (error instanceof HandwritingAIError) {
    console.error(error.status, error.code, error.requestId);
  } else {
    throw error;
  }
}
```

## Methods

`client.renders.create(request, options)` sends the [render request](/reference). `options.requestId` becomes the `X-Request-ID` header. `options.signal` cancels the call. Without a signal, the client stops waiting after 90 seconds.

The returned object uses the same field names as the JSON response. JPEG and PNG results include `pages`. PDF results include `file`.

`page.download()` and `file.download()` fetch the link and return a `Uint8Array`. They do not send the API key.

`save(filePath)` downloads the file and writes it. It is for Node.js. Pass your own path. The client does not choose a filename.

`client.status()` calls `GET /v1/status` and does not send the API key.

## Errors

Failed responses throw `HandwritingAIError`.

| Property | Meaning |
| --- | --- |
| `status` | HTTP status. `0` means the call did not receive an HTTP response. |
| `code` | API error code, or `network_error`, `invalid_response`, or `download_failed`. |
| `requestId` | Response request id, when the server sent one. |
| `details` | Field errors for `validation_error`. |
| `retryAfter` | Seconds to wait after `rate_limited`. |
| `limit`, `used`, `resetAt` | Page allowance details for `quota_exceeded`. |

`download_failed` means the render succeeded and the later file download did not. Create the render again if the link has expired.

## Another host

```js
const client = new HandwritingAI({
  apiKey: process.env.HANDWRITING_AI_API_KEY,
  baseUrl: "https://api.handwriting-ai.com",
});
```

Use `baseUrl` only when you have been given a different API host. The default is `https://api.handwriting-ai.com`.
