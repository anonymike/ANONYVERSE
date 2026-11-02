# ANONYVERSE release workflow

Use one coordinated ecosystem identifier with independent mobile and web versions. Example `v1.0.0` can describe the website release and Android mobile release together while `apps/web/package.json` and `app.config.ts` retain platform-specific version fields.

Every release should include a Git tag, changelog entry, release notes, website version, mobile version, build information and deployment status. Android artifacts should be attached to an approved GitHub Release and referenced by the Download Centre only after review. iOS distribution must use the App Store or authorized TestFlight.

GitHub Actions in `.github/workflows` validate TypeScript, lint, tests, the Next.js build and a release-preparation summary. They do not automatically publish Android or iOS builds. Production website deployment is handled by Vercel's Git integration. Native builds use Expo EAS or the approved Manus Dashboard build flow and require an explicit release action.
