# Response — missing design-system + dataset assets

Answering the eight-item request point by point. Four items are **delivered in this folder**;
two are **decisions only the brand owner can make**; two are **genuinely outside the design
package** and need to be scoped as their own work.

Nothing below was invented. Where a value didn't exist, it says so instead of shipping a guess.

---

## 1. The other 12 colorway boards — DELIVERED ✅

They were never missing from the design system — they were missing from the *handoff folder*.
All 13 boards were published; only Riviera Cobalt got copied out. Corrected.

**`tokens/colorway-skins.css`** — all 13 scopes, each publishing the same 25 semantic aliases,
in exactly the schema you specified. Every hex is the value printed on that board's palette
panel, not re-sampled from artwork.

**`theme/colorways.ts`** — the `COLORWAYS` registry: id, display name, board number, and
`modes` (`'night'` / `'light-native'` / `'night+derived-day'`), plus a `supportsDay()` helper
so the mode toggle can disable itself on the 11 night-only skins.

Two corrections to assumptions in your request:

- **Soft Tech Porcelain doesn't need a day skin — it *is* light.** It publishes
  `color-scheme:light` with a porcelain ground natively, under `[data-colorway="porcelain-aqua"]`
  with no `data-mode` involved. Treating it as "the dark skin plus a day variant" will produce a
  skin that never renders. Hence `modes: 'light-native'`.
- **So exactly one colorway has a day *variant*: Riviera Cobalt** — and it's derived, see item 6.

Two things to carry over from the prototype's bridge, both load-bearing:

- **Keep `data-mode` and `data-colorway` on different elements** (`<html data-mode>` /
  `<body data-colorway>`). On the same element, `modes.css` and the colorway scope collide at
  equal specificity and the later stylesheet silently wins.
- **`colorway-bridge.css` must be scoped to `[data-colorway]`, never `:root`.** At `:root` the
  design system derives the aliases *from* the brand tokens (`--text-metal: var(--rose-alloy)`),
  so mapping them back the other way there is a circular reference and every token computes to
  nothing. `tokens/colorway-bridge.css` is included here verbatim with that reasoning in the header.

**On light grounds the text ramp collapses from three steps to two.** `--text-tertiary` is a
dimmed cream that reads fine on a dark ground; on near-white it lands around 2.3:1 at the
10–11px sizes the micro-labels and % figures use. Since this system treats numbers and codes as
content, tertiary collapses into secondary on light skins. That rule is in the bridge file — keep
it, or the two light skins ship unreadable metadata.

## 2. The design-system component bundle — DELIVERED ✅

**`design-system/`** — the full token tree (`tokens/*.css`), `styles.css`, the component bundle
`_ds_bundle.js`, and `_ds_manifest.json`.

One expectation to reset: the design system's `components/` are authored as an **intentional
addition**, not sampled artwork. The brand boards define no component inventory — no padding
specs, no icon set, no internal DOM. So diffing your primitives against this source will tell you
what the design system chose, which is worth matching for consistency, but it is not a more
authoritative source than the README's prose. There is no pixel truth underneath it to recover.
Match the tokens and the structural rules (1px hairlines, `--radius-*`, tracked caps, two
background values per screen) and you're aligned.

## 3. Vector logo + icon set — PARTIAL ⚠️

**Delivered:** `assets/brand/` (Riviera Cobalt mark and stacked lockup, primary and stacked
lockups, `mark-icon.png` for 16–24px use, app icon) and `assets/icons/` — five nav-scale icons
(collection, connect, discover, private-archive, scent-lineage), each in **both tone variants**
you asked for: `icons/light/` for night grounds and `icons/ink/` for the two light skins, plus
the light set at the root as the default. PNG, cropped from the boards.

So the tone-variant structure exists — but only for these five, and only as raster.

**Not delivered, and it does not exist:**

- **No vector logo, at all.** The identity is a *photographic 3D object* — two mirrored cobras
  forming a doubled C around a central atomizer — not vector artwork. Raster is the master. So
  SVG isn't a conversion away; it's a re-draw, and re-drawing the mark is prohibited by the
  brand's own rules. **Request the original render (or the 3D source) from the brand owner.**
  For the geometry: total width is 2.18X (1.00X cobra · 0.18X spine gap · 1.00X cobra), height
  1.62X, clear space = the spine gap. Below 56px the terminals disappear — swap to the CC
  monogram squircle (16px floor) or the atomizer minimal mark. Don't scale the full mark small.
- **No UI icon set exists in the source either.** The boards contain five glyphs total: the mark
  as a footer bullet, a chevron, a hamburger/close, a QR block, and the Scent Profile hexagon.

**So your placeholder set isn't a stopgap to be replaced by brand art — it's the actual decision
point,** and the design system already made it: **Lucide**, stroked, at **1.25–1.5px on a 20px
box**, square terminals, `fill="none"`, `stroke="currentColor"`. Colour by state:
`--text-tertiary` idle, `--text-primary` active, `--text-metal` selected. Going stroked-SVG also
lets you **collapse the ink/light split entirely** — `currentColor` inherits from the active
colorway, so one file serves all 13 skins in both modes instead of two files serving one. Worth
doing even for the five that ship as PNG pairs. Never filled, never duotone, never rounded-cap.

That's an authoritative answer you can build on today. Please still ask the brand owner to
confirm Lucide before launch — it's a flagged substitution, not a published choice.

## 4. Typography — DECISION NEEDED 🔸

Confirmed: the four Google faces are substitutions, and no font files were ever supplied. What
the brand names, for the request:

| Role | Named on the board | Substitute in use |
|---|---|---|
| System display | proprietary wide geometric tech sans | Space Grotesk |
| UI / body | light geometric grotesque, heavy tracking | Inter |
| Editorial | fine high-contrast serif | Cormorant Garamond |
| Data (codes, %) | — | IBM Plex Mono |
| Obsidian Rose display | **Cinzel Sans** (licensed) | Cinzel |
| Obsidian Rose secondary | **Söhne** (licensed) | Inter |
| Porcelain data | **Space Mono** | Space Mono — *correct face, no swap owed* |

Ask for: Cinzel Sans, Söhne, and the proprietary wordmark cut, as WOFF2 + WOFF, with web
embedding terms. If the answer is "the substitutes are final," the tracking values matter more
than the faces — `.34em` eyebrows, `.18em` labels, `.14em` wordmark. Untracked caps is the single
most common way this design gets subtly wrong.

## 5. Product photography — DECISION NEEDED 🔸, and (b) is the right call

Confirmed on all counts: every `image` is null, the existing crops are warm rose/plum from boards
01–05 (wrong colorway for Riviera), and hue-rotating them in code is explicitly prohibited.

**Recommendation: build (b), the deterministic placeholder, and treat photography as a separate
track.** Rationale: at 4,113 fragrances, photography was never going to be per-record — the
boards' photography is *brand* imagery (macro glass, hero fields), not a product catalogue. A
lineage-first app with a consistent generated portrait is coherent; the same app with 40 real
photos and 4,073 gaps is not.

If you build the placeholder, it should read as an artefact in a cabinet, not a coloured box:
`--surface-shelf` ground, a 1px `--line-metal` hairline, the fragrance's initial in the display
face at low contrast, and the archive code in mono beneath. Derive the ground from a hash of the
fragrance id mixed toward `--surface-shelf` so it stays inside the active colorway — never a
free hue. `--glow-signal` only on the record currently open.

Art direction for whenever real photography does happen, unchanged: studio-lit on near-black,
specular metal highlights, one violet/electric-blue source, shallow depth of field, gentle bloom,
no daylight, no people, no lifestyle. Product-as-artefact. WebP, sRGB, one hero + one square crop.

## 6. Riviera Cobalt day mode — DECISION NEEDED 🔸

Confirmed derived, not published. Board 12 ships dark only. The day skin was built from the same
six published hexes — crystal white ground, midnight navy type, champagne darkened to `#8A7548`
to hold contrast on a light field, deep cobalt carrying the primary action, signal at `#0072D6`.
It's in `tokens/riviera-cobalt-day.css` with that flag in its header.

**My recommendation: ship it.** It's derived strictly from published values, it's the only way
the app's Day Cabinet mode works on the default colorway, and Soft Tech Porcelain already proves
the system reads correctly on a light ground. But it is the brand owner's call, and the honest
framing for them is: *"we need a daylight Riviera; here is one derived from your published
palette — approve it, replace it, or we disable Day for this finish."*

If the answer is "hold," gate it through `supportsDay()` in `theme/colorways.ts` rather than
deleting the file — one-line change either way.

## 7. Dataset enrichment — OUT OF SCOPE ❌

Correct that this is the biggest thing standing between you and an app that feels real, and
correct that it must not be fabricated. But it isn't a design-package gap — the design system is
brand boards; it never contained fragrance metadata. No amount of asset delivery unblocks this.

It needs a licensed data source or a scraping pass, scoped as its own project, with someone
owning the terms-of-use question for community scores. Your JSON-merge-by-id format is the right
shape for receiving it.

Until then the "hide, don't fake" rule is right, and worth stating positively: **the Detail
screen should be designed for the data you actually have, not designed for the full spec and then
run with holes in it.** Lineage, archive code, concentration, house, and the cabinet relationship
are real. A Detail screen composed of those, at generous scale, reads as deliberate. The same
screen with three empty dials reads as broken. If Phase 5 is close, I can lay out that
lineage-first Detail variant — say the word.

## 8. Disputed-entry review (29 entries) — OUT OF SCOPE ❌

Same category: a data-quality task, not a design asset. Your two-relation-per-candidate shape is
right, and splitting them by hand is the right call given automated splitting was already judged
too risky.

One design note for when they're split: **two candidate originals is a state the UI has to
express, not an error to hide.** Lineage should render both branches with their own citations and
vote counts, visibly marked as contested — a `--line-signal` hairline on both edges rather than
a confident single link. Contested provenance is interesting to a collector; a silently-wrong
single link destroys trust in the whole archive. Tell me when the 29 are resolved and I'll spec
the contested-lineage treatment.

---

## Priority, revised

Your ordering was right, with one change: **item 1 is done, so the most visible remaining work is
now item 5's decision, not item 7's research.**

1. **Unblocked now** — 13 colorways and the design system are in this folder. Phase 3 nav shell
   has no remaining dependency.
2. **Decide this week** (all cheap, all unblock visible work) — Riviera day sign-off (6),
   placeholder-vs-photography (5), Lucide confirmation (3).
3. **Request from brand owner** — the mark's original render or 3D source, and the licensed faces (4).
4. **Scope as separate projects** — dataset enrichment (7) and the 29 disputed entries (8).
