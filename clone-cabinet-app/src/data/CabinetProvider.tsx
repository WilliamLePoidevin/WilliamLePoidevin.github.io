import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CabinetEntry, CabinetStatus } from "./cabinet";

const STORAGE_KEY = "cc-cabinet-entries";

function readStored(): Record<string, CabinetEntry> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CabinetEntry>) : {};
  } catch {
    // Private browsing, disabled storage, or corrupt JSON — start empty rather than crash.
    return {};
  }
}

function writeStored(entries: Record<string, CabinetEntry>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Non-fatal: this session's changes just won't persist.
  }
}

interface CabinetContextValue {
  entries: Map<string, CabinetEntry>;
  addEntry: (entry: CabinetEntry) => void;
  updateEntry: (fragranceId: string, patch: Partial<Omit<CabinetEntry, "fragranceId">>) => void;
  removeEntry: (fragranceId: string) => void;
}

const CabinetContext = createContext<CabinetContextValue | null>(null);

// Genuinely local, per-browser state — there's no account system and no backend for this to
// sync to. Collectors on a different device or browser start with an empty cabinet; that's an
// honest limitation to surface eventually (a Settings note), not something to paper over.
export function CabinetProvider({ children }: { children: ReactNode }) {
  const [entriesRecord, setEntriesRecord] = useState<Record<string, CabinetEntry>>(readStored);

  const addEntry = useCallback((entry: CabinetEntry) => {
    setEntriesRecord((current) => {
      const next = { ...current, [entry.fragranceId]: entry };
      writeStored(next);
      return next;
    });
  }, []);

  const updateEntry = useCallback((fragranceId: string, patch: Partial<Omit<CabinetEntry, "fragranceId">>) => {
    setEntriesRecord((current) => {
      const existing = current[fragranceId];
      if (!existing) return current;
      const next = { ...current, [fragranceId]: { ...existing, ...patch } };
      writeStored(next);
      return next;
    });
  }, []);

  const removeEntry = useCallback((fragranceId: string) => {
    setEntriesRecord((current) => {
      if (!(fragranceId in current)) return current;
      const next = { ...current };
      delete next[fragranceId];
      writeStored(next);
      return next;
    });
  }, []);

  const value = useMemo<CabinetContextValue>(
    () => ({ entries: new Map(Object.entries(entriesRecord)), addEntry, updateEntry, removeEntry }),
    [entriesRecord, addEntry, updateEntry, removeEntry]
  );

  return <CabinetContext.Provider value={value}>{children}</CabinetContext.Provider>;
}

export function useCabinet(): CabinetContextValue {
  const ctx = useContext(CabinetContext);
  if (!ctx) throw new Error("useCabinet must be used within a CabinetProvider");
  return ctx;
}

export function defaultEntry(fragranceId: string, status: CabinetStatus = "In Cabinet"): CabinetEntry {
  return {
    fragranceId,
    status,
    acquired: new Date().toISOString().slice(0, 10),
    sizeMl: null,
    fillPercent: 100,
    value: null,
    wornCount: 0,
    lastWorn: null,
  };
}
