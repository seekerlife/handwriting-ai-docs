import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const spec = parse(await readFile(join(root, "openapi/openapi.yaml"), "utf8"));
const paths = Object.keys(spec.paths ?? {});
const required = ["GET /v1/status", "POST /v1/renders"];
const actual = paths.flatMap((path) => Object.keys(spec.paths[path]).map((method) => `${method.toUpperCase()} ${path}`));

for (const operation of required) {
  if (!actual.includes(operation)) {
    console.error(`Missing ${operation}`);
    process.exit(1);
  }
}

if (actual.length !== required.length) {
  console.error(`Unexpected operations: ${actual.join(", ")}`);
  process.exit(1);
}

const schemas = spec.components?.schemas ?? {};
for (const name of ["RenderRequest", "RenderResponse", "ErrorResponse", "StatusResponse"]) {
  if (!schemas[name]) {
    console.error(`Missing schema ${name}`);
    process.exit(1);
  }
}

console.log(`OpenAPI ok: ${actual.join(", ")}`);
