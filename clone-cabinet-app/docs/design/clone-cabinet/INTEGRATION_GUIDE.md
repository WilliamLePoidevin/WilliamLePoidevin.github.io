# INTEGRATION_GUIDE.md — Wiring Clone Cabinet's dataset into the design handoff

*Read this after `design_handoff_clone_cabinet_app/README.md` and `START_HERE.md`. Those define the UI/UX/motion system and are authoritative for anything visual. This document is authoritative for how the real dataset — 2,511 researched fragrance-pairing entries across 114 clone houses — plugs into that system, replacing the fictional seed data in `cc-data.js`.*

---

## 1. The core mismatch, and how it's resolved

The design handoff's data model (`cc-data.js`) treats each **fragrance** as a standalone object, with relationships between fragrances living separately in a **lineage** map keyed by fragrance ID, each relation carrying its own `relation` type, `confidence`, and `source`.

The source dataset (`dupeData.json`) is *pairing-centric* — each of its 2,511 rows is one claim: "Dupe X (from House Y) is inspired by Original Z (from Brand W)," with a single confidence value attached to that claim.

These are not the same shape. A transformation was required: **every unique dupe and every unique original becomes its own fragrance object; the relationship between them becomes a bidirectional lineage entry**, exactly matching the pattern already present in the prototype's own seed data (see `cc-data.js`'s `lineage` object — e.g. `cc-01` lists `cc-05` as `"interpretation"`, and `cc-05` separately lists `cc-01` as `"inspiration"` — two entries, one relationship, opposite perspectives).

This transformation has already been run. The output files are in this package's `data/` folder, ready to replace the seeded arrays in `cc-data.js`.

---

## 2. What's in `data/`

| File | Replaces | Contents |
|---|---|---|
| `fragrances.json` | the `fragrances` array in `cc-data.js` | 4,113 fragrance objects — 2,506 dupes + 1,607 unique originals (many originals are shared: Aventus alone is the target of 26 different houses' dupes, all correctly pointing at one shared object, not 26 duplicates) |
| `lineage.json` | the `lineage` object in `cc-data.js` | keyed by fragrance id → array of relation objects, bidirectional per the pattern above |
| `houses.json` | the `houses` array in `cc-data.js` | 114 clone houses |

**Fragrance object shape** (superset of the prototype's, extra fields noted):

```js
{
  id, name, house, houseId,   // houseId is null for originals — they aren't one of our clone houses
  isDupe,                     // true/false — the prototype's schema has no equivalent; use it to distinguish
                               // "things a collector can add to their Cabinet" (dupes) from "reference points
                               // in the Lineage graph" (originals) if the UI ever needs to tell them apart
  year, concentration, accords, score, image, thesis, longevity,
  projection, sillage, valueScore, owners, traders, reviews, family, region, price,
}
```

**Lineage relation object shape** (superset of the prototype's):

```js
{
  id,                          // the related fragrance's id
  relation,                    // "inspiration" (dupe → original) or "interpretation" (original → dupe)
  verified,                    // true only for strong-consensus, non-disputed relations
  confidence,                  // 0–100, see seeding table below
  confirmVotes, disputeVotes,  // NEW — not in the prototype schema, needed for the live voting mechanic (Section 4)
  source,                      // condensed sourcing note, truncated to 180 chars
  disputed,                    // true if this pairing has genuine multi-source disagreement (see Section 5)
}
```

## 3. Fields left unpopulated, and why

The source dataset does not contain per-fragrance `year`, `concentration`, `accords`, `score`, `image`, `thesis`, `longevity`, `projection`, `sillage`, `owners`, `traders`, or `reviews` — these were never researched, because the original project was about *sourcing pairing claims*, not cataloguing full fragrance profiles. They are set to `null` / `[]` in the output rather than fabricated.

**Do not invent plausible-looking values for these fields.** Two honest paths forward, per the UX spec's own Section 5 recommendation:

1. **Hide the UI elements that depend on them** (the AccordBar, MetricDial trio, hero score) on any fragrance where the field is null, rather than rendering a fake `0` or a placeholder that reads as real data.
2. **Populate them for real later** as a separate, explicit data project (scraping Fragrantica's actual note pyramids and community scores, for instance) — this is a legitimate and valuable follow-up, just not something to fake now.

`valueScore` and `family` *are* populated where the source data had them (`priceUSD` and `family` fields respectively) — those are real, just sparse (family is populated on very few entries; most show `null`).

`image` is `null` for everything. The source dataset never had product photography — every entry rendered as a generated color/monogram placeholder in the prior UI. Decide once whether to keep that pattern (a deterministic per-fragrance color+letter treatment, which the design handoff's `BottlePortrait` component could support as a fallback state) or commission/source real photography before launch — don't silently ship broken image tags.

---

## 4. The live confidence-voting mechanic

Per the agreed design (see the UX spec's Section 11, included in this package as `CLONE_CABINET_UX_SPEC.md`): **confidence is not static.** The `confidence` value in each lineage relation is a *display* of the current `confirmVotes`/`disputeVotes` ratio, seeded from the original research tier, and meant to move as real users vote.

**Seeding table used to generate the current data** (for reference — this already happened, don't re-run it):

| Original research tier | confirmVotes | disputeVotes | confidence |
|---|---|---|---|
| strong-consensus | 15 | 0 | 95 |
| contested | 5 | 1 | 70 |
| loose | 2 | 0 | 40 |
| community-verified (already-promoted) | 10 | 0 | 85 |
| disputed (flagged) | 5 | 5 | 50 |

**What the live app needs to build:**
- A vote action on each lineage relation: "Confirms this" / "Doesn't match," one vote per user per relation, changeable.
- `confidence` recomputed from the live tally on every vote, not just read as a static field — treat the seeded numbers as the starting state of a counter, not a fixed value.
- The threshold table from the UX spec (Neutral / Emerging / Community Confirmed / Disputed / Community Disputes This) drives which badge state renders — this is a derived state, compute it from `confirmVotes`/`disputeVotes` at render time rather than storing a separate `state` string that could drift out of sync with the raw counts.
- A confidence-history sparkline (the UX spec ties this to the design handoff's existing motion/visual language for the intensity dials) needs a vote *event log*, not just a running total — store each vote with a timestamp so the sparkline has something to plot. The current data has no history (it's a snapshot), so this starts empty and builds up from first real usage.

---

## 5. Disputed entries — a note on the automated dual-relation split

29 entries in the source dataset carry a `disputed: true` flag, meaning the original research found genuine disagreement between independent sources about what a dupe actually targets (example: Rayhaan Obsidian was disputed between Dior Homme Intense and JPG Ultra Male before a later correction resolved it — most remaining disputed entries are still genuinely open).

The transformation seeds these at `confirmVotes: 5, disputeVotes: 5` on a **single** lineage relation pointing at whichever candidate was recorded as the primary inspiration field, with the disagreement itself preserved in the `source` text. It does **not** attempt to automatically split every disputed entry into two separate lineage relations pointing at two different candidate originals, because the source data's disputed entries store the competing candidate as free text inside the `inspiration` or `note` field in inconsistent formats (some are `"X (per one source) / Y (per another)"`, some describe the disagreement only in prose) — automated parsing of 29 entries with inconsistent formats risked silently generating wrong lineage links, which is worse than leaving them as a single relation with the disagreement documented in `source`.

**Recommended follow-up:** a short manual pass (29 entries, filter `dupeData.json` for `"disputed": true`) to hand-split each into two proper lineage relations, one per candidate original, each with its own `source` citation. This is genuinely worth doing — Disputed entries are exactly the ones where the Lineage graph's ability to show "here are the two things this might actually be" is most valuable — but it needs human judgment per entry, not a regex.

---

## 6. Mapping existing features to the design handoff's screens

| Existing feature (built earlier) | Design handoff screen | Notes |
|---|---|---|
| Gallery/Ledger browse, search, filter | `discover` | Discover absorbs what was previously called "Browse" — same underlying data and filter logic, restyled to the handoff's card/hero-carousel treatment |
| Detail Panel (flat declarative copy, sourcing note, disputed flag) | `detail` | The "flat statement for confirmed pairings, full note only when disputed" copy rule carries over directly — see README.md's Copy and content rules section, which independently arrived at a very similar "short declaratives, no persuasion" voice |
| Cross-referencing / "Also duped by N houses" | `lineage` | This existing feature *is* the seed of the whole Lineage tab — the sibling-lookup logic already built (grouping entries by shared inspiration) is exactly what populates `lineage.json`. Promote it from a Detail Panel sub-section to its own full tab per the handoff's navigation structure |
| My Armoire (owned/wishlist) | `cabinet` | Maps directly to the handoff's richer `cabinetEntry` schema (status groups, fill %, value, worn count) — the existing owned/wishlist boolean split becomes two of several `status` values (`In Cabinet`, `Seeking`; add `For Trade`, `Archived`, `Sampled` per the handoff's fuller vocabulary) |
| Community Suggestions (submit + 3-vote promotion) | `you` → Contribute sub-tab | The one-time 3-vote promotion mechanic is superseded by the live confidence-voting system (Section 4) — a suggested pairing now just enters at Neutral (0 seeded votes) and moves the same way every other pairing does, rather than having a separate one-time gate |
| Trade Board (spec'd, not yet built) | `trade`, `tradeDetail`, `proposal` | The handoff already fully specs this — listing schema, condition vocabulary, 3-step proposal flow, trust metrics. Build against the handoff's `listing` schema directly rather than the earlier looser Trade Board sketch in the UX spec |
| Rating (spec'd, not yet built) | `detail` → Reviews tab | The handoff's `review` schema (score, context, verified, reactions) is more complete than the earlier "star + one-liner" sketch — build against the handoff's schema |
| Discover/Trending (spec'd, not yet built) | `discover` hero carousel + house rows | The handoff's Discover screen already has a slot for this; feed it from real signals (recently added, most lineage-confirmed this week) once the voting system in Section 4 is live and generating real event data to rank by |
| Houses index (spec'd, not yet built) | Not a dedicated screen in the handoff — houses surface as rows within `discover` | Follow the handoff's structure rather than the earlier UX spec's separate Houses tab — one less top-level destination, and house browsing was always meant to be a filter into Discover, not a distinct content area |

---

## 7. Build order (extends the handoff's own phased plan)

The handoff's `START_HERE.md` already specifies a six-phase build order (token layer → primitives → nav shell → domain components → screens → data layer). This dataset work slots into **Phase 6, but earlier than the handoff implies is fine** — the transformed JSON files are ready now, so Phase 6 can start as soon as domain components (Phase 4) exist to render them, rather than waiting for all 15 screens to be built first against fictional data. Recommended adjustment:

1-4. As specified in `START_HERE.md` — tokens, primitives, nav shell, domain components — but point domain components at `data/fragrances.json` and `data/lineage.json` from the start instead of `cc-data.js`, so there's only one data-swap instead of two.
5. Screens — as specified.
6. **Live voting + confidence recomputation** (this document's Section 4) — this is genuinely new work beyond what the handoff describes, since the handoff's own seed data has static confidence numbers with no voting mechanic behind them. Build this before considering the `lineage` and `detail` screens complete, not as a post-launch add-on — the entire trust model of the app depends on confidence actually being able to move.
7. **Disputed-entry manual review** (Section 5) — a content task, not a code task; can happen in parallel with anything above.
8. Trade Board and Reviews — build directly against the handoff's own `listing` and `review` schemas (Section 6 above notes this supersedes the earlier looser specs).
