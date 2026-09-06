# Clone Cabinet

A fragrance-collection app: collectors catalogue what they own, rate it, trace clone/inspiration
lineage between fragrances, and trade bottles with other collectors. React + TypeScript + Vite,
deployed as a static build to the `/clone-cabinet/` subpath of williamlepoidevin.github.io.

Design spec, real dataset, and the full non-negotiables list live in
[`docs/design/clone-cabinet/`](./docs/design/clone-cabinet/00_READ_ORDER.md) and the repo-root
`CLAUDE.md`. Read both before touching UI code.

## Status

Following the bottom-up build order from `docs/design/clone-cabinet/design_handoff_clone_cabinet_app/START_HERE.md`:

- [x] **Phase 1 — Token layer.** `src/styles/tokens/`: colour, typography, spacing, radii,
      motion, all as CSS custom properties. Theme is keyed by colorway × mode (`data-colorway`
      on the shell, `data-mode` on the root — see `src/theme/`), persisted to `localStorage`.
      All 13 published colorways ship in `src/theme/colorways.ts` / `colorway-skins.css`;
      1 (Riviera Cobalt) has a derived, unpublished day skin, 1 (Soft Tech Porcelain) is
      light-native, the other 11 are dark-only.
- [x] **Phase 2 — Primitives.** `src/components/primitives/`: Button (+ signal/caution
      variants), StatusChip (+ trade tone), Toast, EmptyState (+ glyph slot), SkeletonLoader
      (+ multi-line mode), VerifiedBadge (label + dot, alloy/signal), IrisSeam, Icon (general
      UI glyphs, Lucide), BrandMark and NavGlyph (real brand assets — see below). Rendered
      together at `src/screens/PrimitivesGallery.tsx`, the current `App.tsx` entry point.
      Cross-checked against the design system's own reference component bundle in
      `docs/design/clone-cabinet/design_handoff_clone_cabinet_app/design-system/` (not more
      authoritative than the README, but worth matching for consistency — see
      `ASSET_REQUEST_RESPONSE.md` item 2).
- [x] **Phase 3 — Shell + navigation.** `src/nav/` (per-tab back stacks, push/pop) and
      `src/components/shell/` (AppShell, TopBar, BottomNav, SideRail, ScreenTransition).
      BottomNav's travelling chamber slides 260ms between adjacent tabs and crossfades for
      non-adjacent jumps, with the IrisSeam flash-then-decay core line on selection; Cabinet
      renders one step heavier as the centre tab. Push/pop applies the depth-aware
      forward/back transform; a pushed screen's TopBar title and BottomNav selection both
      read as its parent tab, per `navFor()`'s intent — there's no static screen→tab lookup
      table yet since real screens don't exist until Phase 5, so a push simply lands on
      whichever tab is currently active. SideRail is wide mode's stand-in for BottomNav; the
      handoff doesn't specify a chamber-equivalent motion for it, so it reads via a metal fill
      + vertical IrisSeam instead. Demoed against 5 placeholder tab-root screens in
      `src/screens/tabs/` — reachable via the dev switcher (top-right) in `App.tsx`, which
      also still exposes the Phase 1-2 primitives gallery for colorway/mode work.
- [x] **Phase 4 — Domain components.** `src/components/fragrance/` (FragranceCard — 5
      variants, BottlePortrait, AccordBar, MetricDial, LineageNode, CabinetShelf, OpenChamber)
      and `src/components/community/` (ReviewCard, TradeCard, TrustMetric, CollectorAvatar).
      BottlePortrait is the one deliberate departure from the reference bundle: since every
      record in the real dataset has `image: null` and always will per-record (there's no
      photography project, see `ASSET_REQUEST_RESPONSE.md` item 5), it renders the recommended
      deterministic placeholder instead of a photo fallback — a shelf-toned ground derived from
      a hash of the fragrance `id` (`src/lib/hash.ts`), the name's initial, and an archive code
      formatted from that same real id (never a fabricated sequential number). AccordBar and
      MetricDial require a real numeric value as a prop rather than accepting an optional one
      and rendering a fake 0 — the caller decides whether to render the row/dial at all, which
      is where "hide, don't fake" for null enrichment fields (year, accords, score, sillage,
      projection...) actually has to live once real data arrives in Phase 6. Added `--success`/
      `--error` as fixed, colorway-independent status tokens (TrustMetric's good/alert tones)
      — flagged, not brand-confirmed, see `base.css`'s header comment for why they're the one
      exception to "colour only in colorway-skins/bridge". Demoed in
      `src/screens/DomainGallery.tsx` (reachable via the dev switcher) against both the real
      dataset's shape (everything enrichment-related null) and one hypothetical fully-enriched
      record, side by side.
- [~] **Phase 5 — Screens** (started) **/ Phase 6 — Data layer** (started). Per
      INTEGRATION_GUIDE.md's own recommendation, these two are being done together — one
      data-swap instead of two — rather than building all 15 screens against fictional
      `cc-data.js` first. `src/data/`: `DatasetProvider` fetches the real dataset (4,113
      fragrances, 114 houses, full bidirectional lineage — `public/data/*.json`, ~4MB
      combined, not bundled) at runtime rather than importing it statically, and
      `selectors.ts` holds the honest, real-signal-only query logic.
      **Done:** `discover` tab root (`src/screens/tabs/DiscoverScreen.tsx`) — a Featured row
      (ranked by real `valueScore`, deliberately NOT labelled "Trending" since nothing in the
      dataset can back that claim), a Houses row (real `houses.json`, sorted by count), and a
      live search-filtered Browse list — plus a minimal `FragranceDetailScreen` (pushed from
      Discover) rendering only the fields that are real for a given record: name, house,
      family, price, accords as plain tags (no strength value exists, so no `AccordBar`), and
      a real "Worth smelling next" lineage row pulled straight from `lineage.json`. This is
      deliberately a smaller Detail than the handoff's full `isDetail` spec (no accord bars,
      metric dials, reviews/market tabs) — those need fields (score, sillage, projection) this
      dataset doesn't have yet; expanding it is Section 3 of INTEGRATION_GUIDE.md's job, not a
      screens-phase one.
      **Not done yet:** `cabinet`, `lineage`, `trade`, `you` tab roots (still the Phase 3
      placeholder screen); `launch`/`welcome`/`onboard` (pre-shell flow); `tradeDetail`,
      `proposal`, `collector`, `notifications`, `settings` (pushed screens); the full `isDetail`
      tabs (Overview/Lineage/Reviews/Market); live confidence voting
      (`CLONE_CABINET_UX_SPEC.md` Section 11 — a real vote action wired to `confirmVotes`/
      `disputeVotes`, recomputing the displayed `confidence` instead of just reading the
      seeded number, which is all `FragranceDetailScreen` does today).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/clone-cabinet/
npm run build    # outputs to ../clone-cabinet (this repo's Pages subpath)
```

## Deploy

`.github/workflows/deploy-clone-cabinet.yml` builds this app and commits the output to
`/clone-cabinet/` at the repo root on every push to `main` that touches `clone-cabinet-app/`
(or via manual `workflow_dispatch`). No manual build/commit step needed once a change lands
on `main` — GitHub Pages serves whatever's committed there.

## Known gaps inherited from the design handoff

Resolved by `ASSET_REQUEST_RESPONSE.md` (see
`docs/design/clone-cabinet/design_handoff_clone_cabinet_app/`): all 13 colorways, the design
system's own token/component bundle, and 5 real nav icons + brand logos (`BrandMark`,
`NavGlyph`) are now in the repo. Still open:

- **No vector logo exists, and never will** — the mark is a photographic 3D object (two
  mirrored brackets around a central atomizer), not vector artwork; re-drawing it as SVG is
  prohibited by the brand's own rules. `BrandMark` is raster-only by design; request the
  original render/3D source for anything scaling past ~330px or sitting on a light field.
- **No UI icon set exists in the source either** — Lucide is the design system's own decided
  substitution (stroked, `currentColor`, one file for all 13 skins), wired up in `Icon.tsx`,
  but it's flagged, not brand-confirmed. Ask the brand owner to confirm before launch.
- Fonts are still Google Fonts substitutes for the brand's licensed faces (Cinzel Sans and
  Söhne are named for Obsidian Rose specifically) — no font files were ever supplied.
- No product photography — dataset's `image` field is `null` for every fragrance. Recommended
  direction (not yet built): a deterministic per-fragrance placeholder portrait, not real
  photos and not a coloured box — see `ASSET_REQUEST_RESPONSE.md` item 5 for the exact spec.
- Riviera Cobalt day mode is derived, not published on the brand board — confirmed workable,
  recommended to ship, but still needs the brand owner's sign-off.
- Dataset enrichment (year, accords, score, sillage, projection, longevity) and the 29
  disputed lineage entries are explicitly out of design-package scope — separate data
  projects, tracked in `INTEGRATION_GUIDE.md` Sections 3 and 5.

See `docs/design/clone-cabinet/design_handoff_clone_cabinet_app/ASSET_REQUEST_RESPONSE.md` for
the full point-by-point response this was built from.
