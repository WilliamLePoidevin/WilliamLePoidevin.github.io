import "./MetricDial.css";

type Tone = "iris" | "alloy";

interface MetricDialProps {
  /** 0-100. Required — projection/sillage/longevity are null for the whole dataset today; a
      caller with no real number has nothing honest to render here. Skip the dial, don't fake
      a value. */
  value: number;
  label?: string;
  size?: number;
  caption?: string;
  tone?: Tone;
}

export function MetricDial({ value, label, size = 132, caption, tone = "iris" }: MetricDialProps) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const color = tone === "iris" ? "var(--electric-iris)" : "var(--rose-alloy)";

  return (
    <div className="cc-metric-dial" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="cc-metric-dial__svg" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-divider)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - clamped / 100)}
          className={tone === "iris" ? "cc-metric-dial__arc cc-metric-dial__arc--iris" : "cc-metric-dial__arc"}
        />
      </svg>
      <div className="cc-metric-dial__readout">
        <span className="cc-metric-dial__value" style={{ fontSize: size * 0.26 }}>
          {clamped}%
        </span>
        {label ? <span className="cc-label cc-metric-dial__label">{label}</span> : null}
        {caption ? <span className="cc-micro">{caption}</span> : null}
      </div>
    </div>
  );
}
