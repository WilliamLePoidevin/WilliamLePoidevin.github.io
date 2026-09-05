import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./StatusChip.css";

// Tone is a display fact (cabinet status, warning, confirmation), never a rating or a
// confidence score — those are separate systems with their own shapes (Rating Stars,
// Confidence Badge) per CLONE_CABINET_UX_SPEC.md Section 0's non-negotiable.
type Tone = "neutral" | "cabinet" | "warning" | "signal" | "success" | "trade";

interface StatusChipProps extends Omit<ButtonHTMLAttributes<HTMLElement>, "onClick"> {
  tone?: Tone;
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function StatusChip({ tone = "neutral", selected, onClick, children, className, ...rest }: StatusChipProps) {
  const interactive = typeof onClick === "function";
  const Tag = interactive ? "button" : "span";
  return (
    <Tag
      className={`cc-chip cc-chip--${tone}${selected ? " cc-chip--selected" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      type={interactive ? "button" : undefined}
      aria-pressed={interactive ? selected : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
