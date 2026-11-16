import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fonts = JSON.parse(await readFile(join(root, "catalog/fonts.json"), "utf8"));

function table(rows) {
  const body = rows.map((font) => `| \`${font.id}\` | ${font.name} | ${font.hand === "connected" ? "Connected" : "Print"} | ${font.scripts.join(", ")} |`).join("\n");
  return `| font_id | Name | Hand | Scripts |\n| --- | --- | --- | --- |\n${body}`;
}

const included = fonts.filter((font) => font.access === "included");
const onRequest = fonts.filter((font) => font.access === "on_request");

const page = `# Fonts

\`font_id\` chooses the handwriting. Use the id in the request. The name is the label you can show to people.

Every key can use a font marked Included. A font marked On request is enabled when you ask for it. An unknown id returns \`font_not_found\`. An id that exists but is not enabled on the key returns \`feature_not_enabled\`.

A handwriting font made in [FontKind AI](https://font.handwriting-ai.com) can be enabled on a key as its own \`font_id\`. Name that font in the [access request](https://handwriting-ai.com/api-access). Font creation has its own plans and is separate from API access.

Start with \`caveat\` or \`patrick-hand\` for a predictable Latin page. Use \`dancing-script\` when the letters in a word should connect.

## Scripts

Most fonts draw Latin letters. For another writing system, pick a font that covers it. Characters the font cannot draw come back in \`unsupported_characters\`.

| Script | font_id |
| --- | --- |
| Arabic | \`playpen-sans-arabic\`, \`aref-ruqaa\` |
| Cyrillic | \`bad-script\`, \`neucha\`, \`marck-script\`, \`pangolin\` |
| Devanagari | \`kalam\`, \`playpen-sans-deva\` |
| Chinese | \`ma-shan-zheng\` |
| Japanese | \`klee-one\` |
| Korean | \`gaegu\`, \`nanum-pen-script\`, \`nanum-brush-script\` |

For Arabic, set \`direction\` to \`rtl\`, or leave it on \`auto\`.

A connected hand joins the letters inside a word. A print hand keeps the letters separate.

## Included

These ${included.length} fonts are available on every key.

${table(included)}

## On request

These ${onRequest.length} fonts are enabled per key.

${table(onRequest)}
`;

await writeFile(join(root, "apps/docs/fonts.md"), page);
console.log(`Wrote fonts.md (${fonts.length} fonts)`);
