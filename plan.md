# ANONYVERSE — Phase 1 mobile implementation plan

## Confirmed scope
Build the complete ANONYVERSE mobile application now using a fictional editorial catalogue and realistic demo content. Do not wait for API credentials, automatically integrate the public-apis repository, or assume any listed provider is free, commercially usable, safe to resell, or production-ready. The public-apis repository is only a discovery/research catalogue that the product owner will use later.

Phase 1 must be a polished, functional mobile application, not a collection of static mockups. The application must include real navigation, reusable components, interactive saved-list and search/filter behavior, adaptive content details, profile/auth entry points, a provider-management surface, and a properly structured backend/database foundation. Demo data must be clearly labeled and replaceable through normalized internal models and provider adapters.

The managed mobile runtime is Expo Router / React Native / TypeScript / NativeWind with the fixed Express/tRPC + Drizzle + managed MySQL-compatible database starter. The original request's Next.js/Tailwind/PostgreSQL/Supabase stack is treated as a future web/backend alternative, not a reason to replace the fixed mobile starter.

## Visual system
Use a dark cinematic entertainment aesthetic with black, charcoal, deep navy and restrained Reel red / crimson accents. ANONYVERSE should feel premium, editorial and broad rather than a clone of any one streaming service. Use a full-bleed featured hero, poster rails, compact metadata, generous negative space, soft shadows, layered surfaces, clear live indicators and concise editorial copy. Portrait layouts are optimized for one-handed browsing; tablet/web preview can expand rails and spacing.

Signature elements: a folded play/reel mark, crimson eyebrow labels, oversized ranking numerals, live status dots, and thin carousel indicators. Interactions use quick press feedback, card scale/fade, save toggles and filter-chip selection. Avoid autoplay and controls that imply rights to content that is not actually licensed.

Brand voice: concise, confident, editorial. Example lines: “Tonight deserves a great story.” and “Find your next obsession.”

## Phase 1 product surface
- Home: dynamic demo hero, Trending Now, Continue Watching, Top Rated, Live Sports, New Episodes, Anime Spotlight, Music Picks, Entertainment News, Recommended for You and My List.
- Discovery: search plus category, genre, language, year and status filters; result cards and empty states.
- Category browsing: movies, TV series, anime, sports, music and news tabs/sections.
- Details: adaptive movie/series/anime, sport event, album and article layouts with synopsis, metadata, cast/track/story sections, related content and clearly marked demo availability.
- Sports: demo live score cards, upcoming fixtures, venue, timeline and stats.
- My List: interactive saved items, remove/save behavior and guest-local persistence.
- Profile: sign-in entry using the starter's real Manus OAuth flow, guest state, viewing history/progress and preference summary.
- Admin: functional provider inventory and setup forms for independently managed category integrations.

## Provider-ready architecture
The internal normalized content model is shared by demo and future provider data. Each provider record includes category, documentation URL, base URL, authentication type, environment, credential reference, subscription information, setup status, commercial-use review, approval status and enabled flag. Raw credential values never enter the database, mobile bundle, logs or UI; they belong to protected server environment configuration later.

Provider adapters are category-specific and server-only. They expose a stable interface for health check, list/search/detail normalization and capability metadata. A registry selects providers independently per category. Disabled/unapproved integrations are never called. The demo catalogue is a first-class fallback source so replacing demo data with provider results later does not require rebuilding screens or domain logic.

The admin panel supports editing non-secret provider metadata, inspecting configured/unconfigured status, recording docs/terms/subscription notes and toggling approval/activation only when policy gates are satisfied. Future workflow: research a provider, review official docs and terms, register, add credentials securely, test connection, approve, activate, and display normalized data in its category. One category can progress without affecting others.

## Data model
A normalized `content_items` model stores id, kind, title, subtitle, artwork, hero artwork, description, genres, language, release year, rating, duration, status, source type, provider id and type-specific JSON payload. Related tables support users, favorites/watchlist, viewing progress, provider records, provider health checks and admin audit events. Type-specific payloads cover cast/episodes, anime season/episode, sport teams/venue/timeline/statistics, music artist/tracks, and news author/body/related stories.

## Project structure
- `app/(tabs)/`: Home, Discover, Sports, My List and Profile routes.
- `app/content/[id].tsx`: adaptive content detail screen.
- `app/admin.tsx`: role-gated provider management.
- `components/reel/`: brand mark, hero, cards, rails, filters, sheets and states.
- `lib/catalog.ts`, `lib/content.ts`, `lib/library.tsx`: demo source, normalized models and interactive library state.
- `server/providers/`: provider contracts, demo adapter and future category adapter folders.
- `server/routers.ts`, `server/db.ts`, `drizzle/`: API procedures, persistence and migrations.
- `docs/architecture.md`: provider onboarding, schema, safety/legal approach and Phase 2 workflow.
- `plan.md`, `TODO.md`: implementation decisions and outcomes.

## Phase 2 handoff
The owner will progressively select providers from the public-apis catalogue. Before each activation, validate official licensing, terms, commercial distribution, caching, attribution, rate limits, geographic restrictions, data quality, security and pricing. Add one provider at a time through the adapter contract and protected secret flow; test it through Admin; approve/activate only after review. No Phase 1 code should depend on a specific provider or API credential.


# Phase 2 approved extension — unified mobile + website platform

## Compatibility decision
The managed Expo mobile app remains in the existing root tree and stays Manus-canonical. Phase 2 adds `apps/web` and shared packages without moving or rewriting the fixed mobile starter, preserving its OAuth, Drizzle, provider administration, identifiers, Expo port 8081 and API port 3000. GitHub/Vercel configuration is prepared as exportable repository metadata; no canonical-repository switch or automatic production publication is performed.

## Monorepo structure
- `apps/web/`: Next.js App Router website with desktop/tablet/mobile responsive layouts, SEO metadata, content discovery, details, library/profile, legal pages and Download Centre.
- `packages/shared/`: normalized content/category types, demo content projection, availability rules and provider contracts shared by web and future service consumers.
- `packages/validation/`: Zod schemas for content search, provider configuration and approved release manifests.
- `packages/config/`: shared brand constants and ecosystem version metadata.
- Existing root `app/`, `components/`, `hooks/`, `lib/`, `server/` and `drizzle/`: preserved mobile/backend implementation.
- `.github/workflows/`: validation, web build and release-preparation workflows; no mobile auto-release.
- `docs/deployment.md`, `docs/releases.md`: Vercel and coordinated release procedures.

## Website design
The website extends the same cinematic editorial system into a wide-screen “control room for culture”: an offset hero, horizontal editorial rails, dense metadata, luminous red accents and lime live indicators. Ink black `#07090D` is the atmosphere, charcoal navy cards hold information, ANONY red carries action, and silver metadata keeps the interface quiet. Typography uses Geist/system fallbacks with condensed uppercase eyebrow labels. Interaction is direct: keyboard-friendly search, category chips, hover reveal, clear empty/loading/error states and no autoplay or rights-implying controls.

## Serving and data
The web app reads the shared normalized demo projection in Phase 2 and links to the existing backend contract for future authenticated data. It does not create a second content database or provider credential store. The site displays the existing fictional catalogue as demo content and keeps provider activation, credentials and approval server-side.

## Release/deployment preparation
`apps/web` has a Vercel-ready build target and environment documentation, but production publication remains a user-controlled Vercel Git integration action. GitHub Actions validate TypeScript, web build and mobile checks, and prepare release notes without building or publishing native mobile artifacts automatically. Download metadata requires an explicit approved release manifest; absent releases render a transparent no-release state instead of an arbitrary APK link.
