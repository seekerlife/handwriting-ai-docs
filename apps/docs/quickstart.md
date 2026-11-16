# Quickstart

Create a handwritten page and download it. You need an API key first. [Request access](https://handwriting-ai.com/api-access), and use the key from the reply.

The base URL is `https://api.handwriting-ai.com`.

## Create a JPEG

```bash
curl -sS https://api.handwriting-ai.com/v1/renders \
  -H "Authorization: Bearer hw_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Thank you for your order.",
    "font_id": "caveat",
    "page_size": "a4",
    "paper": "college-ruled",
    "realism": "natural",
    "output": { "format": "jpeg", "dpi": 150 }
  }'
```

A successful response looks like this:

```json
{
  "request_id": "req_01h2abc",
  "seed": 18492011,
  "font_id": "caveat",
  "font_size_pt": 22,
  "page_count": 1,
  "unsupported_characters": [],
  "expires_at": "2026-11-11T09:15:00Z",
  "pages": [
    {
      "page": 1,
      "width": 1240,
      "height": 1754,
      "media_type": "image/jpeg",
      "url": "https://files.handwriting-ai.com/r/req_01h2abc/page-1.jpg?sig=example"
    }
  ]
}
```

Download `pages[0].url` with a normal GET. Do not send the API key to that address. The link stops working at `expires_at`.

## Node.js

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

`save` writes the file in Node.js. In a browser, call `download()` and use the bytes yourself.

## Create a PDF

Use the same endpoint with `output.format` set to `pdf`. The response contains one `file.url` for the whole document, including every page.

```bash
curl -sS https://api.handwriting-ai.com/v1/renders \
  -H "Authorization: Bearer hw_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Dear Emma,\n\nThank you for trusting us with the repair.",
    "font_id": "patrick-hand",
    "page_size": "letter",
    "output": { "format": "pdf", "dpi": 300 }
  }'
```

Save the seed from the response when you want the same handwriting again. Send it back as `seed` with the same text and settings.

Next: [Authentication](/authentication) and the [render call](/renders).
