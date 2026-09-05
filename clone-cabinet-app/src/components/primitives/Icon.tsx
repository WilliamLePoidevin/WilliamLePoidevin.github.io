// Icon — vector placeholder for the handoff's PNG icon set (assets/icons/{light,ink}/*.png),
// which wasn't included in this package. Spec: 1.25-1.5px stroke at 20px, square terminals,
// never filled, never duotone, never rounded-cap. Extend ICON_PATHS as more are needed;
// replace with the real SF Symbols/SVG set per the handoff's "known gaps" note.
import "./Icon.css";

const ICON_PATHS: Record<string, string> = {
  check: "M4 10.5L8 14.5L16 6",
  close: "M5 5L15 15M15 5L5 15",
  "chevron-right": "M7 4L13 10L7 16",
  "chevron-left": "M13 4L7 10L13 16",
  dot: "M10 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  alert: "M10 4L18 17H2L10 4ZM10 8.5V12M10 14.5V14.51",
  plus: "M10 4V16M4 10H16",
};

export type IconName = keyof typeof ICON_PATHS;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}

export function Icon({ name, size = 20, className, title }: IconProps) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={`cc-icon${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
