import type { ReactNode } from "react";
import "./CabinetShelf.css";

interface CabinetShelfProps {
  children: ReactNode;
  columns?: number;
  label?: string;
  tray?: boolean;
}

export function CabinetShelf({ children, columns = 4, label, tray = true }: CabinetShelfProps) {
  return (
    <section className="cc-cabinet-shelf">
      {label ? <div className="cc-label">{label}</div> : null}
      <div
        className={`cc-cabinet-shelf__grid${tray ? " cc-cabinet-shelf__grid--tray" : ""}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {children}
      </div>
    </section>
  );
}
