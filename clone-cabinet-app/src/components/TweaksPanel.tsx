import { useTheme } from "../theme/ThemeProvider";
import { getColorway, supportsDay } from "../theme/colorways";
import { Button } from "./primitives";
import "./TweaksPanel.css";

interface TweaksPanelProps {
  wide: boolean;
  onWideChange: (wide: boolean) => void;
}

// Equivalent of the prototype's Tweaks controls: jump mode, colorway, and layout without
// touching the app's own navigation. Not a shipped screen.
export function TweaksPanel({ wide, onWideChange }: TweaksPanelProps) {
  const { mode, colorwayId, setMode, setColorwayId, colorways } = useTheme();
  const activeColorway = getColorway(colorwayId);
  const activeSupportsDay = supportsDay(colorwayId);

  return (
    <div className="cc-tweaks cc-hairline">
      <span className="cc-label cc-tweaks__label">Tweaks</span>

      <div className="cc-tweaks__group">
        <span className="cc-micro cc-tweaks__group-label">Display mode</span>
        {activeColorway.modes === "light-native" ? (
          <span className="cc-micro cc-tweaks__flag">
            {activeColorway.name} is always light — no Night/Day distinction, no data-mode needed.
          </span>
        ) : (
          <>
            <div className="cc-tweaks__row">
              <Button
                size="sm"
                variant={mode === "night" ? "primary" : "secondary"}
                onClick={() => setMode("night")}
              >
                Night
              </Button>
              <Button
                size="sm"
                variant={mode === "day" ? "primary" : "secondary"}
                onClick={() => setMode("day")}
                disabled={!activeSupportsDay}
                title={
                  !activeSupportsDay
                    ? `${activeColorway.name} publishes a dark skin only`
                    : "Derived, not published on the brand board — confirm before shipping"
                }
              >
                Day
              </Button>
            </div>
            {mode === "day" && activeColorway.modes === "night+derived-day" ? (
              <span className="cc-micro cc-tweaks__flag">
                Derived day skin, unpublished — flagged in ASSET_REQUEST_RESPONSE.md
              </span>
            ) : null}
          </>
        )}
      </div>

      <div className="cc-tweaks__group">
        <label className="cc-micro cc-tweaks__group-label" htmlFor="cc-finish-picker">
          Cabinet finish
        </label>
        <select
          id="cc-finish-picker"
          className="cc-tweaks__select"
          value={colorwayId}
          onChange={(e) => setColorwayId(e.target.value)}
        >
          {colorways.map((c) => (
            <option key={c.id} value={c.id}>
              {c.board} — {c.name}
              {c.modes === "light-native" ? " (light)" : ""}
            </option>
          ))}
        </select>
        <div className="cc-tweaks__swatch-row">
          <span className="cc-tweaks__swatch" style={{ background: activeColorway.ground }} title="ground" />
          <span className="cc-tweaks__swatch" style={{ background: activeColorway.metal }} title="metal" />
          <span className="cc-tweaks__swatch" style={{ background: activeColorway.signal }} title="signal" />
          <span className="cc-micro cc-tweaks__note">{activeColorway.note}</span>
        </div>
      </div>

      <div className="cc-tweaks__group">
        <span className="cc-micro cc-tweaks__group-label">Layout</span>
        <div className="cc-tweaks__row">
          <Button size="sm" variant={!wide ? "primary" : "secondary"} onClick={() => onWideChange(false)}>
            Phone
          </Button>
          <Button size="sm" variant={wide ? "primary" : "secondary"} onClick={() => onWideChange(true)}>
            Wide
          </Button>
        </div>
      </div>
    </div>
  );
}
