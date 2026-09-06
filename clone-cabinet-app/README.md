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
      Also **done:** `cabinet` tab root (`src/screens/tabs/CabinetScreen.tsx`) — genuinely
      working, not a mock. `src/data/CabinetProvider.tsx` persists a collector's cabinet to
      `localStorage` (there's no backend and no accounts, so this is real per-browser state,
      not a stand-in for a server record — worth a Settings-screen note once that exists, not
      a thing to paper over). Fields like fill%, value, and worn-count are the collector's own
      input, never a dataset enrichment field, so "hide, don't fake" doesn't apply to them the
      way it does to `fragrance.score` — there's no real value being faked. Shelf grouped by
      the handoff's full status vocabulary (In Cabinet/For Trade/Seeking/Archived/Sampled, per
      INTEGRATION_GUIDE.md Section 6), sortable by Acquired/House/Fill/Value.
      `AddToCabinetScreen` (search the real index, then a short form) and
      `CabinetEntryDetailScreen` (edit fill/status, log a wear, remove) are pushed from the
      `OpenChamber` tile; `FragranceDetailScreen` also grew a quick "Add to Cabinet" action so
      the Discover → Cabinet loop is real end to end. Verified in a real browser: add Aventus
      from Discover, see it land in the Cabinet shelf, edit and remove it, then add a second
      entry through the full search-and-form flow.
      Also **done:** `lineage` tab root (`src/screens/tabs/LineageScreen.tsx`) and the live
      confidence-voting mechanic from `CLONE_CABINET_UX_SPEC.md` Section 11 — genuinely
      working, not a static badge. `src/data/confidence.ts` computes the displayed
      Neutral/Emerging/Community Confirmed/Disputed/Community Disputes This state from the
      current confirm/dispute tally at render time (never a stored field, per Section 11.2 —
      this replaced the dataset's static `verified` flag everywhere it was read, including in
      `FragranceDetailScreen`, which used to read it directly).
      `src/data/LineageVotesProvider.tsx` persists one changeable "Confirms this"/"Doesn't
      match" vote per relation to `localStorage`. Read its header comment before assuming this
      is more than it is: **there's no backend, so only this browser's own vote can actually
      move the count it sees** — every visitor starts from the same `lineage.json` seed, and
      votes don't sync across people. That's an honest limit of a static site, not a hidden
      one, and it's the same shape of limitation Cabinet already has.
      List mode only (`src/data/lineageEdges.ts` flattens the bidirectional graph into 2,506
      canonical dupe→original pairings, searchable) — a true Map mode (a spatial graph across
      4,113 nodes) is a separate, larger visualization effort, deliberately deferred rather
      than faked as a relabelled list. Building this surfaced a real data-quality artifact:
      a handful of dupes carry two separate relation entries for the exact same original from
      different source citations (e.g. confidence 70 and 40 for the same pairing) —
      `mergeRelationsById` combines these (votes summed, both citations kept) rather than
      silently dropping one or crashing on a duplicate React key. This does **not** touch
      fragrances with several genuinely different real inspirations, which still render as
      separate rows — only exact duplicate-target citations get merged.
      Also **done:** `trade` tab root (`src/screens/tabs/TradeScreen.tsx`), deliberately
      scoped to what's honest without a backend (`CLONE_CABINET_UX_SPEC.md` Section 5). "Your
      listings" is real — mark any Cabinet entry For Trade or Seeking and set its condition/
      presentation/price/wants (new fields on `CabinetEntry`, edited in
      `CabinetEntryDetailScreen`) and it lists here via `TradeCard`. Browsing *other*
      collectors' listings needs other real collectors, and there are none — this is a
      single-visitor static site with no accounts. Rather than invent fake sellers and posts
      to fill that section (exactly the fabricated-placeholder problem the non-negotiables
      rule out), that section says plainly why it's empty. `price` is the public asking term
      and is entirely separate from `value` (private, never shown here) — the "sharing a
      cabinet never shares values" non-negotiable holds even though both fields now live on
      the same `CabinetEntry`.
      Also **done:** `you` tab root (`src/screens/tabs/YouScreen.tsx`) and its pushed
      `SettingsScreen` (`src/screens/SettingsScreen.tsx`). YouScreen's stats — cabinet size,
      For Trade/Seeking count, lineage votes cast — are real counts read straight off
      `CabinetProvider`/`LineageVotesProvider`, never invented; "collector level" (Collector/
      Connoisseur/Curator) is a plain tier function over real cabinet size, not a fabricated
      reputation score, since there's no community to rank against. The display name is a new
      small localStorage-backed hook (`src/data/displayName.ts`) shared with Trade, which now
      labels your own listings with whatever you set here instead of a hardcoded "You".
      SettingsScreen gives the real app (not just the dev-only PrimitivesGallery) a working
      Night/Day and Cabinet-finish picker via the existing `useTheme()`/`colorways.ts`
      machinery, a privacy line reinforcing that cabinet values never leave the browser, and a
      "Clear all local data" action gated behind an inline confirm/cancel step (no native
      `confirm()` dialog, to stay in the app's own visual language) that clears Cabinet,
      lineage votes, and the display name via new `clearAll()` methods on both providers —
      deliberately leaving Night/Day and Cabinet-finish alone, since those are a display
      preference, not collection data.
      Also **done:** Cabinet's "edit-shelf" reorder mode. An "Edit shelf" toggle switches the
      sort to a new `"custom"` key and reveals per-tile up/down controls
      (`src/data/cabinetOrder.ts`); the manual order is kept per status group in `localStorage`,
      separate from `CabinetProvider`, since it's a display arrangement, not a field on a
      `CabinetEntry` record. The stored order self-heals against the live cabinet — a removed
      bottle drops out and a newly added one lands at the end — rather than needing manual
      repair as the shelf changes.
      **Not done yet:** `launch`/`welcome`/`onboard` (pre-shell flow) — investigated, but the
      design package's screen table describes these only in one line each
      (`design_handoff_clone_cabinet_app/README.md`); there is no prototype markup or copy for
      them anywhere in the handoff, and inventing brand/marketing copy would break the "copy
      comes from the prototype verbatim" non-negotiable, so this stays blocked on the brand
      owner supplying real copy, not on effort; `tradeDetail`, `proposal`, `collector`,
      `notifications` (pushed screens — proposal and tradeDetail specifically need a second real
      party the same way Trade's community browse does, so they wait on the same thing); the
      full `isDetail` tabs (Overview/Lineage/Reviews/Market) — confirmed against the real
      dataset that `score`/`sillage`/`projection`/`longevity`/`year`/`price` are `null` for
      100% of all 4,113 records today, so these tabs would be empty shells for every fragrance
      in the index; a Map view for Lineage; the confidence-history vote event log (Section 11's
      sparkline needs a timestamped log, not just a running total — today's vote is a single
      stored choice, no history).

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
