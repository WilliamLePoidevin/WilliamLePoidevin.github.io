import { getConfidenceState, CONFIDENCE_LABEL } from "../../data/confidence";
import { StatusChip } from "../primitives";

const TONE = {
  neutral: "neutral",
  emerging: "signal",
  confirmed: "success",
  disputed: "warning",
  disputesThis: "trade",
} as const;

// A confidence badge is a factual-claim signal ("is this pairing true"), never a rating star
// or a trade/trust indicator — CLONE_CABINET_UX_SPEC.md Section 0's non-negotiable that these
// three trust languages must never look alike. State is always recomputed from the current
// vote tally (Section 11.2), never read from a stored field.
export function ConfidenceBadge({ confirmVotes, disputeVotes }: { confirmVotes: number; disputeVotes: number }) {
  const state = getConfidenceState(confirmVotes, disputeVotes);
  return <StatusChip tone={TONE[state]}>{CONFIDENCE_LABEL[state]}</StatusChip>;
}
