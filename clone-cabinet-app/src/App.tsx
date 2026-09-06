import { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NavProvider } from "./nav/NavProvider";
import { PrimitivesGallery } from "./screens/PrimitivesGallery";
import { DomainGallery } from "./screens/DomainGallery";
import { AppShell } from "./components/shell";
import { TAB_ROOTS } from "./screens/tabs";
import { Button } from "./components/primitives";
import "./App.css";

type View = "app" | "gallery" | "domain";

// Dev-only switcher between the nav shell (Phase 3), the primitives gallery (Phase 1-2 —
// still the place to change colorway/mode, shared via ThemeProvider regardless of view), and
// the domain component gallery (Phase 4).
export default function App() {
  const [view, setView] = useState<View>("app");
  const [wide, setWide] = useState(false);

  return (
    <ThemeProvider>
      <div className="cc-dev-switcher cc-hairline">
        <Button size="sm" variant={view === "app" ? "primary" : "secondary"} onClick={() => setView("app")}>
          App
        </Button>
        <Button size="sm" variant={view === "domain" ? "primary" : "secondary"} onClick={() => setView("domain")}>
          Domain
        </Button>
        <Button size="sm" variant={view === "gallery" ? "primary" : "secondary"} onClick={() => setView("gallery")}>
          Gallery
        </Button>
        {view === "app" ? (
          <Button size="sm" variant="ghost" onClick={() => setWide((w) => !w)}>
            {wide ? "Phone" : "Wide"}
          </Button>
        ) : null}
      </div>

      {view === "app" ? (
        <NavProvider>
          <AppShell wide={wide} tabRoots={TAB_ROOTS} />
        </NavProvider>
      ) : view === "domain" ? (
        <DomainGallery />
      ) : (
        <PrimitivesGallery />
      )}
    </ThemeProvider>
  );
}
