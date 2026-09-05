/**
 * Clone Cabinet — colorway registry.
 *
 * One entry per published board. `id` is the value that goes in [data-colorway]; the CSS
 * scope of the same name lives in styles/tokens/colorway-skins.css.
 *
 * ground / metal / signal are duplicated here ONLY so the Settings finish-picker can draw a
 * swatch without mounting the skin. They are never read by components — components read
 * semantic aliases. If a board is re-published, change the CSS.
 *
 * modes:
 *   'night'              dark ground only — do not author a day variant
 *   'light-native'       ships a light ground with no data-mode
 *   'night+derived-day'  has a day skin that is NOT on the brand board (unconfirmed)
 */

export type ColorwayModes = "night" | "light-native" | "night+derived-day";

export interface Colorway {
  id: string;
  name: string;
  board: string;
  ground: string;
  metal: string;
  signal: string;
  modes: ColorwayModes;
  note: string;
}

export const COLORWAYS: readonly Colorway[] = [
  {
    id: "obsidian-rose",
    name: "Obsidian Rose",
    board: "05",
    ground: "#0A0A0C",
    metal: "#B8896E",
    signal: "#FF1E3A",
    modes: "night",
    note: "The couture register. System reference colorway.",
  },
  {
    id: "porcelain-aqua",
    name: "Soft Tech Porcelain",
    board: "06",
    ground: "#F6F4EF",
    metal: "#8C9498",
    signal: "#00A89C",
    modes: "light-native",
    note: "The daylight boutique register. Light ground; no data-mode required.",
  },
  {
    id: "obsidian-signal",
    name: "Obsidian Signal",
    board: "07",
    ground: "#0A0E14",
    metal: "#E6E9EE",
    signal: "#00B0FF",
    modes: "night",
    note: "Chrome on midnight.",
  },
  {
    id: "deep-teal-atelier",
    name: "Deep Teal Atelier",
    board: "08",
    ground: "#071A1E",
    metal: "#C6A47A",
    signal: "#1DE0DD",
    modes: "night",
    note: "Petroleum + soft gold, liquid-cyan glow.",
  },
  {
    id: "concentric-atelier",
    name: "Concentric Atelier",
    board: "09",
    ground: "#0B1124",
    metal: "#D4AF7A",
    signal: "#64E6FF",
    modes: "night",
    note: "Indigo + warm gold, concentric-engrave motif.",
  },
  {
    id: "oxblood-nocturne",
    name: "Oxblood Nocturne",
    board: "10",
    ground: "#0E0A0F",
    metal: "#B98579",
    signal: "#591D2A",
    modes: "night",
    note: "Velvet and oxblood, rose alloy. Darkest signal in the set.",
  },
  {
    id: "copper-signal",
    name: "Copper Signal",
    board: "11",
    ground: "#0D080C",
    metal: "#C9875B",
    signal: "#F0A64D",
    modes: "night",
    note: "Espresso + copper, waveform signal language.",
  },
  {
    id: "riviera-cobalt",
    name: "Riviera Cobalt",
    board: "12",
    ground: "#071223",
    metal: "#E6D6B8",
    signal: "#008CFF",
    modes: "night+derived-day",
    note: "Cobalt + champagne. Day skin is DERIVED, not published — needs sign-off.",
  },
  {
    id: "verdant-pulse",
    name: "Verdant Pulse",
    board: "13",
    ground: "#13181A",
    metal: "#DCC08A",
    signal: "#B08CFF",
    modes: "night",
    note: "Botanical emerald + pale brass, lilac signal.",
  },
  {
    id: "citrine-gold",
    name: "Citrine Gold",
    board: "14",
    ground: "#080B0D",
    metal: "#D4AF37",
    signal: "#FFD23A",
    modes: "night",
    note: "Graphite + warm gold, citrine signal.",
  },
  {
    id: "ember-copper",
    name: "Ember Copper",
    board: "15",
    ground: "#130D10",
    metal: "#E1B3A0",
    signal: "#DB6A47",
    modes: "night",
    note: "Deep noir + ember copper, terracotta signal.",
  },
  {
    id: "orchid-voltage",
    name: "Orchid Voltage",
    board: "16",
    ground: "#080B0A",
    metal: "#E6E6EA",
    signal: "#B14BFF",
    modes: "night",
    note: "Ultraviolet + magenta, neon-iris secondary.",
  },
  {
    id: "emerald-vault",
    name: "Emerald Vault",
    board: "17",
    ground: "#080B0D",
    metal: "#D4AF37",
    signal: "#C6FF00",
    modes: "night",
    note: "Onyx + malachite + brushed gold, acid-lime signal.",
  },
] as const;

export const DEFAULT_COLORWAY = "riviera-cobalt";

export function getColorway(id: string): Colorway {
  return COLORWAYS.find((c) => c.id === id) ?? COLORWAYS.find((c) => c.id === DEFAULT_COLORWAY)!;
}

/** Whether a colorway can render the app's Day Cabinet mode at all. */
export function supportsDay(id: string): boolean {
  const c = COLORWAYS.find((c) => c.id === id);
  return c?.modes === "light-native" || c?.modes === "night+derived-day";
}
