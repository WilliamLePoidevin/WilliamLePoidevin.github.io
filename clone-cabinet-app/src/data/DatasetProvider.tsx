import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Fragrance, House, LineageMap } from "./types";

interface Dataset {
  fragrances: Fragrance[];
  houses: House[];
  lineage: LineageMap;
  fragrancesById: Map<string, Fragrance>;
  housesById: Map<string, House>;
}

interface DatasetContextValue {
  dataset: Dataset | null;
  loading: boolean;
  error: string | null;
}

const DatasetContext = createContext<DatasetContextValue>({ dataset: null, loading: true, error: null });

// Fetched at runtime from public/data/ rather than bundled via static import: ~4MB combined
// (4,113 fragrances + their full bidirectional lineage), too large to want in the initial JS
// bundle. No backend exists — this is the real, current data layer per INTEGRATION_GUIDE.md's
// own recommendation to point components at these files directly rather than an API.
export function DatasetProvider({ children }: { children: ReactNode }) {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL;

    Promise.all([
      fetch(`${base}data/fragrances.json`).then((r) => r.json() as Promise<Fragrance[]>),
      fetch(`${base}data/houses.json`).then((r) => r.json() as Promise<House[]>),
      fetch(`${base}data/lineage.json`).then((r) => r.json() as Promise<LineageMap>),
    ])
      .then(([fragrances, houses, lineage]) => {
        if (cancelled) return;
        setDataset({
          fragrances,
          houses,
          lineage,
          fragrancesById: new Map(fragrances.map((f) => [f.id, f])),
          housesById: new Map(houses.map((h) => [h.id, h])),
        });
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load dataset");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<DatasetContextValue>(
    () => ({ dataset, loading: !dataset && !error, error }),
    [dataset, error]
  );

  return <DatasetContext.Provider value={value}>{children}</DatasetContext.Provider>;
}

export function useDataset(): DatasetContextValue {
  return useContext(DatasetContext);
}
