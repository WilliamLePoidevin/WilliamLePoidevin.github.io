// Cabinet status vocabulary per INTEGRATION_GUIDE.md Section 6: the earlier owned/wishlist
// boolean split becomes these, mapped onto the handoff's richer cabinetEntry schema.
export type CabinetStatus = "In Cabinet" | "For Trade" | "Seeking" | "Archived" | "Sampled";

export const CABINET_STATUSES: readonly CabinetStatus[] = [
  "In Cabinet",
  "For Trade",
  "Seeking",
  "Archived",
  "Sampled",
];

// There is no backend and no accounts — this is genuinely local, per-browser state (see
// CabinetProvider), not a stand-in for a server record. Every field here is something the
// collector themselves enters, never a dataset enrichment field: nothing here is subject to
// the "hide, don't fake" rule the way fragrance.score or fragrance.accords are, because
// there's no real value being faked — the user is the source of truth for their own cabinet.
export interface CabinetEntry {
  fragranceId: string;
  status: CabinetStatus;
  /** ISO date string. */
  acquired: string;
  sizeMl: number | null;
  fillPercent: number;
  /** Private — never surfaced in any future sharing/trade-listing view. */
  value: number | null;
  wornCount: number;
  lastWorn: string | null;

  // Meaningful only when status is "For Trade" or "Seeking" — the public asking terms for a
  // listing, entirely distinct from `value` above. `value` is a private appraisal that must
  // never be shown outside the owner's own cabinet view (the non-negotiable: "sharing a
  // cabinet never shares values"); these are terms the collector is choosing to publish.
  condition: string | null;
  presentation: string | null;
  price: number | null;
  wants: string | null;
}

export type SortKey = "acquired" | "house" | "fill" | "value";
