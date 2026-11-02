import { demoContent, type ContentKind } from "@anonyverse/shared";
export { demoContent };
export function findContent(id: string) { return demoContent.find((item) => item.id === id); }
export function byKind(kind: ContentKind) { return demoContent.filter((item) => item.kind === kind); }
export function byQuery(query: string) { const q = query.trim().toLowerCase(); return q ? demoContent.filter((item) => `${item.title} ${item.subtitle} ${item.genres.join(" ")}`.toLowerCase().includes(q)) : demoContent; }
export function labelForKind(kind: ContentKind) { return ({ movie: "Movies", series: "Series", anime: "Anime", sport: "Sports", music: "Music", news: "News" } as Record<ContentKind, string>)[kind]; }
