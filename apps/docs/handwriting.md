# Handwriting

The font, ink, and realism settings describe the handwriting. The page around it is described in [Page setup](/page-setup).

## Font and ink

`font_id` defaults to `caveat`. The full list is on the [Fonts](/fonts) page. A connected font joins letters inside a word. A print font keeps them separate.

`ink` is a six-digit hex color. The default is `#000000`.

```json
{
  "font_id": "dancing-script",
  "ink": "#244f9e"
}
```

| Field | Default | Range | Meaning |
| --- | --- | --- | --- |
| `letter_spacing_mm` | `0` | -0.5–3 | Extra space between letters |
| `word_spacing_mm` | `0` | 0–10 | Extra space between words |
| `pen_weight` | `1` | 0–5 | Stroke weight. `1` is a normal pen |

## Realism

`realism` selects how much the writing varies. The default is `natural`.

| Value | What you get | Key |
| --- | --- | --- |
| `off` | Even spacing and even strokes | Every key |
| `subtle` | A light change in word spacing, line starts, and line gaps | Every key |
| `natural` | The usual handwritten variation in placement | Every key |
| `realistic` | Natural placement, plus ink that darkens and fades | Enabled per key |
| `lifelike` | Realistic ink, plus small changes in letter shape | Enabled per key |

The preset values are:

| | Word placement | Line starts | Line spacing | Ink flow | Letter shapes |
| --- | --- | --- | --- | --- | --- |
| `off` | 0 | 0 | 0 | 0 | 0 |
| `subtle` | 5 | 8 | 8 | 0 | 0 |
| `natural` | 10 | 15 | 15 | 0 | 0 |
| `realistic` | 10 | 15 | 15 | 50 | 0 |
| `lifelike` | 10 | 15 | 15 | 50 | 50 |

Send `realism_advanced` to replace individual sliders. Each slider is an integer from 0 to 100. A field you omit keeps the preset value. Ink flow, ink texture, letterform variation, and per-letter tilt are enabled per key. A setting the key cannot use returns `feature_not_enabled`.

```json
{
  "realism": "natural",
  "realism_advanced": {
    "line_starts": 25,
    "ink_flow": 40
  }
}
```

`tilt_each_letter` tilts letters and still keeps a connected word joined.

`page_look` adds paper texture, shading, and soft focus. It is enabled per key and is skipped for a transparent PNG.

| Field | Default | Range |
| --- | --- | --- |
| `paper_texture` | `0` | 0–100 |
| `paper_texture_style` | `fine` | `fine`, `fiber`, `laid` |
| `shading` | `0` | 0–100 |
| `soft_focus` | `0` | 0–100 |

## Seed

`seed` is an integer from 0 through 2147483647. Send the same seed with the same text and settings to draw the same variation again. Omit it to receive a new variation. The response always includes the seed that was used, so you can store it with the download.
