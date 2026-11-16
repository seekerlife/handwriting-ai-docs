# Fonts

`font_id` chooses the handwriting. Use the id in the request. The name is the label you can show to people.

Every key can use a font marked Included. A font marked On request is enabled when you ask for it. An unknown id returns `font_not_found`. An id that exists but is not enabled on the key returns `feature_not_enabled`.

A handwriting font made in [FontKind AI](https://font.handwriting-ai.com) can be enabled on a key as its own `font_id`. Name that font in the [access request](https://handwriting-ai.com/api-access). Font creation has its own plans and is separate from API access.

Start with `caveat` or `patrick-hand` for a predictable Latin page. Use `dancing-script` when the letters in a word should connect.

## Scripts

Most fonts draw Latin letters. For another writing system, pick a font that covers it. Characters the font cannot draw come back in `unsupported_characters`.

| Script | font_id |
| --- | --- |
| Arabic | `playpen-sans-arabic`, `aref-ruqaa` |
| Cyrillic | `bad-script`, `neucha`, `marck-script`, `pangolin` |
| Devanagari | `kalam`, `playpen-sans-deva` |
| Chinese | `ma-shan-zheng` |
| Japanese | `klee-one` |
| Korean | `gaegu`, `nanum-pen-script`, `nanum-brush-script` |

For Arabic, set `direction` to `rtl`, or leave it on `auto`.

A connected hand joins the letters inside a word. A print hand keeps the letters separate.

## Included

These 10 fonts are available on every key.

| font_id | Name | Hand | Scripts |
| --- | --- | --- | --- |
| `caveat` | Caveat | Print | Latin |
| `patrick-hand` | Patrick Hand | Print | Latin |
| `kalam` | Kalam | Print | Latin, Devanagari |
| `coming-soon` | Coming Soon | Print | Latin |
| `dancing-script` | Dancing Script | Connected | Latin |
| `indie-flower` | Indie Flower | Print | Latin |
| `andika` | Andika | Print | Latin |
| `playwrite-us-modern` | Playwrite US Modern | Connected | Latin |
| `playwrite-us-trad` | Playwrite US Trad | Connected | Latin |
| `schoolbell` | Schoolbell | Print | Latin |

## On request

These 98 fonts are enabled per key.

| font_id | Name | Hand | Scripts |
| --- | --- | --- | --- |
| `architects-daughter` | Architects Daughter | Print | Latin |
| `gochi-hand` | Gochi Hand | Print | Latin |
| `shadows-into-light` | Shadows Into Light | Print | Latin |
| `bad-script` | Bad Script | Print | Cyrillic, Latin |
| `reenie-beanie` | Reenie Beanie | Print | Latin |
| `permanent-marker` | Permanent Marker | Print | Latin |
| `gloria-hallelujah` | Gloria Hallelujah | Print | Latin |
| `cookie` | Cookie | Connected | Latin |
| `pacifico` | Pacifico | Connected | Latin |
| `covered-by-your-grace` | Covered By Your Grace | Print | Latin |
| `just-me-again-down-here` | Just Me Again Down Here | Print | Latin |
| `beth-ellen` | Beth Ellen | Print | Latin |
| `fuzzy-bubbles` | Fuzzy Bubbles | Print | Latin |
| `handlee` | Handlee | Print | Latin |
| `neucha` | Neucha | Print | Cyrillic, Latin |
| `give-you-glory` | Give You Glory | Print | Latin |
| `nothing-you-could-do` | Nothing You Could Do | Print | Latin |
| `delius` | Delius | Print | Latin |
| `sue-ellen-francisco` | Sue Ellen Francisco | Print | Latin |
| `just-another-hand` | Just Another Hand | Print | Latin |
| `waiting-for-the-sunrise` | Waiting for the Sunrise | Print | Latin |
| `the-girl-next-door` | The Girl Next Door | Print | Latin |
| `annie-use-your-telescope` | Annie Use Your Telescope | Print | Latin |
| `walter-turncoat` | Walter Turncoat | Print | Latin |
| `short-stack` | Short Stack | Print | Latin |
| `delicious-handrawn` | Delicious Handrawn | Print | Latin |
| `mynerve` | Mynerve | Print | Latin |
| `pangolin` | Pangolin | Print | Cyrillic, Latin |
| `amatic-sc` | Amatic SC | Print | Latin |
| `caveat-brush` | Caveat Brush | Print | Latin |
| `crafty-girls` | Crafty Girls | Print | Latin |
| `shantell-sans` | Shantell Sans | Print | Latin |
| `balsamiq-sans` | Balsamiq Sans | Print | Latin |
| `playwrite-fr-trad` | Playwrite FR Trad | Connected | Latin |
| `playwrite-de-grund` | Playwrite DE Grund | Print | Latin |
| `playwrite-de-la` | Playwrite DE LA | Connected | Latin |
| `playwrite-es` | Playwrite ES | Connected | Latin |
| `playwrite-gb-j` | Playwrite GB J | Connected | Latin |
| `playwrite-it-trad` | Playwrite IT Trad | Connected | Latin |
| `playwrite-pt` | Playwrite PT | Connected | Latin |
| `nanum-pen-script` | Nanum Pen Script | Print | Korean |
| `la-belle-aurore` | La Belle Aurore | Print | Latin |
| `rock-salt` | Rock Salt | Print | Latin |
| `sriracha` | Sriracha | Print | Latin |
| `homemade-apple` | Homemade Apple | Connected | Latin |
| `sacramento` | Sacramento | Connected | Latin |
| `great-vibes` | Great Vibes | Connected | Latin |
| `yellowtail` | Yellowtail | Connected | Latin |
| `zeyada` | Zeyada | Connected | Latin |
| `tangerine` | Tangerine | Connected | Latin |
| `cedarville-cursive` | Cedarville Cursive | Connected | Latin |
| `loved-by-the-king` | Loved by the King | Print | Latin |
| `montez` | Montez | Connected | Latin |
| `petit-formal-script` | Petit Formal Script | Connected | Latin |
| `qwigley` | Qwigley | Connected | Latin |
| `kristi` | Kristi | Connected | Latin |
| `marck-script` | Marck Script | Connected | Cyrillic, Latin |
| `over-the-rainbow` | Over the Rainbow | Connected | Latin |
| `nanum-brush-script` | Nanum Brush Script | Print | Korean |
| `shadows-into-light-two` | Shadows Into Light Two | Print | Latin |
| `satisfy` | Satisfy | Connected | Latin |
| `courgette` | Courgette | Connected | Latin |
| `kaushan-script` | Kaushan Script | Connected | Latin |
| `allura` | Allura | Connected | Latin |
| `alex-brush` | Alex Brush | Connected | Latin |
| `parisienne` | Parisienne | Connected | Latin |
| `italianno` | Italianno | Connected | Latin |
| `damion` | Damion | Connected | Latin |
| `yesteryear` | Yesteryear | Connected | Latin |
| `mr-dafoe` | Mr Dafoe | Connected | Latin |
| `pinyon-script` | Pinyon Script | Connected | Latin |
| `grand-hotel` | Grand Hotel | Connected | Latin |
| `calligraffitti` | Calligraffitti | Print | Latin |
| `mansalva` | Mansalva | Print | Latin |
| `grape-nuts` | Grape Nuts | Print | Latin |
| `comforter` | Comforter | Connected | Latin |
| `comforter-brush` | Comforter Brush | Connected | Latin |
| `lobster` | Lobster | Connected | Latin |
| `playpen-sans` | Playpen Sans | Print | Latin |
| `playpen-sans-arabic` | Playpen Sans Arabic | Connected | Arabic |
| `playpen-sans-deva` | Playpen Sans Deva | Print | Devanagari |
| `aref-ruqaa` | Aref Ruqaa | Connected | Arabic |
| `ma-shan-zheng` | Ma Shan Zheng | Print | Chinese |
| `klee-one` | Klee One | Print | Japanese |
| `gaegu` | Gaegu | Print | Korean |
| `original-handwriting-01` | Original Handwriting 01 | Print | Latin |
| `original-handwriting-02` | Original Handwriting 02 | Connected | Latin |
| `original-handwriting-03` | Original Handwriting 03 | Connected | Latin |
| `handwriting-04` | Handwriting 04 | Connected | Latin |
| `handwriting-05` | Handwriting 05 | Connected | Latin |
| `handwriting-06` | Handwriting 06 | Connected | Latin |
| `willow-notes` | Willow Notes | Print | Latin |
| `paper-letters` | Paper Letters | Print | Latin |
| `trail-notes` | Trail Notes | Print | Latin |
| `coastal-notes` | Coastal Notes | Print | Latin |
| `library-notes` | Library Notes | Print | Latin |
| `little-note` | Little Note | Print | Latin |
| `notebook-maxwell-refined` | Notebook Maxwell Refined | Connected | Latin |
