import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { getColorway, supportsDay } from "../theme/colorways";
import { useCabinet } from "../data/CabinetProvider";
import { useLineageVotes } from "../data/LineageVotesProvider";
import { useDisplayName } from "../data/displayName";
import { useNav } from "../nav/NavProvider";
import { Button, StatusChip } from "../components/primitives";
import "./SettingsScreen.css";

export function SettingsScreen() {
  const { mode, colorwayId, setMode, setColorwayId, colorways } = useTheme();
  const { clearAll: clearCabinet } = useCabinet();
  const { clearAll: clearVotes } = useLineageVotes();
  const { clear: clearName } = useDisplayName();
  const { pop } = useNav();
  const [confirmingClear, setConfirmingClear] = useState(false);

  const activeColorway = getColorway(colorwayId);
  const activeSupportsDay = supportsDay(colorwayId);

  const clearEverything = () => {
    clearCabinet();
    clearVotes();
    clearName();
    setConfirmingClear(false);
    pop();
  };

  return (
    <div className="cc-settings">
      <section className="cc-settings__section">
        <span className="cc-label">Display mode</span>
        {activeColorway.modes === "light-native" ? (
          <p className="cc-micro cc-settings__hint">{activeColorway.name} is a light finish — no night/day switch.</p>
        ) : (
          <div className="cc-settings__chip-row">
            <StatusChip selected={mode === "night"} onClick={() => setMode("night")}>
              Night
            </StatusChip>
            <StatusChip selected={mode === "day"} onClick={() => setMode("day")} disabled={!activeSupportsDay}>
              Day
            </StatusChip>
          </div>
        )}
      </section>

      <section className="cc-settings__section">
        <span className="cc-label">Cabinet finish</span>
        <div className="cc-settings__finish-grid">
          {colorways.map((c) => (
            <button
              type="button"
              key={c.id}
              className={`cc-settings__finish${c.id === colorwayId ? " cc-settings__finish--active" : ""}`}
              onClick={() => setColorwayId(c.id)}
            >
              <span className="cc-settings__finish-swatch" style={{ background: c.metal }} aria-hidden="true" />
              <span className="cc-micro">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="cc-settings__section">
        <span className="cc-label">Privacy</span>
        <p className="cc-micro cc-settings__hint">
          Cabinet values stay private. Only a public asking price on a For Trade or Seeking listing is ever shown to
          others — nothing else about your collection leaves this browser.
        </p>
      </section>

      <section className="cc-settings__section">
        <span className="cc-label">Local data</span>
        {confirmingClear ? (
          <div className="cc-settings__confirm">
            <p className="cc-micro cc-settings__hint">
              This clears your cabinet, listings, and lineage votes from this browser and can't be undone. Display
              mode and cabinet finish stay as they are.
            </p>
            <div className="cc-settings__chip-row">
              <Button variant="secondary" size="sm" onClick={() => setConfirmingClear(false)}>
                Cancel
              </Button>
              <Button variant="caution" size="sm" onClick={clearEverything}>
                Clear everything
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="caution" size="sm" onClick={() => setConfirmingClear(true)}>
            Clear all local data
          </Button>
        )}
      </section>
    </div>
  );
}
