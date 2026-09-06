import type { ReactNode } from "react";
import { BottlePortrait } from "./BottlePortrait";
import { StatusChip } from "../primitives";
import "./FragranceCard.css";

// A subset of the real fragrances.json schema (INTEGRATION_GUIDE.md Section 2) — every
// enrichment field below is null for most records today. Every one of them is optional and
// conditionally rendered; nothing here fabricates a placeholder for a null field.
export interface FragranceCardData {
  id: string;
  name: string;
  house?: string | null;
  year?: number | null;
  concentration?: string | null;
  accords?: string[];
  score?: number | null;
  image?: string | null;
  thesis?: string | null;
  lineageNote?: string | null;
}

type Variant = "editorial" | "compact" | "shelf" | "object" | "lineage";

interface FragranceCardProps {
  fragrance: FragranceCardData;
  variant?: Variant;
  status?: string;
  onClick?: () => void;
  action?: ReactNode;
}

function Score({ score }: { score?: number | null }) {
  if (score == null) return null;
  return <span className="cc-fragrance-card__score cc-archive-code">{score.toFixed(1)}</span>;
}

export function FragranceCard({ fragrance, variant = "editorial", status, onClick, action }: FragranceCardProps) {
  const { id, name, house, year, concentration, accords = [], score, image, thesis, lineageNote } = fragrance;
  const meta = [house, concentration, year].filter(Boolean).join(" · ");

  if (variant === "compact") {
    return (
      <div className="cc-fragrance-card cc-fragrance-card--compact" onClick={onClick}>
        <div className="cc-fragrance-card__thumb cc-fragrance-card__thumb--sm">
          <BottlePortrait id={id} name={name} image={image} ratio="square" radius="var(--radius-inset)" />
        </div>
        <div className="cc-fragrance-card__text">
          <div className="cc-fragrance-card__name cc-fragrance-card__name--sm">{name}</div>
          {meta ? <div className="cc-micro cc-fragrance-card__meta">{meta}</div> : null}
        </div>
        {status ? <StatusChip tone="cabinet">{status}</StatusChip> : null}
        <Score score={score} />
      </div>
    );
  }

  if (variant === "shelf") {
    return (
      <div className="cc-fragrance-card cc-fragrance-card--shelf" onClick={onClick}>
        <BottlePortrait id={id} name={name} image={image} ratio="tall" radius="var(--radius-chip)" />
        {status ? <span className="cc-fragrance-card__dot" /> : null}
      </div>
    );
  }

  if (variant === "object") {
    return (
      <div className="cc-fragrance-card cc-fragrance-card--object" onClick={onClick}>
        <BottlePortrait id={id} name={name} image={image} ratio="square" radius="0" inset={false} />
        <div className="cc-fragrance-card__pad">
          {house ? <div className="cc-label cc-fragrance-card__house">{house}</div> : null}
          <div className="cc-fragrance-card__name cc-fragrance-card__name--sm">{name}</div>
          <div className="cc-fragrance-card__row">
            <span className="cc-micro">{[concentration, year].filter(Boolean).join(" · ")}</span>
            <Score score={score} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "lineage") {
    return (
      <div className="cc-fragrance-card cc-fragrance-card--lineage" onClick={onClick}>
        <div className="cc-fragrance-card__thumb">
          <BottlePortrait id={id} name={name} image={image} ratio="square" radius="var(--radius-inset)" />
        </div>
        <div className="cc-fragrance-card__text">
          <div className="cc-fragrance-card__name cc-fragrance-card__name--sm">{name}</div>
          {meta ? <div className="cc-micro cc-fragrance-card__meta">{meta}</div> : null}
          {lineageNote ? <div className="cc-fragrance-card__lineage-note cc-micro">{lineageNote}</div> : null}
        </div>
        {action}
      </div>
    );
  }

  // editorial (default)
  return (
    <article className="cc-fragrance-card cc-fragrance-card--editorial" onClick={onClick}>
      <BottlePortrait id={id} name={name} image={image} ratio="hero" radius="0" inset={false} />
      <div className="cc-fragrance-card__pad">
        {house ? <div className="cc-label cc-fragrance-card__house">{house}</div> : null}
        <div className="cc-fragrance-card__name">{name}</div>
        {thesis ? <p className="cc-fragrance-card__thesis">{thesis}</p> : null}
        <div className="cc-fragrance-card__row cc-fragrance-card__row--wrap">
          {accords.slice(0, 3).map((a) => (
            <StatusChip key={a}>{a}</StatusChip>
          ))}
          {status ? <StatusChip tone="cabinet">{status}</StatusChip> : null}
          <span className="cc-fragrance-card__score-slot">
            <Score score={score} />
          </span>
        </div>
        {action ? <div className="cc-fragrance-card__action">{action}</div> : null}
      </div>
    </article>
  );
}
