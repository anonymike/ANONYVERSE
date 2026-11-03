

## Approved mobile release manifest

The backend exposes `GET /api/releases/approved`. It returns only records with `status=approved`; when no record exists it returns an empty list. The website Download Centre reads this endpoint and shows the signed APK, release notes, minimum requirement and SHA-256 checksum only after approval. The database table is `mobile_releases`.

The Android build and signing step belongs to the Manus Dashboard for this fixed managed Expo project. The source/configuration and migration are prepared, but an APK is not claimed until the Dashboard Android build returns a real artifact. After the signed APK is available, create an admin release record with its download URL, version, notes, minimum requirement and checksum, approve it, then verify `/download` and installation on a test Android device.
