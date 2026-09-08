import type { VoteHistoryPoint } from "../../data/LineageVotesProvider";
import "./ConfidenceSparkline.css";

function percentOf(p: VoteHistoryPoint): number {
  const total = p.confirm + p.dispute;
  return total > 0 ? (p.confirm / total) * 100 : 50;
}

const WIDTH = 240;
const HEIGHT = 40;
const PAD = 4;

// Section 11.2's confidence-history sparkline — the brand board's "intensity waveform"
// component, finally driven by real data instead of a decorative readout. Renders only once
// this browser has cast at least one real, timestamped vote on this relation (history.length
// > 1): a lone seeded point isn't a history, and drawing a flat line for it would read as
// real activity that never happened.
export function ConfidenceSparkline({ history }: { history: VoteHistoryPoint[] }) {
  if (history.length < 2) return null;

  const points = history.map((p, i) => ({
    x: PAD + (i / (history.length - 1)) * (WIDTH - PAD * 2),
    y: PAD + (1 - percentOf(p) / 100) * (HEIGHT - PAD * 2),
    real: p.at !== null,
  }));
  const lastAt = history[history.length - 1].at;

  return (
    <div className="cc-confidence-spark">
      <span className="cc-label cc-confidence-spark__label">Confidence over time</span>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="cc-confidence-spark__svg" preserveAspectRatio="none">
        <line x1={PAD} y1={HEIGHT / 2} x2={WIDTH - PAD} y2={HEIGHT / 2} className="cc-confidence-spark__midline" />
        <polyline points={points.map((p) => `${p.x},${p.y}`).join(" ")} className="cc-confidence-spark__line" />
        {points
          .filter((p) => p.real)
          .map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.5} className="cc-confidence-spark__dot" />
          ))}
      </svg>
      {lastAt ? (
        <span className="cc-micro cc-confidence-spark__note">
          Last moved by your vote on {new Date(lastAt).toLocaleDateString()}
        </span>
      ) : null}
    </div>
  );
}
