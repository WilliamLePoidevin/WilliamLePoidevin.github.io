import "./TrustMetric.css";

type Tone = "neutral" | "good" | "caution" | "alert";

interface TrustMetricProps {
  label: string;
  value: string | number;
  detail?: string;
  tone?: Tone;
}

export function TrustMetric({ label, value, detail, tone = "neutral" }: TrustMetricProps) {
  return (
    <div className="cc-trust-metric">
      <span className={`cc-trust-metric__value cc-trust-metric__value--${tone}`}>{value}</span>
      <span className="cc-label cc-trust-metric__label">{label}</span>
      {detail ? <span className="cc-micro cc-trust-metric__detail">{detail}</span> : null}
    </div>
  );
}
