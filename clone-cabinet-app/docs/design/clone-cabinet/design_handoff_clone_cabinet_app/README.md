# Handoff: Clone Cabinet — iOS Collector App (full prototype)

## Overview
Clone Cabinet is a fragrance-collection app: collectors catalogue what they own, rate it,
trace clone/inspiration lineage between fragrances, and trade bottles with other collectors.
This package documents a complete, working, high-fidelity HTML prototype of that app —
15 screens, real navigation, real state, and the full motion system — so it can be rebuilt
in the production codebase.

## About the design files
The files in this bundle are **design references written in HTML**, not production code.
They are a runnable prototype that shows intended look, motion, and behaviour.

The task is to **recreate these designs inside the target codebase's existing environment**
(React Native / SwiftUI / React web — whatever the app already is), using its established
navigation, component, and state patterns. If no environment exists yet, pick the framework
that fits the product (this design assumes a native-feeling iOS app; React Native + Reanimated
or SwiftUI both map cleanly) and implement there.

Do not port the HTML, the `.dc.html` component format, or `support.js` — those are prototype
tooling. **Do** port the token values, the layout specs, the copy, and the motion timings
exactly; they are the deliverable.

## Fidelity
**High-fidelity.** Colours, type scale, spacing, radii, shadows, motion curves, and copy are
final and token-backed. Rebuild pixel-accurately. The only intentionally non-final parts:

- **Data is seeded and fictional** (`cc-data.js`) — fake houses, fragrances, collectors,
  listings. Replace wholesale with real API models. Field names in that file are a reasonable
  starting schema, not a mandate.
- **Fonts are Google Fonts substitutes** for the brand's proprietary faces (see Typography).
- **Icons are a project PNG set** at `assets/icons/{light,ink}/*.png`, two tone variants for
  night/day mode. Ship as vectors (SF Symbols / SVG) in production instead.
- **Product photography** in `assets/bottles/` is placeholder art direction, not licensed
  imagery. Treat as spec for the photo brief: dark, warm, specular, single violet light source.

---

## Architecture of the prototype

One root component holds all screen state — there is no router. In production this should
become a real navigation stack.

- **State machine**: `state.screen` is a string, one of the screen ids below. `go(screen, extra)`
  sets it and clears transient UI (`searchOpen`, `statusSheet`, `drawerId`, `compareId`).
- **Tab resolution**: `navFor(screen)` maps a screen to the bottom-tab that should read as
  active — e.g. `detail` → `discover`, `tradeDetail`/`proposal` → `trade`,
  `collector`/`notifications`/`settings` → `you`. Detail screens are **pushed inside a tab**,
  not siblings of it. Preserve this: each tab owns its own back stack.
- **Two display modes**: `night` (default, `--cabinet-plum` canvas) and `day`
  (`--porcelain` canvas), switched via `data-mode="night|day"` on the root and persisted to
  `localStorage["cc-proto-mode"]`. Every token has a per-mode value — build this as a real
  theme, not a filter.
- **Two layouts**: phone (default, bottom nav) and `wide` (side rail, `--side-rail-width:76px`,
  content capped at `--content-max`). Wide mode hides the status bar and bottom nav.

### Screens (15)

| id | Name | Purpose |
|---|---|---|
| `launch` | Launch | 1500ms brand hold, then auto-advances to `welcome`. Geometry blueprint at 7% opacity over `--grad-depth`. |
| `welcome` | Welcome | Brand statement + hero macro; entry to onboarding. |
| `onboard` | Onboarding | 4-step chamber stepper: collector level, interests, scent families, then how to add bottles (manual / scan / skip). |
| `discover` | Discover | Home feed. Hero carousel, fragrance cards, lineage teasers, house rows. Search overlay opens from here. |
| `detail` | Fragrance Detail | The core object screen. Hero image, archive code, accord bars, intensity/projection/sillage dials, tabs: Overview · Lineage · Reviews · Market. Rate sheet and compare drawer live here. |
| `cabinet` | My Cabinet | The user's owned bottles. Shelf and Archive views, sort by Acquired/House/Fill/Value, edit-shelf mode, per-bottle fill + value + wear count, status groups (In Cabinet / For Trade / Seeking). |
| `lineage` | Lineage | Relationship graph between fragrances. Map and List modes; relations typed `original`, `inspiration`, `interpretation`, `alternative`, `flanker`, `similar`, each with a confidence % and a source. Community voting (confirm / dispute). |
| `trade` | Trade | Marketplace index, grouped `verified` / `following` / `open`. Filter chips: All / For Sale / For Trade / Wanted. |
| `tradeDetail` | Listing | One listing: condition vocabulary, fill %, presentation, batch, wants, seller trust metrics. Entry to proposal. |
| `proposal` | Trade Proposal | 3-step flow: pick your bottles → add cash → review. Confirm runs an 880ms ceremony animation, then opens the message thread. |
| `you` | You | Own profile. Sub-tabs: Cabinet · Reviews · Contribute · Messages · Trades. Trust metrics, trade history with status chips. |
| `collector` | Collector Profile | Another collector: statement, trust metrics, their cabinet, follow / message. |
| `notifications` | Notifications | Grouped by day; trade / lineage / social kinds, each deep-linking to its object. Signal items get the violet seam. |
| `settings` | Settings | Display mode, privacy (cabinet values stay private), account rows. |

### Overlays and transient UI
Search overlay, action sheet, rate sheet, status sheet, compare drawer, toast
(`success` / `error` / neutral tones, 2800ms auto-dismiss), and the 880ms proposal ceremony.

---

## Motion system

This is the most distinctive part of the design. Port it precisely.

**Principle: Open / Reveal / Return. Nothing bounces, springs, or overshoots.**

| Token | Value |
|---|---|
| `--dur-micro` | 140ms |
| `--dur-standard` | 250ms |
| `--dur-sheet` | 340ms |
| `--dur-signature` | 900ms |
| `--ease-material` | `cubic-bezier(.22,.61,.36,1)` |
| `--ease-seam` | `cubic-bezier(.16,.84,.28,1)` |
| `--ease-sheet` | `cubic-bezier(.2,.9,.24,1)` |
| `--press-scale` | `.985` |
| `--disabled-opacity` | `.38` |

**Screen transitions (depth-aware).** Screens are ranked by depth: 0 = launch/welcome/onboard,
1 = the five tab roots, 2 = everything pushed. Going deeper, the incoming screen translates
from `+12px` with `scale(.988)` and fades in over **420ms** `cubic-bezier(.22,1,.36,1)`.
Going back, it recedes from `-8px` with `scale(1.012)` over **300ms**. Implement as a
navigation-stack transition, not per-screen animation.

**Button press.** `scale(.985)`, 90ms in on `cubic-bezier(.4,0,1,1)`, 200ms settle out on
`cubic-bezier(.22,1,.36,1)`, plus one step darker fill. Applies to every tappable.

**Bottom nav (`CabinetNav.dc.html`).** A selection "chamber" — a 58px rounded rect with
`--line-metal` border and a 1px inner cream top highlight — travels laterally between
**adjacent** tabs over **260ms** `cubic-bezier(.22,1,.36,1)`. For **non-adjacent** jumps it
crossfades out (100ms), repositions, and fades back in rather than sliding past intervening
tabs. A 26px violet core line sits on the chamber's top edge and flashes on selection
(opacity .45→1, glow 6px→14px) then decays over 420ms. Cabinet is the centre tab and renders
one step heavier (24px icon vs 22px).

**Named keyframes**

- `cc-reveal` — content fades and rises 8px. The default content entrance.
- `cc-seam-open` — violet seam scales in on X from 0.
- `cc-iris-pulse` — the violet core breathes, opacity .55→1. The only continuous motion in the system.
- `cc-sheet-rise` — sheets rise 18px and fade in.
- `cc-shimmer` — skeleton loading sweep.
- `cc-open` — detail-screen hero expansion, 440ms `cubic-bezier(.22,1,.36,1)`.

**Hover (wide mode only).** Light changes, geometry does not. Hairlines brighten to
`--line-metal`, type brightens one step, metal fills brighten one step, violet elements gain
glow. No lift, no scale-up.

**Reduced motion.** All animation and transition durations collapse to `.01ms` under
`prefers-reduced-motion: reduce`, and the press scale is dropped. Honour this.

---

## Design tokens

Authoritative source: `_ds/clone-cabinet-design-system-.../tokens/*.css`. Copy values verbatim.

### Colour — Riviera Cobalt colorway

The app ships in the **Riviera Cobalt** colorway (board 12). Six published hexes:

```
--rc-midnight-navy        #071223   primary dark canvas
--rc-deep-cobalt          #0A1E3F   raised dark surfaces
--rc-sea-glass-blue       #2DB4BF   secondary signal / confirmation
--rc-bright-electric-blue #008CFF   THE signal colour
--rc-champagne-metal      #E6D6B8   the metal — borders, foil type, primary action
--rc-crystal-white        #F9FAFC   type / light canvas
```

Night semantic aliases (published verbatim on the board):
```
--surface-canvas #071223   --surface-raised #0A1E3F   --surface-shelf #0C2A54
--surface-inset  #050D19   --surface-nav rgba(10,30,63,.9)
--surface-glass  rgba(249,250,252,.06)   --surface-glass-strong rgba(249,250,252,.11)
--surface-scrim  rgba(7,18,35,.8)
--text-primary   #F9FAFC   --text-secondary #B4C2D6   --text-tertiary #7B8CA6
--text-metal     #E6D6B8   --text-signal    #2DB4BF   --text-inverse   #071223
--line-divider   rgba(249,250,252,.12)   --line-strong #123561
--line-metal     rgba(230,214,184,.55)   --line-signal rgba(0,140,255,.6)
--action-primary-bg #E6D6B8   --action-primary-fg #071223
--action-secondary-border rgba(249,250,252,.22)   --action-secondary-fg #F9FAFC
--focus-ring 0 0 0 1px #071223, 0 0 0 3px rgba(0,140,255,.65)
--glow-signal 0 0 20px rgba(0,140,255,.5)
```

Day semantic aliases — **derived, not published.** Board 12 defines only the dark skin;
the app has a Day Cabinet mode, so a daylight Riviera was authored from the same six hexes.
Confirm with the brand owner before shipping it.
```
--surface-canvas #F9FAFC   --surface-raised #FFFFFF   --surface-shelf #EDF1F7
--surface-inset  #E3E9F2   --surface-nav rgba(255,255,255,.92)
--text-primary   #071223   --text-secondary #4A5A72   --text-tertiary #7B8CA6
--text-metal     #8A7548   (champagne darkened to hold contrast on white)
--text-signal    #0072D6
--line-divider   rgba(7,18,35,.1)   --line-strong #D3DAE4
--action-primary-bg #0A1E3F   --action-primary-fg #F9FAFC
```

**Rules:** cobalt/navy neutrals carry ~90% of every surface. Electric blue is *light*, never
paint — a core, an edge, a glow, one highlighted figure; never a filled area larger than a chip.
Champagne metal is the metal: hairline borders, active indicators, foil type, primary
affordances. Max two background values per screen. No green, no warm accents, no white surfaces
in night mode.

### Gradients (only these are legitimate)
```
--grad-iris-seam       linear-gradient(180deg,#0057B8 0%,#008CFF 50%,#BFE4FF 100%)
--grad-iris-seam-h     linear-gradient(90deg,rgba(0,87,184,0),#008CFF 50%,rgba(191,228,255,0))
--grad-rose-reflection linear-gradient(135deg,#9C8A64,#E6D6B8 38%,#FBF3DE 52%,#A08E67)
--grad-depth           linear-gradient(180deg,#050D19,#071223 55%,#0A1E3F)
--grad-protect-top     linear-gradient(180deg,rgba(5,13,25,.85),rgba(5,13,25,0))
--grad-protect-bottom  linear-gradient(180deg,rgba(5,13,25,0),rgba(5,13,25,.72) 58%,rgba(5,13,25,.96))
```
Only three kinds are permitted: champagne-metal sweeps, luminous signal falloff, and
protection gradients that keep tracked crystal-white type legible over photography.

**How theming is wired.** Every published colorway is selectable at runtime from
Settings → **Cabinet finish** (13 options). The mechanism:

- `data-colorway="<id>"` on the app shell selects the skin. The design system's
  `tokens/colorways.css` and `tokens/colorway-skins.css` publish each skin as the same 25
  semantic aliases (`--surface-canvas`, `--text-metal`, `--text-signal`, `--line-metal` …).
- `colorway-bridge.css` derives the app's BRAND tokens (`--rose-alloy`, `--electric-iris`,
  `--porcelain`, the permitted gradients, `--shadow-card`, the glows) from those aliases via
  `color-mix()`. This is why 13 themes need no per-theme code and no markup change.
- The bridge is scoped to `[data-colorway]`, **not** `:root`. At `:root` the design system
  derives the aliases *from* the brand tokens (`modes.css`: `--text-metal: var(--rose-alloy)`),
  so mapping them back there is a circular reference and every token computes to nothing.
- `data-mode` (Night/Day) sits on the **desk root** and `data-colorway` on the **shell**, one
  level in. They cannot share an element: `styles.css` loads last and re-imports `modes.css`,
  so an equal-specificity `[data-mode="night"]` would beat the colorway. Splitting them across
  elements resolves it without duplicating any palette.
- Selection persists to `localStorage["cc-proto-colorway"]`. Choosing a dark-only finish also
  returns Display mode to Night.

In production this should be a real theme object keyed by colorway id, not a CSS attribute
scope — but the token values and the alias→brand mapping are final.

**Day mode is only published for two finishes** — Soft Tech Porcelain (inherently light) and
the derived Riviera Cobalt day variant. The other eleven boards publish dark skins only, and
the UI says so rather than inventing daylight grounds for them.

**Known gaps in the reskin, both needing real assets:**
- **Photography is still the warm rose/plum set.** Board 12 calls for Riviera coastline hero
  imagery and cobalt-glass materials; those crops don't exist in the design system. Bottles must
  be re-shot or re-graded cobalt — do not hue-rotate the existing files in production.
- **The logo is now the correct Riviera Cobalt artwork**, background-keyed to transparent
  PNGs at `assets/riviera/logo-mark.png` (the champagne CC monogram with the cobalt flacon)
  and `assets/riviera/logo-stacked.png` (monogram + CLONE CABINET wordmark). Both were
  extracted from board 12's own hero artwork by flood-filling the flat navy field from the
  border, so the silhouette stays fully opaque and there is no matte box — the mark floats on
  whatever sits behind it. They replace the design system's `BrandMark` component on the
  Launch and Welcome screens. **Still raster, and still no vector exists** — request the
  original artwork for anything that must scale past ~330px or sit on a light field.

### Typography
```
--font-display   "Space Grotesk", "Manrope"      wordmark, page numbers
--font-ui        "Inter"                          all UI, body, labels
--font-editorial "Cormorant Garamond", Georgia    rare editorial pull-quotes
--font-mono      "IBM Plex Mono", "Space Mono"    archive codes, percentages
```
**Substitution flag:** the brand's real display face is a wide geometric tech sans
(Eurostile Extended / Bank Gothic-adjacent custom cut) and the real UI face is a light
geometric grotesque. Swap both in if the licensed files exist.

Scale — size / line-height / weight:
```
display  36/40/500     h1 28/32/600      h2 22/28/600     h3 17/22/600
body     15/22/400     compact 13/18/500 label 11/14/600  micro 10/14/400
```
Tracking: `--track-wordmark .16em` · `--track-label .08em` · `--track-micro .04em` ·
`--track-display -.01em` · `--track-body 0`.

Two casing registers only: **tracked uppercase** for labels, nav, buttons, metadata
(`MY CABINET`, `SCENT PROFILE`, `24 SCENTS`); **sentence case** for the rare description.
Never title case, never all-lowercase, **never emoji**.

### Spacing, radii, sizing
```
space  4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
--page-padding 20px   --card-gap 12px   --section-gap 32px   --editorial-gap 48px
--radius-chip 8px  --radius-card 16px  --radius-sheet 24px  --radius-appicon 23%
--radius-pill 999px  --radius-inset 4px
--tap-min 44px  --control-height 48px  --control-height-sm 36px
--topbar-height 56px  --bottomnav-height 76px  --side-rail-width 76px
--content-max 1440px  --hairline 1px
--icon-sm 16px  --icon-md 20px  --icon-lg 24px
```
Borders are **always** 1px hairlines — structural (cream 10%), metal (rose 42%, selection),
accent (violet 55%, live state). Thicker borders never appear.

### Elevation
```
--shadow-card-night  inset 0 1px 0 rgba(244,240,232,.05), 0 12px 28px -20px rgba(13,9,13,.9)
--shadow-card-day    0 1px 2px rgba(38,34,37,.04), 0 10px 24px -18px rgba(38,34,37,.16)
--shadow-sheet-night 0 -18px 60px -20px rgba(13,9,13,.95)
--shadow-sheet-day   0 -14px 44px -22px rgba(38,34,37,.28)
--shadow-inset-tray  inset 0 1px 3px rgba(13,9,13,.6)
--glow-iris-sm       0 0 8px rgba(139,92,255,.5)
--glow-iris-md       0 0 16px rgba(139,92,255,.55), 0 0 40px rgba(92,50,214,.3)
--glow-rose-sm       0 0 12px rgba(216,173,162,.28)
--blur-glass         blur(20px) saturate(130%)
--grain-opacity      .04
```
Glow is a separate system from shadow and is reserved for the violet core. Surfaces read as
tonal panels and inset trays, not floating cards.

---

## Component inventory

The prototype composes a design-system bundle. Each of these needs a production equivalent:

**Brand** — `BrandMark`, `IrisSeam` (the violet light line), `Icon` (PNG set, two tone variants).

**Core** — `Button`, `StatusChip`, `Toast`, `EmptyState`, `SkeletonLoader`, `VerifiedBadge`.

**Domain** — `FragranceCard`, `BottlePortrait`, `AccordBar` (accord strength bar),
`MetricDial` (intensity / projection / sillage readout), `LineageNode` (graph node with
relation type + confidence), `CabinetShelf`, `OpenChamber` (the add-to-cabinet affordance),
`ReviewCard`, `TradeCard`, `TrustMetric`, `CollectorAvatar`.

**Shell** — `AppShell`, `TopBar`, `BottomNav`, `SideRail`, `SearchOverlay`, `ActionSheet`.

---

## Copy and content rules

Voice is a curator's, not a salesperson's. Short declaratives, no persuasion, no exclamation.
The product speaks about the collection as something already owned and cared for.

- Labels 1–3 words. Descriptions ≤ 12 words. A card never carries two paragraphs.
- Numbers and codes are content: every object has an archive code `CC / 08427` (spaces around
  the slash, set in `--font-mono`); quantities stated plainly — `24 SCENTS`, `78%`.
- Second person possessive, sparingly. App says "my" for the user's things (`MY CABINET`);
  brand copy says "your". The system never says "we".
- `SCENT LINEAGE` not `Explore Your Scent Lineage!` · `24 SCENTS` not `You have 24 amazing
  scents` · `CC / 08427` not `Item #8427` · `PRIVATE ARCHIVE` not `My Stuff`.

Exact copy for every screen is in the prototype source — pull strings from there, don't rewrite.

---

## Data model (starting point)

`cc-data.js` seeds the prototype. Its shapes suggest the API surface:

- **fragrance** — id, name, house, year, concentration, accords[], score, image, thesis, long
  description, projection, sillage, value, owners, traders, reviewCount, family, region, price band
- **house** — name, region, founded, count, note
- **collector** — handle, name, level (Collector / Connoisseur / Curator), verified, trades,
  region, followers, following, statement, cabinet[]
- **review** — id, fragranceId, author, level, verified, score, context ("Owns · 50ml · batch 21B"), date, body
- **listing** — id, fragranceId, condition, fill %, presentation, handle, wants, group
  (verified / following / open), posted, price
- **lineage** — map of fragranceId → [{ id, relation, verified, confidence, source }]
- **cabinetEntry** — id, status (In Cabinet / For Trade / Seeking), acquired, size, fill %,
  value, wornCount, lastWorn, season
- **notification** — grouped by day; kind (trade / lineage / social), title, detail, time, signal
- **purchaseLink** — seller, note, trust level, price

Privacy is a product rule, not a detail: **cabinet values stay private** — sharing a cabinet
shares the bottles, never the valuations.

---

## Assets
- `assets/bottles/*.png` — product photography placeholders (macro glass, flacons, cabinet
  crafts). Art-direction spec: studio-lit on near-black, rose-gold highlights, one violet
  source, shallow depth of field, no people, no daylight, no lifestyle.
- `assets/icons/light/*.png` and `assets/icons/ink/*.png` — UI icon set, night and day tone
  variants. Replace with vectors in production; 1.25–1.5px stroke at 20px, square terminals,
  never filled, never duotone, never rounded-cap.
- `assets/logo-primary.png`, `logo-stacked.png`, `mark-icon.png`, `app-icon.png`,
  `geometry-process.png` — brand lockups and the blueprint texture. **No vector logo exists** —
  request the original from the brand owner for anything that needs to scale or sit on a light field.

---

## Files in this bundle

| File | What |
|---|---|
| `Clone Cabinet.dc.html` | The full prototype — all 15 screens, state machine, motion. Read this for exact layout and copy. |
| `CabinetNav.dc.html` | The bottom navigation with the travelling chamber + violet core animation. |
| `cc-data.js` | Seeded demo data (fictional). Schema reference only. |
| `support.js` | Prototype runtime. **Do not port.** |
| `colorway-bridge.css` | Maps every colorway's semantic aliases onto the app's brand tokens. One file, 13 themes. |
| `riviera-cobalt.css` | The derived Riviera Cobalt **day** variant (not published on the board). |
| `_ds/clone-cabinet-design-system-.../` | Design-system tokens (`tokens/*.css`) and component bundle. Tokens are authoritative. |
| `assets/riviera/` | Riviera Cobalt logo — transparent-background mark and stacked lockup. |
| `assets/` | Imagery, icons, legacy brand lockups (rose colorway — do not use). |

To view the prototype: open `Clone Cabinet.dc.html` in a browser from the project root so the
relative `assets/` and `_ds/` paths resolve. Use the Tweaks controls to jump to any start
screen, switch night/day mode, and toggle wide layout.
