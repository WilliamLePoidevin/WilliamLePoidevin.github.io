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
      Only the Riviera Cobalt colorway ships (the other 12 boards weren't in the handoff
      package); the registry in `src/theme/colorways.ts` is built to take more without
      touching any component.
- [x] **Phase 2 — Primitives.** `src/components/primitives/`: Button, StatusChip, Toast,
      EmptyState, SkeletonLoader, VerifiedBadge, IrisSeam, Icon. Rendered together at
      `src/screens/PrimitivesGallery.tsx`, the current `App.tsx` entry point.
- [ ] **Phase 3 — Shell + navigation.** Tab bar with the travelling chamber, TopBar, per-tab
      back stacks, depth-aware push/pop transition.
- [ ] **Phase 4 — Domain components.** FragranceCard, BottlePortrait, AccordBar, MetricDial,
      LineageNode, CabinetShelf, OpenChamber, ReviewCard, TradeCard, TrustMetric,
      CollectorAvatar.
- [ ] **Phase 5 — Screens.** All 15, per the handoff's screen table.
- [ ] **Phase 6 — Data layer.** Point components at `docs/design/clone-cabinet/data/*.json`
      (real dataset: 4,113 fragrances, 114 houses, bidirectional lineage) — see
      `docs/design/clone-cabinet/INTEGRATION_GUIDE.md`. Live confidence voting
      (`CLONE_CABINET_UX_SPEC.md` Section 11) is new work beyond the handoff and belongs here
      too, before Lineage/Detail are considered done.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/clone-cabinet/
npm run build    # outputs to ../clone-cabinet (this repo's Pages subpath)
```

## Known gaps inherited from the design handoff

- Only 1 of 13 colorways is specified (Riviera Cobalt); the rest live in a design-system
  bundle that wasn't included in this package.
- Fonts are Google Fonts substitutes for the brand's licensed faces.
- No icon assets shipped (PNG set referenced, not included) — `Icon.tsx` renders a small
  inline-SVG placeholder set instead; swap for the real vectors when available.
- No product photography — dataset's `image` field is `null` for every fragrance.
- Riviera Cobalt day mode is derived, not published on the brand board — confirm before
  shipping.

See `docs/design/clone-cabinet/design_handoff_clone_cabinet_app/README.md` and
`INTEGRATION_GUIDE.md` for the full list.
