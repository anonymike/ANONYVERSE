"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getApiBaseUrl, getCurrentUser, getLoginUrl, logout, type WebUser } from "@/lib/auth";

export function ProfileClient() {
  const [user, setUser] = useState<WebUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Account service unavailable.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function signIn() {
    if (!apiBaseUrl) {
      setError("The website API base URL is not configured yet.");
      return;
    }
    window.location.href = getLoginUrl(`${window.location.origin}/profile`);
  }

  async function signOut() {
    setBusy(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Unable to sign out right now.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="info-panel"><p>Checking your ANONYVERSE session…</p></div>;
  }

  if (!user) {
    return (
      <div className="info-panel profile-panel">
        <span className="eyebrow">ACCOUNT HANDOFF</span>
        <h2>Keep your universe in sync.</h2>
        <p>
          Sign in with the existing Manus account system. ANONYVERSE does not create a second identity store.
        </p>
        <div className="actions">
          <button className="btn" onClick={signIn} type="button">Sign in with Manus</button>
          <Link className="btn secondary" href="/my-list">Browse My List</Link>
        </div>
        {!apiBaseUrl && <p className="notice">The site is live, but the production API URL still needs to be added as <code>NEXT_PUBLIC_API_BASE_URL</code> in Vercel.</p>}
        {error && <p className="notice">{error}</p>}
      </div>
    );
  }

  return (
    <div className="profile-grid">
      <div className="info-panel profile-panel">
        <span className="eyebrow">SIGNED IN</span>
        <h2>{user.name || "ANONYVERSE member"}</h2>
        <p>{user.email || "Your Manus account is connected."}</p>
        <div className="meta"><span>{user.loginMethod || "Manus account"}</span><span>Session active</span></div>
        <div className="actions">
          <Link className="btn" href="/my-list">Open My List</Link>
          <button className="btn secondary" disabled={busy} onClick={signOut} type="button">{busy ? "Signing out…" : "Sign out"}</button>
        </div>
        {error && <p className="notice">{error}</p>}
      </div>
      <div className="info-panel">
        <span className="eyebrow">YOUR SIGNAL</span>
        <h2>Personalisation is ready.</h2>
        <p>Watchlist, progress and recommendations will use this shared identity as provider-backed catalogue data comes online.</p>
      </div>
    </div>
  );
}
