

# ANONYVERSE provider and mobile release workflow
- [~] **Secure provider management:** Admin-only procedures list provider records, store metadata and credential references, run server-side secret-presence health tests, record health/audit events, and block activation unless a provider is tested, approved and credentialed. Raw provider keys are never accepted by the mobile or website client.
- [~] **Approved mobile release manifest:** The backend persists mobile release records and exposes only approved releases through `/api/releases/approved`; the website Download Centre consumes that manifest and shows no-release state until a signed artifact is approved.
- [ ] **Signed Android release:** Use the Manus Dashboard Android build for the accepted Expo checkpoint, obtain the real signed APK/AAB artifact, create an approved release record with version, release notes, minimum Android requirement, download URL and checksum, then verify website download and Android installation.
