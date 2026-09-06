import { useEffect, useRef, useState } from "react";
import { useNav } from "../../nav/NavProvider";
import { TABS, TAB_ORDER } from "../../nav/types";
import { NavGlyph, IrisSeam } from "../primitives";
import { useTheme } from "../../theme/ThemeProvider";
import "./BottomNav.css";

// The travelling chamber. Adjacent taps slide the chamber laterally over 260ms; non-adjacent
// jumps crossfade out (100ms), reposition while invisible, then fade back in — rather than
// visibly sliding across the tabs in between. See design_handoff README's Motion system.
export function BottomNav() {
  const { activeTab, switchTab, transition } = useNav();
  const { mode } = useTheme();
  const glyphMode = mode === "day" ? "ink" : "light";
  const activeIndex = TAB_ORDER.indexOf(activeTab);

  const [chamberIndex, setChamberIndex] = useState(activeIndex);
  const [jumping, setJumping] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    if (transition.kind === "tab" && !transition.adjacent && chamberIndex !== activeIndex) {
      setJumping(true);
      timeouts.current.push(
        setTimeout(() => {
          setChamberIndex(activeIndex);
          timeouts.current.push(setTimeout(() => setJumping(false), 20));
        }, 100)
      );
    } else {
      setChamberIndex(activeIndex);
    }

    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <nav className="cc-bottomnav cc-hairline" aria-label="Primary">
      <div
        className={`cc-bottomnav__chamber${jumping ? " cc-bottomnav__chamber--jump" : ""}`}
        style={{ transform: `translateX(${chamberIndex * 100}%)`, width: `${100 / TABS.length}%` }}
        aria-hidden="true"
      >
        <IrisSeam key={activeTab} length="26px" flash className="cc-bottomnav__seam" />
      </div>

      {TABS.map((tab) => {
        const selected = tab.id === activeTab;
        const isCentre = tab.id === "cabinet";
        return (
          <button
            key={tab.id}
            type="button"
            className={`cc-bottomnav__tab${selected ? " cc-bottomnav__tab--selected" : ""}`}
            aria-current={selected ? "page" : undefined}
            onClick={() => switchTab(tab.id)}
          >
            <NavGlyph
              name={tab.glyph}
              mode={glyphMode}
              size={isCentre ? 24 : 22}
              tone={selected ? "primary" : "tertiary"}
            />
            <span className="cc-micro cc-bottomnav__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
