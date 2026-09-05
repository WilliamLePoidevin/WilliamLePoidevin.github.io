import "./VerifiedBadge.css";

type Tone = "alloy" | "signal";
type Size = "sm" | "md";

interface VerifiedBadgeProps {
  label?: string;
  tone?: Tone;
  size?: Size;
}

// A label + small dot, never the general Confidence Badge's shape — per the UX spec's
// non-negotiable that confidence, rating, and trust signals must never share a visual
// language. "alloy" (metal, static) reads as an account-level fact ("Cabinet Verified");
// "signal" (electric, glowing) is reserved for a live/current state.
export function VerifiedBadge({ label = "Cabinet Verified", tone = "alloy", size = "md" }: VerifiedBadgeProps) {
  return (
    <span className={`cc-verified-badge cc-verified-badge--${tone} cc-verified-badge--${size}`}>
      <span className="cc-verified-badge__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
