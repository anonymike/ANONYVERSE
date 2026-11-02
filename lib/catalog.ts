export type ContentKind = "movie" | "series" | "anime" | "sport" | "music" | "news";
export type ContentStatus = "featured" | "trending" | "live" | "upcoming" | "new" | "recommended";

export type ContentItem = {
  id: string;
  kind: ContentKind;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  artwork: string;
  hero?: string;
  year: string;
  rating: string;
  duration: string;
  genres: string[];
  language: string;
  status: ContentStatus[];
  progress?: number;
  demo?: boolean;
  details: Record<string, string | string[]>;
};

export const artwork = {
  hero: "/manus-storage/async-images/HaqaVsg5ym8eRPRKBon3Fb/image-1.webp",
  film: "/manus-storage/async-images/HaqaVsg5ym8eRPRKBon3Fb/image-2.webp",
  anime: "/manus-storage/async-images/HaqaVsg5ym8eRPRKBon3Fb/image-3.webp",
  sport: "/manus-storage/async-images/HaqaVsg5ym8eRPRKBon3Fb/image-4.webp",
};

export const catalog: ContentItem[] = [
  { id: "frequency", kind: "movie", title: "The Last Frequency", eyebrow: "ANONYVERSE ORIGINAL", subtitle: "Every signal leaves a trace.", description: "In a city that never sleeps, a late-night radio host intercepts a transmission that could rewrite the story of everyone listening.", artwork: artwork.film, hero: artwork.hero, year: "2025", rating: "8.7", duration: "2h 04m", genres: ["Neo-noir", "Mystery"], language: "English", status: ["featured", "trending", "recommended"], demo: true, details: { cast: ["Mara Venn", "Jon Bell", "Rafi Cole"], director: "Inez Vale", trailer: "Demo trailer available" } },
  { id: "neon-pilgrims", kind: "anime", title: "Neon Pilgrims", eyebrow: "ANIME SPOTLIGHT", subtitle: "The sky remembers everyone.", description: "Two couriers cross a flooded future city to deliver a memory no one is supposed to keep.", artwork: artwork.anime, year: "S2 · 2025", rating: "9.1", duration: "24m", genres: ["Sci-fi", "Adventure"], language: "Japanese", status: ["trending", "new", "recommended"], demo: true, details: { studio: "Northstar Animation", episodes: "12 episodes", next: "New episode Friday" } },
  { id: "final-four", kind: "sport", title: "Night League Final", eyebrow: "LIVE · DEMO", subtitle: "The city plays after dark.", description: "A fictional championship fixture with a live-score layout ready for a future sports provider.", artwork: artwork.sport, year: "Tonight", rating: "LIVE", duration: "Q3 · 06:18", genres: ["Basketball", "Final"], language: "Global", status: ["live", "trending"], demo: true, details: { teams: ["Metro Comets 78", "Harbor Foxes 71"], venue: "The Meridian Arena", timeline: ["Q1 21–18", "Half-time 42–39", "Q3 78–71"], stats: ["Possession 54%", "Rebounds 31", "Three pointers 12"] } },
  { id: "glass-echoes", kind: "series", title: "Glass Echoes", eyebrow: "NEW EPISODES", subtitle: "Nothing stays buried.", description: "A restoration artist discovers that every portrait in her archive has been altered by the same unknown hand.", artwork: artwork.film, year: "S1 · 2025", rating: "8.4", duration: "48m", genres: ["Drama", "Thriller"], language: "English", status: ["new", "recommended"], demo: true, details: { cast: ["Ari Sol", "Dane Hart"], episodes: "8 episodes", next: "Episode 04 available" } },
  { id: "afterglow", kind: "music", title: "Afterglow FM", eyebrow: "MUSIC PICK", subtitle: "A softer kind of midnight.", description: "A fictional late-night electronic album built for the last train home.", artwork: artwork.hero, year: "2025", rating: "4.8", duration: "42m", genres: ["Electronic", "Ambient"], language: "Instrumental", status: ["recommended", "trending"], demo: true, details: { artist: "Luma Static", tracks: ["Blue Hour", "Signal Bloom", "Afterglow FM", "Night Index", "Homecoming"] } },
  { id: "culture-desk", kind: "news", title: "The new midnight cinema", eyebrow: "CULTURE DESK", subtitle: "Why audiences are choosing atmosphere again.", description: "A fictional editorial feature on the return of slow-burn worlds, tactile sound design and the long take.", artwork: artwork.anime, year: "6 min read", rating: "FEATURE", duration: "Culture", genres: ["Film", "Culture"], language: "English", status: ["new", "trending"], demo: true, details: { author: "ANONYVERSE Editorial", body: "Cinema is finding its pulse in the spaces between plot points. The new midnight audience is looking for worlds with texture, not just speed.", related: ["Five films for a rainy Sunday", "The art of the opening frame"] } },
  { id: "orbit-house", kind: "movie", title: "Orbit House", eyebrow: "TOP RATED", subtitle: "Home is a moving target.", description: "A family-run hotel on a drifting moon becomes the last safe harbor in a collapsing solar system.", artwork: artwork.hero, year: "2024", rating: "8.9", duration: "1h 52m", genres: ["Sci-fi", "Family"], language: "English", status: ["recommended", "trending"], demo: true, details: { cast: ["Nia Vale", "Sol Arin"], director: "Tomas Reed", trailer: "Demo trailer available" } },
];

export const providerCatalog = [
  { id: "demo-catalog", category: "All categories", name: "ANONYVERSE Editorial Demo", status: "Active fallback", auth: "None", environment: "demo", approval: "Approved for demo only", docs: "Internal editorial catalogue" },
  { id: "movie-provider", category: "Movies & TV", name: "Future movie provider", status: "Not configured", auth: "API key", environment: "development", approval: "Pending review", docs: "Add official documentation URL" },
  { id: "anime-provider", category: "Anime & manga", name: "Future anime provider", status: "Not configured", auth: "OAuth 2.0", environment: "development", approval: "Pending review", docs: "Add official documentation URL" },
  { id: "sports-provider", category: "Live sports", name: "Future sports provider", status: "Not configured", auth: "API key", environment: "development", approval: "Pending review", docs: "Add official documentation URL" },
  { id: "music-provider", category: "Music", name: "Future music provider", status: "Not configured", auth: "API key", environment: "development", approval: "Pending review", docs: "Add official documentation URL" },
  { id: "news-provider", category: "Entertainment news", name: "Future news provider", status: "Not configured", auth: "API key", environment: "development", approval: "Pending review", docs: "Add official documentation URL" },
];

export const railConfig = [
  { title: "Trending now", statuses: ["trending"] as ContentStatus[] },
  { title: "Continue watching", statuses: [] as ContentStatus[] },
  { title: "Top rated", statuses: ["recommended"] as ContentStatus[] },
  { title: "Live sports", statuses: ["live"] as ContentStatus[] },
  { title: "New episodes", statuses: ["new"] as ContentStatus[] },
  { title: "Anime spotlight", kind: "anime" as ContentKind },
  { title: "Music picks", kind: "music" as ContentKind },
  { title: "Entertainment news", kind: "news" as ContentKind },
];
