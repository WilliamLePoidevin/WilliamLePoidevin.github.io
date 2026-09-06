import { BottlePortrait } from "./BottlePortrait";
import "./LineageNode.css";

// Matches lineage.json's relation vocabulary directly (INTEGRATION_GUIDE.md Section 2) plus
// the two extra types the original prototype's schema also carried.
type Relation = "original" | "inspiration" | "interpretation" | "alternative" | "flanker" | "similar";

const RELATION_LABEL: Record<Relation, string> = {
  original: "Original",
  inspiration: "Inspiration",
  interpretation: "Interpretation",
  alternative: "Alternative",
  flanker: "Flanker",
  similar: "Similar profile",
};

interface LineageNodeProps {
  fragrance: { id: string; name: string; house?: string | null; image?: string | null };
  relation?: Relation;
  /** True only for strong-consensus, non-disputed relations — see the live confidence-voting
      mechanic in CLONE_CABINET_UX_SPEC.md Section 11. Recomputed from votes, never a fixed
      one-time promotion. */
  verified?: boolean;
  active?: boolean;
  /** 0-100, the current confirm/dispute vote balance — display only, the caller owns the
      live recomputation. */
  confidence?: number;
  onClick?: () => void;
}

export function LineageNode({
  fragrance,
  relation = "similar",
  verified = false,
  active = false,
  confidence,
  onClick,
}: LineageNodeProps) {
  return (
    <button
      type="button"
      className={`cc-lineage-node${active ? " cc-lineage-node--active" : ""}${
        verified ? " cc-lineage-node--verified" : ""
      }`}
      onClick={onClick}
    >
      <BottlePortrait id={fragrance.id} name={fragrance.name} image={fragrance.image} radius="var(--radius-inset)" />
      <div className="cc-lineage-node__text">
        <div className="cc-lineage-node__name">{fragrance.name}</div>
        {fragrance.house ? <div className="cc-micro">{fragrance.house}</div> : null}
      </div>
      <div className="cc-lineage-node__footer">
        <span className={`cc-lineage-node__relation${verified ? " cc-lineage-node__relation--verified" : ""}`}>
          {RELATION_LABEL[relation]}
        </span>
        {confidence != null ? <span className="cc-micro cc-lineage-node__confidence">{confidence}%</span> : null}
      </div>
      {verified ? <span className="cc-lineage-node__dot" aria-label="Editorially verified" /> : null}
    </button>
  );
}
