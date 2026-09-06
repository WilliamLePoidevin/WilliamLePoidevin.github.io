import { hashToRange, archiveCode } from "../../lib/hash";
import "./BottlePortrait.css";

type Ratio = "portrait" | "square" | "tall" | "hero";

const RATIOS: Record<Ratio, string> = {
  portrait: "3 / 4",
  square: "1 / 1",
  tall: "2 / 3",
  hero: "4 / 5",
};

interface BottlePortraitProps {
  /** Real product photo. Every record in the current dataset has image: null — see the
      placeholder branch below, which is the actual decision, not a stopgap. */
  image?: string | null;
  name: string;
  id: string;
  ratio?: Ratio;
  radius?: string;
  inset?: boolean;
  /** Only the record currently open, per ASSET_REQUEST_RESPONSE.md item 5. */
  glow?: boolean;
}

// No product photography exists for this dataset (4,113 fragrances, image: null for all of
// them) and never will be per-record — see ASSET_REQUEST_RESPONSE.md item 5. Decided: a
// deterministic placeholder that reads as an artefact in a cabinet, not a coloured box or a
// fake photo. The ground tint is derived from a hash of `id` mixed toward --surface-shelf
// using only existing colorway tokens (never a free hue), so it stays inside the active
// colorway and is stable across renders/re-themes for the same fragrance.
export function BottlePortrait({
  image,
  name,
  id,
  ratio = "portrait",
  radius = "var(--radius-card)",
  inset = true,
  glow = false,
}: BottlePortraitProps) {
  const style = { aspectRatio: RATIOS[ratio], borderRadius: radius };

  if (image) {
    return (
      <div
        className={`cc-bottle${inset ? " cc-bottle--inset" : ""}${glow ? " cc-bottle--glow" : ""}`}
        style={style}
      >
        <img className="cc-bottle__img" src={image} alt={`${name} bottle`} loading="lazy" />
      </div>
    );
  }

  const mixPercent = hashToRange(id, 84, 96);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`cc-bottle cc-bottle--placeholder${inset ? " cc-bottle--inset" : ""}${glow ? " cc-bottle--glow" : ""}`}
      style={{ ...style, background: `color-mix(in oklab, var(--surface-shelf) ${mixPercent}%, var(--rose-alloy))` }}
      role="img"
      aria-label={`${name}, no photograph available`}
    >
      <span className="cc-bottle__initial">{initial}</span>
      <span className="cc-bottle__code cc-archive-code">{archiveCode(id)}</span>
    </div>
  );
}
