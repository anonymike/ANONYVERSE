import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { catalog } from "./catalog";

const STORAGE_KEY = "anonyverse-library";
type LibraryContextValue = { saved: string[]; toggleSaved: (id: string) => void; isSaved: (id: string) => boolean; progress: Record<string, number>; };
const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>(["frequency", "neon-pilgrims"]);
  const [progress] = useState<Record<string, number>>({ "glass-echoes": 0.42, "orbit-house": 0.18 });
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((value) => { if (value) setSaved(JSON.parse(value)); }).catch(() => undefined); }, []);
  const toggleSaved = (id: string) => setSaved((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined); return next; });
  const value = useMemo(() => ({ saved, toggleSaved, isSaved: (id: string) => saved.includes(id), progress }), [saved, progress]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
export function useLibrary() { const value = useContext(LibraryContext); if (!value) throw new Error("useLibrary must be used inside LibraryProvider"); return value; }
export function savedItems(ids: string[]) { return ids.map((id) => catalog.find((item) => item.id === id)).filter(Boolean); }
