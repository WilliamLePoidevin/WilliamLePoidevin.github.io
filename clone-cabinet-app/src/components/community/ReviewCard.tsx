import { CollectorAvatar } from "./CollectorAvatar";
import { StatusChip } from "../primitives";
import "./ReviewCard.css";

interface Reaction {
  label: string;
  count: number;
}

interface ReviewCardProps {
  author: string;
  level?: string;
  verified?: boolean;
  /** Rating (0-5), a separate visual language from confidence — never the same shape/colour
      as a lineage confidence badge, per CLONE_CABINET_UX_SPEC.md Section 0's non-negotiable. */
  score?: number;
  body: string;
  context?: string;
  reactions?: Reaction[];
  date?: string;
}

export function ReviewCard({ author, level, verified, score, body, context, reactions = [], date }: ReviewCardProps) {
  return (
    <article className="cc-review-card">
      <header className="cc-review-card__header">
        <CollectorAvatar name={author} level={level} verified={verified} size={36} />
        <div className="cc-review-card__byline">
          <div className="cc-review-card__author">{author}</div>
          {context ? <div className="cc-micro">{context}</div> : null}
        </div>
        {score != null ? <span className="cc-review-card__score cc-archive-code">{score.toFixed(1)}</span> : null}
      </header>
      <p className="cc-review-card__body">{body}</p>
      {reactions.length > 0 || date ? (
        <footer className="cc-review-card__footer">
          {reactions.map((r) => (
            <StatusChip key={r.label}>
              {r.label} {r.count}
            </StatusChip>
          ))}
          {date ? <span className="cc-micro cc-review-card__date">{date}</span> : null}
        </footer>
      ) : null}
    </article>
  );
}
