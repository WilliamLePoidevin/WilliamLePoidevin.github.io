import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** Render this many stacked text-line bars instead of a single block. */
  lines?: number;
  className?: string;
}

export function SkeletonLoader({ width = "100%", height = 16, radius, lines, className }: SkeletonLoaderProps) {
  const borderRadius = radius ?? "var(--radius-inset)";

  if (lines && lines > 0) {
    return (
      <div className={`cc-skeleton-lines${className ? ` ${className}` : ""}`} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="cc-skeleton"
            style={{ height, borderRadius, width: i === lines - 1 ? "62%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={`cc-skeleton${className ? ` ${className}` : ""}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}
