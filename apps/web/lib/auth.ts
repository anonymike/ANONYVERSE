export type WebUser = {
  id: number | null;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  lastSignedIn: string;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

export function getApiBaseUrl() {
  return apiBaseUrl;
}

export function getApiUrl(path: string) {
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getLoginUrl(returnTo: string) {
  const url = new URL(getApiUrl("/api/oauth/login"));
  url.searchParams.set("returnTo", returnTo);
  return url.toString();
}

export async function getCurrentUser(): Promise<WebUser | null> {
  if (!apiBaseUrl) return null;
  const response = await fetch(getApiUrl("/api/auth/me"), {
    credentials: "include",
    cache: "no-store",
  });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Unable to reach the ANONYVERSE account service.");
  const payload = (await response.json()) as { user?: WebUser | null };
  return payload.user ?? null;
}

export async function logout() {
  if (!apiBaseUrl) return;
  const response = await fetch(getApiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Unable to sign out right now.");
}
