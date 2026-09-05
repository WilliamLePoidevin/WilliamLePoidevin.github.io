import "./IrisSeam.css";

// The violet-named-but-colorway-tinted light line. Electric signal is light, never paint:
// a core, an edge, a glow, one figure — never a filled area larger than a chip.
// - orientation="h": the seam gradient runs horizontally (nav chamber core, section rules).
// - pulse: continuous cc-iris-pulse breathing — the only continuous motion in the system.
// - flash: one-shot selection flash (opacity .45->1, glow 6px->14px) then decays over 420ms,
//   as used by the bottom nav on tab selection.
interface IrisSeamProps {
  orientation?: "h" | "v";
  length?: number | string;
  pulse?: boolean;
  flash?: boolean;
  className?: string;
}

export function IrisSeam({ orientation = "h", length = "26px", pulse, flash, className }: IrisSeamProps) {
  const style =
    orientation === "h" ? { width: length, height: "2px" } : { height: length, width: "2px" };
  return (
    <span
      className={`cc-iris-seam cc-iris-seam--${orientation}${pulse ? " cc-iris-seam--pulse" : ""}${
        flash ? " cc-iris-seam--flash" : ""
      }${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden="true"
    />
  );
}
