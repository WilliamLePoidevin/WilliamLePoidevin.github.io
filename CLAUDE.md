# williamlepoidevin.github.io

This repo hosts two independent things:

- The root — William's resume/portfolio site.
- `clone-cabinet-app/` — **Clone Cabinet**, a fragrance-collection app (catalogue, rate,
  trace clone/inspiration lineage, trade bottles). Built as a React + Vite SPA, deployed as a
  static build to the `/clone-cabinet/` subpath of this GitHub Pages site. See
  `clone-cabinet-app/README.md` for the app-specific build order and status.

Everything below applies only to work inside `clone-cabinet-app/`.

## Clone Cabinet — design spec

Design spec: `clone-cabinet-app/docs/design/clone-cabinet/design_handoff_clone_cabinet_app/README.md`
— read it before any UI work.
Prototype source (copy + layout tie-breaker): `clone-cabinet-app/docs/design/clone-cabinet/design_handoff_clone_cabinet_app/prototype/Clone Cabinet.dc.html`
Real dataset + how it maps onto the handoff's schema: `clone-cabinet-app/docs/design/clone-cabinet/INTEGRATION_GUIDE.md`
Feature spec (Trade, Rating, Discover, live confidence voting): `clone-cabinet-app/docs/design/clone-cabinet/CLONE_CABINET_UX_SPEC.md`
Read order for the whole package: `clone-cabinet-app/docs/design/clone-cabinet/00_READ_ORDER.md`

## Non-negotiables

- Never invent colours, type sizes, spacing, radii, or motion values. Every value comes from
  the Design tokens section of the spec.
- Theming is a runtime theme object keyed by colorway id × mode (night/day, day only for
  Soft Tech Porcelain and Riviera Cobalt day). Never hard-code a hex in a component. Only the
  Riviera Cobalt colorway ships with this handoff — the other 12 boards referenced in the spec
  live in a design-system bundle that was not included; architect for more colorways, don't
  fabricate their values.
- Signal colour (electric blue) is light, never paint: a core, an edge, a glow, one figure.
  Never a filled area larger than a chip.
- Metal (champagne) is borders, active indicators, foil type, primary affordances.
- Borders are always 1px hairlines. Max two background values per screen.
- Two casing registers: tracked uppercase for labels/nav/buttons/metadata, sentence case for
  the rare description. Never title case. Never emoji.
- Copy comes from the prototype source verbatim. Do not rewrite strings.
- Nothing bounces, springs, or overshoots. Honour `prefers-reduced-motion`.
- Cabinet valuations are private: sharing a cabinet never shares values.
- Real dataset fields that are `null` (year, accords, score, image, sillage, etc. — see
  INTEGRATION_GUIDE.md Section 3) must not be faked. Hide the UI element instead of rendering
  a placeholder that reads as real data.

## Stack

React + TypeScript + Vite, plain CSS custom properties for the token layer (no CSS-in-JS,
no Tailwind — the token system in the spec is already a complete design-token architecture).
Decided once; don't mix in another styling approach.

## Build order

Bottom-up, per `clone-cabinet-app/docs/design/clone-cabinet/design_handoff_clone_cabinet_app/START_HERE.md`:
tokens → primitives → nav shell → domain components → screens → data layer (point components at
`docs/design/clone-cabinet/data/*.json` directly rather than the prototype's fictional `cc-data.js`).
