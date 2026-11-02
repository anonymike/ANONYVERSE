# ANONYVERSE provider architecture

Phase 1 uses the fictional Editorial Demo adapter as the only active source. It is a replaceable source, not a fake claim of live entertainment data. Every screen consumes the normalized `ContentItem` shape and type-specific `details` payload, so UI code does not depend on a particular provider or upstream response format.

A future server-side adapter should implement `providerId`, `category`, `healthCheck`, `search`, `list`, `getDetails` and `normalize`. A registry selects at most one approved provider per category and falls back to the demo adapter when none is enabled. Disabled, unconfigured or unapproved providers must short-circuit without making upstream calls. The mobile bundle receives normalized content only.

Provider records hold category, documentation URL, authentication type, environment, credential reference, subscription/plan notes, setup status, commercial-use review, approval status and activation flag. Credential values are never stored in the database, returned by admin procedures, bundled in the mobile app, or written to logs. Add real values later through protected server secret configuration.

Future onboarding is intentionally progressive: find a candidate in the public-apis repository; open the provider's official docs and legal/commercial terms; register if necessary; add an independent provider record; add the protected credential reference; run a server-side connection test; review rate limits, attribution, caching, resale, geographic and data-retention rules; approve and activate only after this review; then normalize responses into the common content model. Anime can be activated without changing movie, sports, music or news providers.

The normalized schema should eventually include `content_items`, `providers`, `provider_health_checks`, `favorites`, `viewing_progress`, `users` and `admin_audit_events`. Type-specific data covers cast/episodes, anime seasons, teams/venue/timeline/stats, artists/tracks and article author/body/related stories. Durable user state is user-owned and authenticated; guest list state can remain local until sign-in.

The public-apis repository is a catalogue for discovery only. Listing there does not establish safety, availability, commercial rights, redistribution permission or production readiness.
