# Render

`POST /v1/renders` creates the handwritten files for one piece of text.

The call stays open until the files are ready. Allow at least 90 seconds. The JSON body of the response holds download links. Fetch each link before `expires_at`, which is 15 minutes after the response.

`text` is plain text. A single `\n` is a line break. A blank line, `\n\n`, starts a new paragraph. Headings, lists, tables, and formulas from the web editor are not part of this request.

## Images

Set `output.format` to `jpeg` or `png`. The default is `jpeg`.

The response includes `pages`. Each item is one page, in reading order, with its own `url`, pixel `width`, and pixel `height`.

An image request can produce at most 8 pages and can contain at most 20,000 characters. If the text needs more pages, the API returns `422` `page_limit_exceeded`. Shorten the text, raise the font size only when you mean to, or request a PDF.

`output.background` chooses what is behind the ink:

| Value | Result |
| --- | --- |
| `paper` | The selected paper and tint. This is the default. |
| `transparent` | Ink only. PNG only. |

JPEG always uses the paper. A transparent JPEG returns `validation_error`.

## PDF

Set `output.format` to `pdf`. The response includes `file.url`. That one file contains every page. `page_count` tells you how many pages are inside it.

A PDF can contain at most 40 pages and 40,000 characters. The PDF uses the paper background. `transparent` is not available for PDF.

Use a PDF when the piece is a letter or another document you want as one file. Use JPEG or PNG when you want a page image.

## What comes back

| Field | Meaning |
| --- | --- |
| `request_id` | Id for this call. Quote it if you write to support. |
| `seed` | The variation that was drawn. Send it again to repeat that handwriting. |
| `font_id` | The font that was used. |
| `font_size_pt` | The size that was used. When you send `auto`, this is the size that fit. |
| `page_count` | Number of pages in the result. |
| `unsupported_characters` | Characters the font could not draw. An empty array means every character was drawn. |
| `expires_at` | When the links stop working. |
| `pages` | JPEG or PNG files, one per page. |
| `file` | The PDF, when you asked for one. |

The same `text`, font, page settings, and `seed` produce the same handwriting. Omit `seed` when you want a new variation. The response still includes the seed that was chosen.

## A longer letter

```json
{
  "text": "Dear Emma,\n\nThank you for trusting us with the repair.\n\nThe work is finished, and the invoice is enclosed.",
  "font_id": "patrick-hand",
  "font_size_pt": 18,
  "page_size": "letter",
  "paper": "plain",
  "margins_mm": { "top": 20, "right": 18, "bottom": 20, "left": 18 },
  "realism": "natural",
  "output": { "format": "pdf", "dpi": 300 }
}
```

Page size, paper, and margins are described in [Page setup](/page-setup). Fonts and variation are described in [Handwriting](/handwriting).
