# Page setup

Sizes are physical. A higher `dpi` adds pixels and leaves the page the same size on paper. Margins and type sizes stay in millimetres and points, so you do not recalculate them when you change `dpi`.

## Page size

`page_size` defaults to `a4`. `orientation` is `portrait` or `landscape`. Landscape swaps the width and height below.

| page_size | Size | 150 DPI | 300 DPI | 600 DPI |
| --- | --- | --- | --- | --- |
| `letter` | 8.5 × 11 in | 1275 × 1650 | 2550 × 3300 | 5100 × 6600 |
| `legal` | 8.5 × 14 in | 1275 × 2100 | 2550 × 4200 | 5100 × 8400 |
| `tabloid` | 11 × 17 in | 1650 × 2550 | 3300 × 5100 | 6600 × 10200 |
| `a3` | 297 × 420 mm | 1754 × 2480 | 3508 × 4961 | 7016 × 9921 |
| `a4` | 210 × 297 mm | 1240 × 1754 | 2480 × 3508 | 4961 × 7016 |
| `a5` | 148 × 210 mm | 874 × 1240 | 1748 × 2480 | 3496 × 4961 |
| `a6` | 105 × 148 mm | 620 × 874 | 1240 × 1748 | 2480 × 3496 |
| `b5` | 176 × 250 mm | 1039 × 1476 | 2079 × 2953 | 4157 × 5906 |
| `india-18x24` | 180 × 240 mm | 1063 × 1417 | 2126 × 2835 | 4252 × 5669 |
| `postcard-4x6` | 4 × 6 in | 600 × 900 | 1200 × 1800 | 2400 × 3600 |
| `card-5x7` | 5 × 7 in | 750 × 1050 | 1500 × 2100 | 3000 × 4200 |
| `square` | 10.2 × 10.2 in | 1530 × 1530 | 3060 × 3060 | 6120 × 6120 |

Pixel sizes are `round(millimetres / 25.4 × dpi)` for the portrait page.

`dpi` is `150`, `300`, or `600`. The default is `150`. A 300 or 600 DPI file is a larger download. The link still expires 15 minutes after the response.

## Paper

`paper` chooses the ruling. `plain`, `college-ruled`, and `wide-ruled` work on every key. The other papers are enabled per key. Ask for them in the [access request](https://handwriting-ai.com/api-access). A paper the key cannot use returns `feature_not_enabled`.

| paper | Page |
| --- | --- |
| `plain` | Unruled page |
| `college-ruled` | College ruled, about 7.1 mm between lines |
| `wide-ruled` | Wide ruled, about 8.7 mm between lines |
| `feint-ruled` | Feint ruled |
| `grid` | Square grid, 5 mm or 10 mm |
| `squared-10mm` | 10 mm squares |
| `dots` | Dot grid |
| `memo` | Warm memo ruling |
| `india-school-single-line` | India school single line |
| `india-school-square` | India school square |
| `india-college-single-line` | India college single line |
| `lineatur-25` | Lineatur 25 |
| `lineatur-27` | Lineatur 27 |
| `lineatur-28` | Lineatur 28 |
| `cis-school-grid` | CIS school grid |
| `cis-school-line` | CIS school line |

`tint` is `white`, `cream`, `aged`, or `dark`. The default is `white`. Tint is not drawn on a transparent PNG.

`grid_size` is `small` or `large`. It changes `grid` and `dots` only. Small is about 5 mm. Large is about 10 mm. Named papers such as `squared-10mm` keep their own pitch.

If you omit `margins_mm`, the API uses the writing margins of the selected paper. College-ruled and wide-ruled pages keep a wide left margin so the text clears the red line. Send all four edges when you want your own margins. Each edge is 0 to 80 millimetres.

```json
"margins_mm": { "top": 18, "right": 16, "bottom": 18, "left": 16 }
```

## Text block

| Field | Default | Range | Meaning |
| --- | --- | --- | --- |
| `alignment` | `left` | `left`, `center`, `right` | Horizontal alignment of the lines |
| `direction` | `auto` | `auto`, `ltr`, `rtl` | Writing direction. `auto` follows the text |
| `line_height` | `1.3` | 0.8–3 | Line spacing as a multiple of the font size |
| `paragraph_spacing_mm` | `0` | 0–30 | Extra space after a blank-line paragraph |
| `font_size_pt` | `22` | 8–72, or `auto` | Body size in points |
| `max_font_size_pt` | `36` | 8–72 | Largest size used when the size is `auto` |

`auto` reduces the size until the text fits within the page limit for the format. The smallest automatic size is 8 points. If the text still needs more pages than the format allows, the response is `page_limit_exceeded`. The response field `font_size_pt` is the size that was used.
