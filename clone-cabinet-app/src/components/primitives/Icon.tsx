// Icon — the general UI glyph set (chevrons, close, alert, etc.), NOT the brand's five nav
// destination icons (see NavGlyph for those, backed by real assets/icons/{light,ink} PNGs).
// Lucide is the confirmed choice for this set per ASSET_REQUEST_RESPONSE.md item 3: stroked,
// 1.25-1.5px on a 20px box, square terminals, fill="none", stroke="currentColor" so one file
// serves all 13 colorways in both modes. Still a flagged substitution — ask the brand owner to
// confirm Lucide before launch.
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Plus,
  X,
  type LucideIcon,
} from "lucide-react";
import "./Icon.css";

const ICONS: Record<string, LucideIcon> = {
  check: Check,
  close: X,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  dot: Circle,
  alert: AlertTriangle,
  plus: Plus,
};

export type IconName = keyof typeof ICONS;

// Colour by state, per the asset response: idle/active/selected, never a fourth state.
export type IconTone = "idle" | "active" | "selected";

const TONE_COLOR: Record<IconTone, string> = {
  idle: "var(--text-tertiary)",
  active: "var(--text-primary)",
  selected: "var(--text-metal)",
};

interface IconProps {
  name: IconName;
  size?: number;
  tone?: IconTone;
  className?: string;
  title?: string;
}

export function Icon({ name, size = 20, tone, className, title }: IconProps) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return (
    <Cmp
      className={`cc-icon${className ? ` ${className}` : ""}`}
      size={size}
      color={tone ? TONE_COLOR[tone] : "currentColor"}
      strokeWidth={1.4}
      absoluteStrokeWidth
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
    </Cmp>
  );
}
