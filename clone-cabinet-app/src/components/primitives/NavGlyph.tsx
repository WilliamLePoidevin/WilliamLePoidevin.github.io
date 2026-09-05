// NavGlyph — the brand's own five nav-destination icons (cropped from board 02's key-element
// studies), one per bottom-tab root: Discover, Cabinet, Lineage, Trade, You. Raster (PNG),
// shipped in two tone variants for night/day — see ASSET_REQUEST_RESPONSE.md item 3.
//
// This is NOT the general UI icon set (chevrons, close, alert — see Icon.tsx/Lucide). Only
// these five names exist; there is no vector source to extend from.
import collectionLight from "../../assets/icons/light/collection.png";
import connectLight from "../../assets/icons/light/connect.png";
import discoverLight from "../../assets/icons/light/discover.png";
import privateArchiveLight from "../../assets/icons/light/private-archive.png";
import scentLineageLight from "../../assets/icons/light/scent-lineage.png";
import collectionInk from "../../assets/icons/ink/collection.png";
import connectInk from "../../assets/icons/ink/connect.png";
import discoverInk from "../../assets/icons/ink/discover.png";
import privateArchiveInk from "../../assets/icons/ink/private-archive.png";
import scentLineageInk from "../../assets/icons/ink/scent-lineage.png";
import "./NavGlyph.css";

export type NavGlyphName = "collection" | "connect" | "discover" | "private-archive" | "scent-lineage";
type GlyphMode = "light" | "ink";
type GlyphTone = "primary" | "secondary" | "tertiary";

const SRC: Record<GlyphMode, Record<NavGlyphName, string>> = {
  light: {
    collection: collectionLight,
    connect: connectLight,
    discover: discoverLight,
    "private-archive": privateArchiveLight,
    "scent-lineage": scentLineageLight,
  },
  ink: {
    collection: collectionInk,
    connect: connectInk,
    discover: discoverInk,
    "private-archive": privateArchiveInk,
    "scent-lineage": scentLineageInk,
  },
};

// Night grounds read the light (cream) tone; the two published light skins read ink.
const TONE_OPACITY: Record<GlyphTone, number> = {
  primary: 1,
  secondary: 0.68,
  tertiary: 0.45,
};

interface NavGlyphProps {
  name: NavGlyphName;
  size?: number;
  tone?: GlyphTone;
  mode?: GlyphMode;
  className?: string;
}

export function NavGlyph({ name, size = 22, tone = "primary", mode = "light", className }: NavGlyphProps) {
  return (
    <img
      className={`cc-nav-glyph${className ? ` ${className}` : ""}`}
      src={SRC[mode][name]}
      alt=""
      aria-hidden="true"
      style={{ width: size, height: size, opacity: TONE_OPACITY[tone] }}
    />
  );
}
