export type ProviderCategory = "movies_tv" | "anime" | "sports" | "music" | "news" | "culture";
export type NormalizedProviderItem = { id: string; kind: string; title: string; artworkUrl?: string; description?: string; year?: string; rating?: string; sourceType: "provider" | "demo"; details?: Record<string, unknown> };
export type ProviderConfig = { providerKey: string; category: ProviderCategory; enabled: boolean; approved: boolean; credentialRef?: string; baseUrl?: string };
export interface ContentProviderAdapter { readonly key: string; readonly category: ProviderCategory; healthCheck(config: ProviderConfig): Promise<{ ok: boolean; message: string }>; search(config: ProviderConfig, query: string): Promise<NormalizedProviderItem[]>; getDetails(config: ProviderConfig, id: string): Promise<NormalizedProviderItem | null>; }
export class DemoEditorialAdapter implements ContentProviderAdapter { readonly key = "demo-editorial"; readonly category = "culture" as const; async healthCheck() { return { ok: true, message: "Fictional editorial catalogue active" }; } async search() { return []; } async getDetails() { return null; } }
export function canCallProvider(config: ProviderConfig) { return config.enabled && config.approved && Boolean(config.credentialRef || config.providerKey === "demo-editorial"); }
export const providerRegistry = { demo: new DemoEditorialAdapter() };
