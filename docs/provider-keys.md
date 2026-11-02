# ANONYVERSE provider-key workflow

## Current Phase 1 behavior

The fictional Editorial Demo provider is the only active source. No third-party API key is required for the first mobile or website test. The mobile Operations Console displays provider metadata and readiness requirements, but it intentionally does not accept or persist raw secrets.

Do not put provider keys in the mobile app, website bundle, ZIP files, GitHub, database rows, screenshots, logs or Vercel public environment variables.

## When a real provider is selected

For each category independently:

1. Review the provider's official documentation, authentication method, rate limits, attribution rules, commercial-use terms, caching rules and redistribution rights.
2. Add a protected secret in the Manus backend project configuration. The secret name should be category/provider-specific, for example `ANONYVERSE_ANIME_API_KEY` or `ANONYVERSE_MUSIC_API_KEY`.
3. Store only a non-secret reference such as `ANONYVERSE_ANIME_API_KEY` in the provider record. Store provider base URL, documentation URL, environment, subscription notes, auth type and approval state as metadata.
4. Implement the provider adapter in `server/providers/`. The adapter reads the secret at runtime on the server and converts upstream responses into the normalized ANONYVERSE content model.
5. Run a server-side health/connection test. Never send the raw key to the mobile client or browser.
6. Review the result, approve the provider and enable it. Until both `approved` and `enabled` are true, the adapter must not call the upstream API.
7. Keep the fictional demo fallback active for categories that have no approved provider.

## Secret placement

- Manus backend secrets: provider keys, signing secrets, database credentials and upstream private credentials.
- Vercel: only browser-safe values such as `NEXT_PUBLIC_API_BASE_URL`; never provider keys.
- Mobile app: no provider keys and no upstream credentials.
- Database: provider metadata and secret references only; never raw key values.

## Important distinction

The current admin screen is a Phase 1 readiness console, not a raw-secret vault. A future provider-management iteration can add a protected server action for creating/updating secret references, connection testing and audit events. The secret value should still be submitted directly to the backend secret manager and never written to the database or returned in API responses.
