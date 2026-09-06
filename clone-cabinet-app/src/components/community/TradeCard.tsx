import type { ReactNode } from "react";
import { BottlePortrait } from "../fragrance/BottlePortrait";
import { CollectorAvatar } from "./CollectorAvatar";
import { StatusChip, VerifiedBadge } from "../primitives";
import "./TradeCard.css";

interface TradeListing {
  fragrance: { id: string; name: string; house?: string | null; image?: string | null };
  condition?: string;
  fill?: number;
  presentation?: string;
  collectorName: string;
  trades?: number;
  region?: string;
  wants?: string;
  verified?: boolean;
}

interface TradeCardProps {
  listing: TradeListing;
  onClick?: () => void;
  action?: ReactNode;
}

export function TradeCard({ listing, onClick, action }: TradeCardProps) {
  const { fragrance, condition, fill, presentation, collectorName, trades, region, wants, verified } = listing;

  return (
    <article className={`cc-trade-card${onClick ? " cc-trade-card--interactive" : ""}`} onClick={onClick}>
      <div className="cc-trade-card__portrait">
        <BottlePortrait id={fragrance.id} name={fragrance.name} image={fragrance.image} radius="var(--radius-chip)" />
      </div>
      <div className="cc-trade-card__body">
        <div>
          {fragrance.house ? <div className="cc-label cc-trade-card__house">{fragrance.house}</div> : null}
          <div className="cc-trade-card__name">{fragrance.name}</div>
        </div>
        <div className="cc-trade-card__chips">
          {condition ? <StatusChip tone="trade">{condition}</StatusChip> : null}
          {fill != null ? <StatusChip>{fill}% full</StatusChip> : null}
          {presentation ? <StatusChip>{presentation}</StatusChip> : null}
        </div>
        <div className="cc-trade-card__collector">
          <CollectorAvatar name={collectorName} size={24} verified={verified} />
          <div className="cc-trade-card__collector-text">
            <div className="cc-trade-card__collector-name">{collectorName}</div>
            <div className="cc-micro">
              {[trades != null ? `${trades} trades` : null, region].filter(Boolean).join(" · ")}
            </div>
          </div>
          {verified ? <VerifiedBadge label="Trade Verified" size="sm" /> : null}
        </div>
        {wants ? <div className="cc-micro cc-trade-card__wants">Wants: {wants}</div> : null}
        {action}
      </div>
    </article>
  );
}
