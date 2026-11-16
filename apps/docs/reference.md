# Request and response

`POST https://api.handwriting-ai.com/v1/renders`

`Content-Type: application/json`

`Authorization: Bearer hw_live_...`

The machine-readable description is [`openapi.yaml`](/openapi.yaml). This page lists the same fields in one place. Guides for each group are [Render](/renders), [Page setup](/page-setup), and [Handwriting](/handwriting).

## Request

Only `text` is required. Omitted fields use the defaults below.

| Field | Type | Default | Constraint |
| --- | --- | --- | --- |
| `text` | string |  | 1–20,000 characters for JPEG or PNG. 1–40,000 for PDF. |
| `font_id` | string | `caveat` | A catalog id, or a private id enabled on the key. |
| `font_size_pt` | number or `"auto"` | `22` | 8–72. |
| `max_font_size_pt` | number | `36` | 8–72. Used when the size is `auto`. |
| `page_size` | string | `a4` | See [Page setup](/page-setup). |
| `orientation` | string | `portrait` | `portrait` or `landscape`. |
| `paper` | string | `plain` | See [Page setup](/page-setup). |
| `tint` | string | `white` | `white`, `cream`, `aged`, `dark`. |
| `grid_size` | string | `small` | `small` or `large`, for `grid` and `dots`. |
| `alignment` | string | `left` | `left`, `center`, `right`. |
| `direction` | string | `auto` | `auto`, `ltr`, `rtl`. |
| `margins_mm` | object | paper default | `top`, `right`, `bottom`, `left`, each 0–80. |
| `line_height` | number | `1.3` | 0.8–3. |
| `paragraph_spacing_mm` | number | `0` | 0–30. |
| `letter_spacing_mm` | number | `0` | -0.5–3. |
| `word_spacing_mm` | number | `0` | 0–10. |
| `pen_weight` | number | `1` | 0–5. |
| `ink` | string | `#000000` | `#` plus six hex digits. |
| `realism` | string | `natural` | `off`, `subtle`, `natural`, `realistic`, `lifelike`. |
| `realism_advanced` | object | preset | Slider overrides. See [Handwriting](/handwriting). |
| `page_look` | object | none | Texture, shading, and focus. Enabled per key. |
| `seed` | integer | new variation | 0–2147483647. |
| `output.format` | string | `jpeg` | `jpeg`, `png`, `pdf`. |
| `output.dpi` | integer | `150` | `150`, `300`, `600`. |
| `output.background` | string | `paper` | `paper`, or `transparent` for PNG. |

`realism_advanced` accepts `word_placement`, `line_starts`, `line_spacing`, `ink_flow`, `ink_texture`, `letterform_variation`, and `tilt_each_letter`.

`page_look` accepts `paper_texture` (0–100), `paper_texture_style` (`fine`, `fiber`, `laid`), `shading` (0–100), and `soft_focus` (0–100).

## Response

| Field | Type | Meaning |
| --- | --- | --- |
| `request_id` | string | Id for support and your logs. |
| `seed` | integer | Variation that was drawn. |
| `font_id` | string | Font that was used. |
| `font_size_pt` | number | Size that was used. |
| `page_count` | integer | Pages in the result. |
| `unsupported_characters` | string array | Characters the font could not draw. |
| `expires_at` | string | ISO 8601 time when the links expire. |
| `pages` | array | JPEG or PNG files. Absent for PDF. |
| `file` | object | PDF file. Absent for JPEG and PNG. |

Each page has `page`, `width`, `height`, `media_type` (`image/jpeg` or `image/png`), and `url`.

`file` has `media_type` (`application/pdf`) and `url`.

## Status

`GET https://api.handwriting-ai.com/v1/status`

No API key. The response is `{ "status": "ok", "version": "1.0.0" }`.
