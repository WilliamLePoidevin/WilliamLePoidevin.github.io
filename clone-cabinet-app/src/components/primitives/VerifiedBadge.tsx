import { Icon } from "./Icon";
import "./VerifiedBadge.css";

interface VerifiedBadgeProps {
  size?: "sm" | "md";
  title?: string;
}

// Metal carries active indicators and primary affordances — verification is a metal signal,
// never the electric-blue signal colour (that's reserved for live/confirmation states).
export function VerifiedBadge({ size = "md", title = "Verified" }: VerifiedBadgeProps) {
  return (
    <span className={`cc-verified-badge cc-verified-badge--${size}`} role="img" aria-label={title}>
      <Icon name="check" size={size === "sm" ? 12 : 14} />
    </span>
  );
}
