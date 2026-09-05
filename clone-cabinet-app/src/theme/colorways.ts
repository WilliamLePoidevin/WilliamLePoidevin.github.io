// Clone Cabinet — colorway registry.
//
// Every published colorway is selectable at runtime from Settings -> Cabinet finish.
// The design handoff describes 13 boards; only Riviera Cobalt (board 12) shipped with this
// package's data — the other 12 live in a design-system bundle that was not included. Adding
// one is: (1) a skin block in styles/tokens/colorway-skins.css publishing the 25 semantic
// aliases, (2) an entry here. No component changes — see colorway-bridge.css.
//
// Day mode is only published for two finishes app-wide: Soft Tech Porcelain (inherently
// light) and the derived Riviera Cobalt day variant. Every other board is dark-only; the UI
// must say so rather than inventing a daylight ground for it (publishesDay: false).

export type Mode = "night" | "day";

export interface ColorwayMeta {
  id: string;
  name: string;
  /** False means this board has no published (or derived) day skin. */
  publishesDay: boolean;
  /** True only for the one derived-not-published day skin flagged in the handoff. */
  dayIsDerived?: boolean;
}

export const COLORWAYS: ColorwayMeta[] = [
  { id: "riviera-cobalt", name: "Riviera Cobalt", publishesDay: true, dayIsDerived: true },
];

export const DEFAULT_COLORWAY_ID = "riviera-cobalt";

export function getColorway(id: string): ColorwayMeta {
  return COLORWAYS.find((c) => c.id === id) ?? COLORWAYS[0];
}
