import { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NavProvider } from "./nav/NavProvider";
import { PrimitivesGallery } from "./screens/PrimitivesGallery";
import { AppShell } from "./components/shell";
import { TAB_ROOTS } from "./screens/tabs";
import { Button } from "./components/primitives";
import "./App.css";

type View = "app" | "gallery";

// Dev-only switcher between the nav shell (Phase 3, current build target) and the primitives
// gallery (Phase 1-2, kept as the token/component reference — its Tweaks panel is still the
// place to change colorway/mode, shared via ThemeProvider regardless of which view is active).
export default function App() {
  const [view, setView] = useState<View>("app");
  const [wide, setWide] = useState(false);

  return (
    <ThemeProvider>
      <div className="cc-dev-switcher cc-hairline">
        <Button size="sm" variant={view === "app" ? "primary" : "secondary"} onClick={() => setView("app")}>
          App
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
      ) : (
        <PrimitivesGallery />
      )}
    </ThemeProvider>
  );
}
