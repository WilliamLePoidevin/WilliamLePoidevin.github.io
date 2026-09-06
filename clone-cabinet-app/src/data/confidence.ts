// Community-Determined Confidence — CLONE_CABINET_UX_SPEC.md Section 11. Confidence is not a
// stored field to trust; it's a live display of the current confirm/dispute vote balance,
// recomputed at render time so it can never drift out of sync with the raw counts (11.2).
// Thresholds are the spec's own ("illustrative, tune with real data later").
export type ConfidenceState = "neutral" | "emerging" | "confirmed" | "disputed" | "disputesThis";

export const CONFIDENCE_LABEL: Record<ConfidenceState, string> = {
  neutral: "Neutral",
  emerging: "Emerging",
  confirmed: "Community Confirmed",
  disputed: "Disputed",
  disputesThis: "Community Disputes This",
};

export function getConfidenceState(confirmVotes: number, disputeVotes: number): ConfidenceState {
  const total = confirmVotes + disputeVotes;
  if (total < 10) return "neutral";
  const pctConfirm = confirmVotes / total;
  if (pctConfirm >= 0.8) return "confirmed";
  if (pctConfirm >= 0.6) return "emerging";
  if (pctConfirm <= 0.3) return "disputesThis";
  return "disputed";
}

export function getConfidencePercent(confirmVotes: number, disputeVotes: number): number {
  const total = confirmVotes + disputeVotes;
  if (total === 0) return 0;
  return Math.round((confirmVotes / total) * 100);
}
