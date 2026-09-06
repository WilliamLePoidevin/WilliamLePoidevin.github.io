import type { ReactNode } from "react";

// The five tab roots (depth 1). Order matters — it's the bar's left-to-right layout, and
// BottomNav uses index distance to tell an adjacent tap (slide) from a non-adjacent one
// (crossfade). Cabinet sits centre per the handoff ("Cabinet is the centre tab").
export const TAB_ORDER = ["discover", "lineage", "cabinet", "trade", "you"] as const;
export type TabId = (typeof TAB_ORDER)[number];

export interface TabDef {
  id: TabId;
  label: string;
  glyph: "discover" | "scent-lineage" | "collection" | "connect" | "private-archive";
}

export const TABS: readonly TabDef[] = [
  { id: "discover", label: "Discover", glyph: "discover" },
  { id: "lineage", label: "Lineage", glyph: "scent-lineage" },
  { id: "cabinet", label: "Cabinet", glyph: "collection" },
  { id: "trade", label: "Trade", glyph: "connect" },
  { id: "you", label: "You", glyph: "private-archive" },
];

// One entry per screen pushed inside a tab's own back stack. Depth 1 = the tab root itself
// (not stored as a frame — it's whatever the tab renders with an empty stack); depth 2+ =
// pushed frames. `title` feeds TopBar.
export interface StackFrame {
  key: string;
  title: string;
  render: () => ReactNode;
}
