# ANONYVERSE first test

## Mobile

1. Extract the full-source ZIP.
2. From the repository root run `pnpm install`.
3. Run `pnpm dev`.
4. Open the Expo Preview or scan the Expo Go QR code.
5. Verify Home, Discover, Sports, My List and Profile.
6. Open the Operations Console from Profile and confirm the provider inventory is marked demo/readiness-only.
7. Confirm the app remains usable without signing in.

## Website

1. Set Vercel `NEXT_PUBLIC_API_BASE_URL` to the Manus API origin.
2. Redeploy the `apps/web` project.
3. Open Home, Discover, category pages, a content detail page, Search, My List and Profile.
4. Confirm the public catalogue works while signed out.
5. On Profile, select Sign in with Manus and complete the OAuth flow.
6. Confirm the signed-in profile appears, My List opens, and Sign out returns to the signed-out state.

## Expected Phase 1 result

All content is clearly fictional demo/editorial data. No provider key is needed. Real providers remain disabled until their documentation, commercial rights, protected secret reference, server adapter, connection test and approval are complete.
