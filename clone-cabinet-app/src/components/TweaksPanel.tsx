import { useTheme } from "../theme/ThemeProvider";
import { getColorway } from "../theme/colorways";
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

  return (
    <div className="cc-tweaks cc-hairline">
      <span className="cc-label cc-tweaks__label">Tweaks</span>

      <div className="cc-tweaks__group">
        <span className="cc-micro cc-tweaks__group-label">Display mode</span>
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
            disabled={!activeColorway.publishesDay}
            title={
              activeColorway.publishesDay
                ? activeColorway.dayIsDerived
                  ? "Derived, not published on the brand board — confirm before shipping"
                  : undefined
                : `${activeColorway.name} publishes a dark skin only`
            }
          >
            Day
          </Button>
        </div>
        {mode === "day" && activeColorway.dayIsDerived ? (
          <span className="cc-micro cc-tweaks__flag">Derived day skin, unpublished — flagged in README.md</span>
        ) : null}
      </div>

      <div className="cc-tweaks__group">
        <span className="cc-micro cc-tweaks__group-label">Cabinet finish</span>
        <div className="cc-tweaks__row">
          {colorways.map((c) => (
            <Button
              key={c.id}
              size="sm"
              variant={colorwayId === c.id ? "primary" : "secondary"}
              onClick={() => setColorwayId(c.id)}
            >
              {c.name}
            </Button>
          ))}
        </div>
        <span className="cc-micro cc-tweaks__flag">
          12 of 13 boards from the brand system weren't included in this handoff — add their
          skins to colorway-skins.css when available.
        </span>
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
