import type { ContentItem, ProviderConfig } from "@anonyverse/shared";
export type ApiResponse<T> = { data: T; source: "demo" | "provider"; availability: "demo" | "provider_pending" | "available" | "unavailable" };
export type ContentResponse = ApiResponse<ContentItem>;
export type ProviderInventoryResponse = { providers: Array<Pick<ProviderConfig, "providerKey" | "category" | "environment" | "approved" | "enabled">>; credentials: "server_only"; source: "demo_fallback" };
export const backendBoundary = { mobileAndWebShare: true, secondDatabase: false, secondAuthSystem: false, providerCredentialsInClients: false } as const;
