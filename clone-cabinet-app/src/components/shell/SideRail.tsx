import { useNav } from "../../nav/NavProvider";
import { TABS } from "../../nav/types";
import { NavGlyph, IrisSeam } from "../primitives";
import { useTheme } from "../../theme/ThemeProvider";
import "./SideRail.css";

// Wide mode's replacement for BottomNav. The handoff doesn't detail a travelling-chamber
// equivalent for the rail (that motion is specced for BottomNav specifically) — the active
// tab reads via a metal fill plus a vertical IrisSeam accent instead.
export function SideRail() {
  const { activeTab, switchTab } = useNav();
  const { mode } = useTheme();
  const glyphMode = mode === "day" ? "ink" : "light";

  return (
    <nav className="cc-siderail cc-hairline" aria-label="Primary">
      {TABS.map((tab) => {
        const selected = tab.id === activeTab;
        const isCentre = tab.id === "cabinet";
        return (
          <button
            key={tab.id}
            type="button"
            className={`cc-siderail__tab${selected ? " cc-siderail__tab--selected" : ""}`}
            aria-current={selected ? "page" : undefined}
            onClick={() => switchTab(tab.id)}
          >
            {selected ? <IrisSeam orientation="v" length="24px" className="cc-siderail__seam" /> : null}
            <NavGlyph
              name={tab.glyph}
              mode={glyphMode}
              size={isCentre ? 24 : 22}
              tone={selected ? "primary" : "tertiary"}
            />
            <span className="cc-micro cc-siderail__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
