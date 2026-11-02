import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = { metadataBase: new URL("https://anonyverse.anonymiketech.space"), title: { default: "ANONYVERSE — Cinema, Culture & Live", template: "%s — ANONYVERSE" }, description: "A cinematic entertainment universe for films, series, anime, sport, music and culture.", openGraph: { title: "ANONYVERSE — Cinema, Culture & Live", description: "Find your next obsession.", type: "website" }, twitter: { card: "summary_large_image", title: "ANONYVERSE", description: "Cinema, culture and live moments." } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>; }
