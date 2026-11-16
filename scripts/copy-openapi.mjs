import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "apps/docs/public/openapi.yaml");
await mkdir(dirname(target), { recursive: true });
await copyFile(join(root, "openapi/openapi.yaml"), target);
