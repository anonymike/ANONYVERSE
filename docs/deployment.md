# ANONYVERSE Phase 2 deployment

The mobile app remains Manus-managed and canonical. The backend, database, authentication and provider architecture remain deployed in Manus. The website is independently deployable from `apps/web`.

## Vercel

Create a Vercel project with Root Directory `apps/web`. Install command: `pnpm install --frozen-lockfile` from the repository root. Build command: `pnpm --dir apps/web build`. The website is a Next.js App Router application and can use Vercel's default Next.js framework detection.

Set this public, non-secret environment variable in Vercel for Production, Preview and Development as appropriate:

```text
NEXT_PUBLIC_API_BASE_URL=https://<your-Manus-API-origin>
```

The website uses this origin only to call `/api/auth/me`, `/api/auth/logout` and `/api/oauth/login`. It must not contain provider credentials, database DSNs or JWT secrets. The current website can still render its fictional demo catalogue if this variable is not set, but profile sign-in will show a configuration notice.

## Manus backend

The backend CORS allowlist accepts the production website origins:

```text
https://anonyverse.anonymiketech.space
https://anonyverse.vercel.app
```

Optional additional HTTPS origins may be supplied through `ANONYVERSE_WEB_ORIGIN` as a comma-separated value. The backend exposes `GET /api/oauth/login?returnTo=...`, validates the return URL against the allowlist, starts the existing Manus OAuth flow and redirects back to the website profile page after the callback. Existing Expo origins and mobile auth behavior remain unchanged.

For the Cloudflare custom domain, point `anonyverse.anonymiketech.space` to the Vercel project using the DNS record Vercel provides, then add the same hostname in Vercel Domains. In Vercel, redeploy after setting `NEXT_PUBLIC_API_BASE_URL` because public environment variables are embedded at build time.

The website calls the Manus API with `credentials: include`. The backend session cookie remains `SameSite=None; Secure` and host-only on the API origin. Browser privacy settings that block third-party cookies can still affect cross-site sessions; if that occurs, the next hardening step is a same-site API custom domain or a first-party Vercel proxy.

## Local validation

Run `pnpm --dir apps/web build` for the website and `pnpm check` / `pnpm lint` / `pnpm test` for the mobile/backend tree. The mobile runtime remains `pnpm dev` on Expo 8081 and API 3000. The website dev server uses port 3001 to avoid disturbing the managed mobile Preview.
