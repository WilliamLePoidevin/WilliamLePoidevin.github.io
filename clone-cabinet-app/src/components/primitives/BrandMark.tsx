// BrandMark — the Riviera Cobalt identity. Raster only: per ASSET_REQUEST_RESPONSE.md item 3,
// the mark is a photographic 3D object (two mirrored brackets forming a doubled C around a
// central atomizer), not vector artwork — a re-draw as SVG is prohibited by the brand's own
// rules. Request the original render/3D source for anything scaling past ~330px or sitting on
// a light field; below 56px the mark's terminals disappear, so this swaps to the plain
// mark-icon squircle automatically.
import markIcon from "../../assets/brand/mark-icon.png";
import logoStacked from "../../assets/brand/riviera-logo-stacked.png";
import logoMark from "../../assets/brand/riviera-logo-mark.png";
import "./BrandMark.css";

type Variant = "mark" | "stacked" | "icon";

const SRC: Record<Variant, string> = {
  mark: logoMark,
  stacked: logoStacked,
  icon: markIcon,
};

interface BrandMarkProps {
  variant?: Variant;
  size?: number;
  className?: string;
}

const MARK_MIN_SIZE = 56;

export function BrandMark({ variant = "mark", size = 28, className }: BrandMarkProps) {
  // Below the floor, the full mark's terminals disappear — fall back to the icon squircle
  // rather than scaling the doubled-C mark small.
  const resolvedVariant: Variant = variant === "mark" && size < MARK_MIN_SIZE ? "icon" : variant;
  return (
    <img
      className={`cc-brand-mark${className ? ` ${className}` : ""}`}
      src={SRC[resolvedVariant]}
      alt="Clone Cabinet"
      style={{ width: size, height: resolvedVariant === "stacked" ? "auto" : size }}
    />
  );
}
