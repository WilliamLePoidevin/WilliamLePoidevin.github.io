# Start here — building Clone Cabinet with Claude Code

This folder is a design spec, not a codebase.

- `README.md` — the authoritative spec (screens, tokens, navigation, motion)
- `ASSET_REQUEST_RESPONSE.md` — **read this second.** Point-by-point answers to the asset
  request raised after Phase 1–2, including what's now delivered and what needs a decision
- `tokens/` — all 13 published colorway skins, the semantic-alias bridge, the Riviera day variant
- `theme/colorways.ts` — the colorway registry with day-support flags
- `design-system/` — the design system's own token tree and component bundle
- `assets/brand/`, `assets/icons/` — the brand marks and the five icons that exist
- `prototype/` — the runnable HTML prototype the spec was written from

## 0. Put the files where Claude Code can read them

Drop this whole folder into your repo (e.g. `docs/design/clone-cabinet/`) and commit it.
Claude Code should be able to read `README.md` and grep `prototype/Clone Cabinet.dc.html`
for exact copy and layout. Keep the prototype in the repo for the duration of the build —
it is the tie-breaker for any question the README doesn't answer.

To view the prototype in a browser it needs the sibling `assets/` and `_ds/` folders from
the original design project (download the full project, not just this folder, if you want it
to render). Reading the source works without them.

## 1. Add a project CLAUDE.md

Before writing features, put the non-negotiables in `CLAUDE.md` at your repo root so every
Claude Code session inherits them:

```markdown
# Clone Cabinet

Design spec: docs/design/clone-cabinet/README.md — read it before UI work.
Prototype source: docs/design/clone-cabinet/prototype/Clone Cabinet.dc.html

## Non-negotiables
- Never invent colours, type sizes, spacing, radii, or motion values. Every value comes from
  the Design tokens section of the spec.
- Theming is a runtime theme object keyed by colorway id (13 colorways) × mode (night/day,
  day only for Soft Tech Porcelain and Riviera Cobalt day). Never hard-code a hex in a component.
- Signal colour (electric blue) is light, never paint: a core, an edge, a glow, one figure.
  Never a filled area larger than a chip.
- Metal (champagne) is borders, active indicators, foil type, primary affordances.
- Borders are always 1px hairlines. Max two background values per screen.
- Two casing registers: tracked uppercase for labels/nav/buttons/metadata, sentence case for
  the rare description. Never title case. Never emoji.
- Copy comes from the prototype source verbatim. Do not rewrite strings.
- Nothing bounces, springs, or overshoots. Honour prefers-reduced-motion.
- Cabinet valuations are private: sharing a cabinet never shares values.
```

## 2. Pick the stack, then build in this order

The design assumes a native-feeling iOS app. React Native + Reanimated and SwiftUI both map
cleanly; a React web SPA works if mobile web is the target. Decide once, record it in
`CLAUDE.md`, and don't mix.

Build bottom-up — the token layer and nav shell first, because every screen depends on them.

| Phase | Deliverable | Done when |
|---|---|---|
| 1 | **Token layer.** All colour/type/space/radius/shadow/motion values as code constants. Theme object keyed by `colorwayId` × `mode`, persisted. Skins and registry ship in `tokens/` + `theme/`. | Switching colorway at runtime re-skins a throwaway test screen with zero component edits — all 13. |
| 2 | **Primitives.** Button (with the .985 press), StatusChip, Toast, EmptyState, SkeletonLoader, VerifiedBadge, IrisSeam, Icon. | A primitives gallery screen matches the prototype side by side. |
| 3 | **Shell + navigation.** Tab bar with the travelling chamber, TopBar, per-tab back stacks, depth-aware push/pop transition (advance 12px/420ms, recede -8px/300ms). | `navFor()` mapping holds: detail screens read as their parent tab, each tab keeps its own stack. |
| 4 | **Domain components.** FragranceCard, BottlePortrait, AccordBar, MetricDial, LineageNode, CabinetShelf, OpenChamber, ReviewCard, TradeCard, TrustMetric, CollectorAvatar. | Each renders from the seeded shapes in `prototype/cc-data.js`. |
| 5 | **Screens.** Discover → Detail → Cabinet → Trade/Listing/Proposal → Lineage → You/Collector → Notifications/Settings → Launch/Welcome/Onboarding. | All 15 screens reachable, overlays and sheets wired. |
| 6 | **Data layer.** Replace `cc-data.js` with real models/API. Its field names are a starting schema, not a mandate. | No screen reads seeded data. |

## 3. Prompts that work well with Claude Code

Give it one screen at a time with the spec as context, and make it read the prototype:

> Read docs/design/clone-cabinet/README.md, then the `detail` screen in
> docs/design/clone-cabinet/prototype/Clone Cabinet.dc.html. Implement the Fragrance Detail
> screen using our existing token layer and primitives. Pull all copy verbatim from the
> prototype. Do not introduce any colour, size, or duration that isn't already a token.

For the motion work, ask for it explicitly and separately — it's the part most likely to get
approximated away:

> Implement the bottom nav chamber animation exactly as specified in the Motion system
> section: 260ms lateral travel between adjacent tabs, crossfade (100ms out, reposition, fade
> in) for non-adjacent jumps, 26px violet core line on the chamber's top edge flashing
> .45→1 opacity and 6→14px glow on selection then decaying over 420ms.

## 4. Review checklist before you call a screen done

- Every colour, size, duration traced to a token — grep for raw hex and raw ms.
- Tap targets ≥ 44px.
- Text contrast holds in both night and day for the two finishes that publish day.
- Uppercase labels carry their tracking (`.08em` labels, `.16em` wordmark) — untracked caps is
  the most common miss.
- Archive codes formatted `CC / 08427` with spaces, in the mono face.
- Reduced-motion path tested.

## 5. Known gaps to resolve with the brand owner

- **Fonts** are Google substitutes (Space Grotesk / Inter / Cormorant Garamond / IBM Plex Mono).
  Request the licensed display and UI cuts.
- **No vector logo exists.** The Riviera Cobalt mark is a transparent-background raster; request
  the original for anything above ~330px or on a light field.
- **Photography is the wrong colorway.** Board 12 calls for Riviera coastline / cobalt-glass
  imagery; the placeholders are warm rose/plum. Re-shoot or re-grade — never hue-rotate in code.
- **Riviera Cobalt day mode is derived, not published.** Confirm before shipping it.
- **Icons ship as PNGs.** Replace with SF Symbols or SVG.
