"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/auth";

type Release = { version: string; platform: "android" | "ios"; status: string; downloadUrl?: string; releaseNotes: string[]; minimumRequirement?: string; sha256?: string; publishedAt?: string };

export function ReleaseDownload() {
  const [releases, setReleases] = useState<Release[]>([]);
  const hasApiBase = Boolean(getApiBaseUrl());
  const [loading, setLoading] = useState(hasApiBase);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = getApiBaseUrl();
    if (!base) return;
    fetch(`${base}/api/releases/approved`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Release manifest unavailable");
        return response.json() as Promise<{ releases?: Release[] }>;
      })
      .then((payload) => setReleases(payload.releases ?? []))
      .catch(() => setError("The release service is temporarily unavailable."))
      .finally(() => setLoading(false));
  }, []);

  const android = releases.find((release) => release.platform === "android" && release.status === "approved");
  const ios = releases.find((release) => release.platform === "ios" && release.status === "approved");

  return <>
    {loading && <div className="info-panel"><p>Checking the approved release manifest…</p></div>}
    {!loading && !android && <div className="notice"><strong>No approved Android release yet.</strong><p>The Download Centre will show the signed APK, version, release notes, minimum Android requirement and checksum after an administrator approves a release record.</p></div>}
    {error && <div className="notice"><strong>Release manifest unavailable.</strong><p>{error}</p></div>}
    {android && <div className="info-panel"><span className="eyebrow">ANDROID · {android.version}</span><h2>Download the latest approved APK</h2><p>{android.releaseNotes.join(" · ")}</p><p className="card-meta">Minimum requirement: {android.minimumRequirement || "See release notes"}</p><a className="btn" href={android.downloadUrl}>Download APK</a>{android.sha256 && <p className="card-meta">SHA-256: {android.sha256}</p>}<p className="card-meta">Android may require permission to install from this source.</p></div>}
    <div className="info-panel"><span className="eyebrow">IOS DISTRIBUTION</span><h2>{ios ? "Open the official iOS release" : "Coming through official channels"}</h2><p>{ios ? "Use the App Store or TestFlight link configured for the approved release." : "ANONYVERSE will use the App Store or authorized TestFlight. An ordinary website will never pretend to install an iOS IPA directly."}</p>{ios?.downloadUrl ? <a className="btn" href={ios.downloadUrl}>Open official release</a> : <Link className="btn secondary" href="/about">Release policy</Link>}</div>
  </>;
}
