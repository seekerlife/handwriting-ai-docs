# Handwriting AI docs and client

This repository contains the Handwriting AI API documentation and the `handwriting-ai` Node.js client.

- `apps/docs` is the documentation site.
- `packages/handwriting-ai` is the npm package.
- `openapi/openapi.yaml` is the API contract.
- `catalog/fonts.json` is the font catalog used to render the font page.

The website and the renderer live in their own repositories. This repo does not serve `https://api.handwriting-ai.com`.

## Local docs

```bash
pnpm install
pnpm fonts
pnpm dev
```

The docs server runs from `apps/docs`.

## Checks

```bash
pnpm check
```

This validates the OpenAPI file, tests the client, and builds the docs.

## Client

```bash
pnpm --filter handwriting-ai test
```

The package name to publish is `handwriting-ai`. Publishing is a separate step from this repository.

## Docs hosting

The site is a static VitePress build for Cloudflare Pages.

- Root directory: the repository root
- Build command: `pnpm install && pnpm --filter @handwriting-ai/docs build`
- Output directory: `apps/docs/.vitepress/dist`
- Node.js: 22
- Production URL: `https://docs.handwriting-ai.com`

The OpenAPI file is copied to `/openapi.yaml` during the docs build.
