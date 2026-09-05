# Clone Cabinet — Design System

**The collector's world of fragrance.**

Clone Cabinet is a luxury fragrance-collection app with a tech edge: a private, connected archive where collectors catalogue, rate and trace the lineage of the fragrances they own. The product language is a physical one — smoked glass, brushed rose alloy, and a luminous violet core — rendered as a dark, precision-engineered interface. It reads like a vault or an instrument, not a storefront.

## Sources

This system was built from **one** source the user provided:

- `assets/brand-guide-full.png` — the Clone Cabinet brand & style guide board, "Variation 3: Luminous Capsule" (uploaded as `uploads/ChatGPT Image Sep 2, 2026, 08_22_43 PM (3).png`). Panels: 01 primary logo, 02 stacked lockup, 03 icon only, 04 app icon, 05 design process + geometry, 06 material + finish, 07 foil + emboss application, 08 digital application, 09 membership card application.

No codebase, Figma file, or slide deck was provided. **Everything here is derived from that board**: colours were sampled pixel-by-pixel from the artwork, and every logo, material swatch, product render and app-screen reference in `assets/` was cropped programmatically out of it (nothing was drawn or regenerated). Where the board did not define something — a full component inventory, exact type sizes, real product copy — this system authors a standard set in the brand's language and says so below.

## Products represented

The board shows two digital surfaces plus one physical artefact:

1. **Clone Cabinet app (iOS)** — panel 08. My Cabinet grid ("24 SCENTS"), a product detail screen (`CC / 08427 — EAU DE PARFUM`), an Intensity readout (`78%`) with a luminous waveform, and a Scent Profile hexagon radar (WOODY / AMBER / SPICE / CITRUS / LEATHER / CITRUS). This is the primary product.
2. **Marketing / brand web surface** — the hero board itself is the visual template: full-bleed macro product photography, wordmark lockup, tracked tagline, hairline-separated feature strip ("CONNECTED COLLECTION — PRIVATE ARCHIVE — SCENT LINEAGE").
3. **Membership card** — panel 09. Brushed black metal card, foil wordmark, `MEMBER / CC / 08427`, QR, single violet light-line along the lower edge.

## Fonts — SUBSTITUTED, please confirm

No font files came with the board, so these are Google Fonts nearest-matches. **Flagging for replacement:**

| Role | Board appearance | Substitute in use |
|---|---|---|
| Wordmark / display | very wide geometric tech sans, flat-cut terminals, single weight, huge tracking | **Michroma** |
| UI / body / labels | geometric grotesque, light weights, uppercase micro-labels with heavy tracking | **Jost** (200–600) |
| Data / codes | tabular codes (`CC / 08427`), percentages | **JetBrains Mono** |

If you have the real wordmark face (it resembles a Eurostile Extended / Bank Gothic-adjacent custom cut) and the UI face, send the files and I'll swap them into `tokens/fonts.css`.

## Logo & mark

The board's logo is a photographic 3D object (a smoked-glass capsule inside a rose-alloy "CC" ring), not a vector. It has therefore been **cropped, not redrawn** — `assets/logo-primary.png`, `assets/logo-stacked.png`, `assets/mark-icon.png`, `assets/app-icon.png`, `assets/foil-emboss.png`. All are on the brand's near-black field, so place them on `--surface-page` / `--surface-panel` and they read seamlessly. **No vector logo exists in this system** — for anything that needs scaling or a light background, request the original asset. Where a mark isn't available at the needed size, set the wordmark in `--font-display` uppercase at `--track-wordmark`.

---

## CONTENT FUNDAMENTALS

**Voice: a curator's, not a salesperson's.** Short declaratives, no persuasion, no exclamation. The board's own copy is the model: `DISCOVER. COLLECT. CONNECT.` — three words, three periods. `YOUR WORLD, BEAUTIFULLY KEPT.` The product speaks about the collection as something already owned and cared for.

**Casing.** Two registers only:
- *Tracked uppercase* for labels, eyebrows, nav, buttons, metadata: `MY CABINET`, `SCENT PROFILE`, `EAU DE PARFUM`, `MEMBER`. Always with `--track-label` or `--track-eyebrow`.
- *Sentence case* for the rare paragraph of description: "Deep transparency with a soft glow."

Never title case. Never all-lowercase.

**Person.** Second person possessive, sparingly — `MY CABINET`, `YOUR WORLD`. The app says "my" for the user's own things (My Cabinet, My Archive); brand copy says "your" (`YOUR WORLD, BEAUTIFULLY KEPT.`). The system never says "we".

**Numbers and codes are content.** Every object has an archive code (`CC / 08427`) and quantities are stated plainly (`24 SCENTS`, `78%`). Codes use ` / ` with spaces, in `--font-data`. This numeric precision is what supplies the "tech edge" — lean on it instead of adjectives.

**Punctuation.** Periods on brand statements. Em-dash-free; the board uses a hairline rule or a `—` glyph as a *separator between items*, not inside sentences. Commas are rare.

**Length.** Labels 1–3 words. Descriptions ≤ 12 words. A card never carries two paragraphs.

**Emoji: never.** Not in UI, not in marketing, not in notifications. The board contains none, and they'd break the register instantly.

**Do / don't**

| Do | Don't |
|---|---|
| `SCENT LINEAGE` | `Explore Your Scent Lineage! 🌿` |
| `24 SCENTS` | `You have 24 amazing scents` |
| `Luminous core signature accent` | `Our signature accent is a beautiful luminous core that…` |
| `CC / 08427` | `Item #8427` |
| `PRIVATE ARCHIVE` | `My Stuff` |

---

## VISUAL FOUNDATIONS

**The one-line thesis.** A near-black cabinet interior, hairline-divided into panels; objects inside are glass and rose alloy; the only emitted light is a violet core. Everything else is restraint.

**Colour.** Obsidian neutrals (`--ink-050` `#0A0A0B` page, `--ink-200` panel, `--ink-300` card) carry ~90% of every surface. Champagne cream (`--cream-200` `#F3EEEA`) is type. Rose alloy (`--rose-300` `#C79A89`) is the metal: borders, active indicators, foil type, primary affordances. Electric violet (`--violet-300` `#9A6BE8`) is *light*, not paint — it appears as a core, an edge, a glow, a single highlighted word (`THE COLLECTOR'S `**`WORLD`**` OF FRAGRANCE`), and never as a filled area larger than a chip. Maximum two background values per screen. No blue, no green, no white surfaces.

**Type.** Wide geometric display for the wordmark and page-level numbers; light geometric grotesque for everything else. The signature is *tracking*: `.34em` on eyebrows, `.18em` on labels, `.14em` on the wordmark. Body text is small (13–16px) and low-contrast (`--cream-400`/`500`) because labels do the work. Numerals in mono, often with a smaller `%` or unit glyph beside a large figure (`78` + `%`).

**Spacing & layout.** A panel mosaic: rectangular regions butted together with a 6px near-black gutter (`--gutter-panel`), each panel labelled top-left with a numbered tracked micro-label (`01. PRIMARY LOGO`). Content sits generously inside — 16–24px card padding, 20px screen padding. Layout is orthogonal and grid-locked; nothing is tilted or organic. Fixed elements: a top bar with the mark at left, and a bottom action/nav bar on app screens, both over a protection gradient.

**Backgrounds.** Full-bleed photographic product renders (macro glass, metal, reflections) behind hero areas; flat `--ink` fills behind everything functional. Photography is *dark, warm, and specular* — near-black fields, rose-gold highlights, one violet light source, shallow depth of field, gentle bloom. Slight grain (`--grain-opacity: .05`) is acceptable over large photographic fields. No repeating patterns. The only illustrative motif is the technical/geometric construction line drawing seen in panel 05 (`assets/geometry-process.png`) — thin cream strokes on black, used as blueprint texture, never as decoration.

**Gradients.** Only three legitimate kinds: (1) brushed metal sweeps for alloy surfaces (`--grad-rose-alloy`), (2) luminous core falloff — violet fading to nothing at both ends (`--grad-violet-core`, `--grad-violet-edge`), (3) protection gradients over imagery (`--grad-protect-top/bottom`) so tracked cream type stays legible on photography. Protection gradients are preferred over capsules; use a translucent capsule (`--surface-glass` + `--blur-glass`) only when type sits over a *busy* region of a photo.

**Transparency & blur.** Sparing and always glassy: `rgba(243,238,234,.04–.08)` fills with `blur(18px) saturate(120%)` for floating bars, sheets, and chips over imagery. Never blur over a flat fill — use `--surface-raised` instead.

**Borders.** Hairlines, 1px, always. `--line-hairline` (cream at 10%) for structure; `--line-metal` (rose at 42%) for selection and premium framing; `--line-accent` (violet at 55%) for live/active state. Panels are separated by gutters *and* hairlines. Thicker borders never appear.

**Corner radii.** Mostly small: 0 for panel mosaics and full-bleed regions, 6–10px for cards and inputs, 14–20px for sheets and image tiles, 26px squircle for the app-icon plate, pill only for chips and toggles. The brand is machined, so radii read as chamfers, not softness.

**Cards.** `--surface-card` fill, 1px `--line-hairline`, 10px radius, 16px padding, `--shadow-card` (a 1px inner cream highlight along the top edge plus a deep diffuse drop). Selected cards swap the hairline for `--line-metal`; live/streaming cards add `--glow-violet-sm` inside. No coloured left borders, ever.

**Shadows.** Outer shadows are deep, soft and near-black (`0 18px 40px -24px rgba(5,5,6,.9)`) — they read as depth inside a dark cabinet, not as lift on a light page. Inner shadows are a single 1px cream top highlight simulating a machined edge. Glow (`--glow-violet-*`) is a separate system from shadow and is reserved for the violet core.

**Animation.** Slow and weighted: 160–420ms, `cubic-bezier(.22,.61,.36,1)`. Content fades and rises 8px (`cc-fade-rise`). Metal surfaces get an occasional sheen sweep (`cc-sheen`). The violet core breathes on a 4.2s loop (`cc-core-pulse`, opacity .72→1) — the one continuous motion in the system. **Nothing bounces, springs, or overshoots.**

**Hover.** Light changes, geometry doesn't. Hairlines brighten (`--line-hairline` → `--line-metal`), cream type goes from `--cream-300` to `--cream-100`, metal fills brighten one step (`--rose-300` → `--rose-200`), and violet elements gain glow. No lift, no scale-up, no colour inversion.

**Press.** A 1.5% shrink (`--state-press-scale: .985`) plus one step darker fill. Fast (90ms) in, standard out.

**Disabled.** 38% opacity, no colour change.

**Imagery vibe.** Warm-neutral, high-contrast, near-monochrome except for rose-gold and one violet source. Studio-lit on black, reflective floor, no daylight, no people, no lifestyle scenes. Product-as-artefact.

---

## ICONOGRAPHY

**The board contains no icon set.** Its only glyphs are: the brand mark used as a tiny bullet in the footer strip (`assets/mark-icon.png`), a chevron `>` on the app row, a hamburger/close, a QR block on the membership card, and the hexagonal radar frame of the Scent Profile.

- **No icon font, no sprite sheet, no PNG icon set exists in the source.**
- **Substitution — flagged:** UI icons use **Lucide** from CDN (`https://unpkg.com/lucide-static`), chosen because its 1.5–2px uniform stroke, square terminals and 24px geometric grid match the board's thin machined line quality better than any filled set. Set stroke to `1.25–1.5px` at 20px and colour them `--cream-400` (idle) / `--cream-100` (active) / `--rose-300` (selected). **Never** filled icons, never duotone, never rounded-cap "friendly" sets.
- **Unicode as icons:** yes, deliberately — `—` as a separator in feature strips, `/` inside archive codes, `·` between metadata, `%` beside figures. These are typographic, set in `--font-data` or `--font-body`.
- **Emoji: never.**
- **The mark as an icon:** `assets/mark-icon.png` may be used at 16–24px as a bullet or app-bar mark, as the footer strip does. Don't recolour or outline it.
- Hand-drawn SVG replacements for brand objects (bottles, capsules, the mark) are prohibited — crop from the board or request the render.

---

## Index

| Path | What |
|---|---|
| `styles.css` | Entry point — `@import`s only |
| `tokens/colors.css` | Ink / cream / rose / violet ramps, semantic aliases, gradients |
| `tokens/typography.css` | Font stacks, sizes, tracking scale |
| `tokens/spacing.css` | Space, radii, control sizing |
| `tokens/elevation.css` | Shadows, glows, blur, grain |
| `tokens/motion.css` | Easing, durations, keyframes |
| `tokens/base.css` | Element defaults + `.cc-eyebrow` / `.cc-wordmark` helpers |
| `tokens/*.card.html`, `guidelines/*.card.html` | Foundation specimen cards (Design System tab) |
| `assets/` | Logo lockups, mark, app icon, material swatches, product renders, app-screen crops, full board |
| `components/core/` | Button, IconButton, Input, Select, Switch, Checkbox, Chip, Card, Badge, Panel, Divider, Dialog, Tooltip, Toast |
| `components/brand/` | Wordmark, Mark, LuminousCore, MetalSurface, DataCode, Eyebrow |
| `components/data/` | IntensityMeter, ScentRadar, StatReadout |
| `ui_kits/app/` | Clone Cabinet iOS app — Cabinet, Detail, Profile, Discover, Membership |
| `ui_kits/web/` | Brand web surface — hero, feature strip, collection grid |
| `SKILL.md` | Agent-Skill wrapper for use outside this project |

### Intentional additions

The board defines no component inventory, so `components/` authors a standard primitive set in the brand's language. Additions beyond the usual set, each with a reason:

- **LuminousCore** — the violet light bar is the brand's single most distinctive element; it needs one canonical implementation so its falloff and pulse never get re-invented.
- **MetalSurface** — brushed rose-alloy fill with sheen; reused by cards, buttons and the membership card.
- **DataCode** — archive codes (`CC / 08427`) appear on every object; standardises the ` / ` spacing and mono tracking.
- **IntensityMeter / ScentRadar / StatReadout** — recreations of the three data displays the board actually shows in panel 08. They're product-specific, but they're in the source, so they're primitives here rather than one-off kit code.
