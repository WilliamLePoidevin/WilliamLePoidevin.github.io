import "./AccordBar.css";

type Tone = "alloy" | "iris";

interface AccordBarProps {
  label: string;
  /** 0-100 strength. Required — the current dataset has no per-accord strength value (accords
      is either [] or a bare list of names), so a caller with only names and no strength has
      nothing honest to pass here. Don't invent one; skip the row instead. */
  value: number;
  tone?: Tone;
  showValue?: boolean;
}

export function AccordBar({ label, value, tone = "alloy", showValue = true }: AccordBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const fill = tone === "iris" ? "var(--grad-iris-seam-h)" : "var(--grad-rose-reflection)";

  return (
    <div className="cc-accord-bar">
      <span className="cc-accord-bar__label cc-label">{label}</span>
      <span className="cc-accord-bar__track">
        <span
          className="cc-accord-bar__fill"
          role="img"
          aria-label={`${label} ${clamped} percent`}
          style={{ width: `${clamped}%`, background: fill }}
        />
      </span>
      {showValue ? <span className="cc-micro cc-accord-bar__value">{clamped}%</span> : null}
    </div>
  );
}
