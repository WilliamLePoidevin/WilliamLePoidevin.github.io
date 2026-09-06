import type { Fragrance, House } from "./types";

// Deliberately NOT "Trending" or "New to the Index" (CLONE_CABINET_UX_SPEC.md Section 4) —
// those need real signals (added-date, live vote/save activity) this dataset doesn't carry.
// Faking recency or popularity would be exactly the kind of fabricated placeholder the
// "hide, don't fake" non-negotiable rules out. valueScore is a real field; this is an honest,
// deterministic ordering by it, nothing more.
export function getFeatured(fragrances: Fragrance[], count: number): Fragrance[] {
  return fragrances
    .filter((f) => f.valueScore != null)
    .sort((a, b) => (b.valueScore ?? 0) - (a.valueScore ?? 0))
    .slice(0, count);
}

export function getTopHouses(houses: House[], count: number): House[] {
  return [...houses].sort((a, b) => b.count - a.count).slice(0, count);
}

export function getFragrancesByHouse(fragrances: Fragrance[], houseId: string): Fragrance[] {
  return fragrances.filter((f) => f.houseId === houseId);
}

export function searchFragrances(fragrances: Fragrance[], query: string, limit: number): Fragrance[] {
  const q = query.trim().toLowerCase();
  if (!q) return fragrances.slice(0, limit);
  const results: Fragrance[] = [];
  for (const f of fragrances) {
    if (f.name.toLowerCase().includes(q) || f.house?.toLowerCase().includes(q)) {
      results.push(f);
      if (results.length >= limit) break;
    }
  }
  return results;
}
