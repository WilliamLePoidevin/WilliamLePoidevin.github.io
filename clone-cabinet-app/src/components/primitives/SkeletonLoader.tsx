import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  className?: string;
}

export function SkeletonLoader({ width = "100%", height = 16, radius, className }: SkeletonLoaderProps) {
  return (
    <span
      className={`cc-skeleton${className ? ` ${className}` : ""}`}
      style={{ width, height, borderRadius: radius ?? "var(--radius-inset)" }}
      aria-hidden="true"
    />
  );
}
