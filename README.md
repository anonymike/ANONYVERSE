# ANONYVERSE

ANONYVERSE is a unified cinematic entertainment ecosystem with a managed Expo mobile app and a Next.js website in one compatibility monorepo.

## Phase 2 workspace

- The existing root Expo Router / React Native application remains Manus-canonical and keeps Expo 8081 plus API 3000.
- `apps/web` is the responsive Next.js website and is prepared for Vercel with Root Directory `apps/web`.
- `packages/shared`, `packages/validation` and `packages/config` hold shared normalized types, validation and brand/version constants.
- `server/` and `drizzle/` remain the single backend/database foundation.

## Commands

```bash
pnpm dev                 # preserved mobile + API runtime
pnpm check               # mobile/backend TypeScript
pnpm lint                # mobile lint
pnpm test                # backend tests
pnpm --dir apps/web build # website production build
```

The website uses fictional, clearly labelled demo content. The public-apis repository is a discovery catalogue only. Real providers require independent official terms, licensing, credential, connection test and approval review. Provider credentials remain server-only.

Production website deployment is handled by Vercel's Git integration. Native Android/iOS builds are never automatically published by a website commit; use an explicit Expo EAS or Manus Dashboard release action. See [deployment](docs/deployment.md) and [release workflow](docs/releases.md).
