# ANONYVERSE Phase 2 deployment

The mobile app remains Manus-managed and canonical. Do not point its managed mobile project at a GitHub canonical repository or change Expo ports 8081/3000. The website is independently deployable from `apps/web`.

## Vercel

Create a Vercel project with Root Directory `apps/web`. Install command: `pnpm install --frozen-lockfile` from the repository root. Build command: `pnpm --dir apps/web build`. The website is a Next.js App Router application and can use Vercel's default Next.js framework detection. Add environment variables independently for Development, Preview and Production; do not put provider credentials or database DSNs in `NEXT_PUBLIC_*` variables.

The website currently uses the shared fictional demo projection and has no required production secret. When connecting the existing backend, use a server-only backend origin variable and preserve the existing OAuth cookie rules (`SameSite=None; Secure` for public HTTPS embedded Preview). The website must not create a second user database or provider credential vault.

## Local validation

Run `pnpm --dir apps/web build` for the website and `pnpm check` / `pnpm lint` for the mobile/backend tree. The mobile runtime remains `pnpm dev` on Expo 8081 and API 3000. The website dev server uses port 3001 to avoid disturbing the managed mobile Preview.
