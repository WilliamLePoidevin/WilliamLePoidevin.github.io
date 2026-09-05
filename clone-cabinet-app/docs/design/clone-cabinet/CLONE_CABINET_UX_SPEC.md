# Clone Cabinet — UX Wireframe & Design System Prompt (v2)

*A functional specification for the Collector's World of Fragrance app. Describes structure, hierarchy, and behavior — not visual styling (colors, type, and logo are defined in the Clone Cabinet brand board). This version expands the app from a reference database into a full collector community: cabinet tracking, community-sourced clone suggestions, trading, ratings, affiliate commerce, and discovery/trending.*

---

## 0. What changed from v1, and one thing worth saying plainly

v1 explicitly said: no trading, no shopping-cart/affiliate features, no algorithmic feed, no social graph beyond a membership card. This version reverses most of that on your direction. That's a legitimate call — a collector community genuinely wants trading, ratings, and a pulse on what's new — but it's worth naming the trade-off once: every feature below adds real trust-and-safety surface area (trading strangers money-adjacent goods, public ratings, DMs). I've scoped each one as tightly as I could while still doing what you asked, and flagged the two or three spots where "start simple" actually protects you rather than just being cautious for its own sake.

**The one rule that now matters more than ever:** this app will soon show three different trust signals on the same entry — confidence (is the pairing claim well-sourced), rating (is the fragrance good), and trade activity (is this thing actively being bought/sold). These must never share a visual language. A five-star icon, a dot-count badge, and a price tag are different shapes making different claims. If they start looking similar, users will read "well-rated" as "well-sourced" or vice versa, and the entire credibility of this dataset — which is the actual product — erodes.

---

## 1. What this app is now

Clone Cabinet is a **collector's reference, personal archive, and trading community** for clone/dupe fragrances. Four jobs, in priority order:
1. Help someone find and trust a pairing (the original core)
2. Let them track what they own and want (Cabinet)
3. Let them buy, sell, and trade with other collectors, and support the app via affiliate commerce
4. Keep them coming back to see what's new, trending, and worth talking about

---

## 2. Information architecture

```
Clone Cabinet
├── Browse
│   ├── Gallery / Ledger views
│   ├── Detail Panel → Lineage, Rating, Shop links, Comments
│   └── Suggest a Clone (promoted entry point, not buried)
├── Discover  ── NEW, second tab, not an afterthought
│   ├── New to the Index
│   ├── Trending This Week
│   ├── The Buzz (editorial: upcoming releases, cross-platform chatter)
│   └── Recommended for Your Cabinet
├── My Cabinet
│   ├── Owned shelf / Wish shelf
│   ├── Membership Card
│   ├── My Listings (things I've posted to trade)
│   └── My Contributions (pairings I've suggested + their status)
├── Trade Board  ── NEW
│   ├── Browse listings (For Sale / For Trade / Wanted)
│   ├── Post a listing
│   └── Listing detail → Message Seller
├── Houses
├── Messages  ── NEW, scoped to trade coordination + system notifications
└── Search (persistent access, not just a tab)
```

Six tabs on mobile is too many for a bottom bar — collapse to five: **Browse · Discover · Cabinet · Trade · Messages**, with Houses and Search reachable from within Browse (Search as a persistent bar, Houses as a filter entry point), keeping the tab bar itself uncluttered.

---

## 3. Screens carried over from v1 (updates only)

### 3.1 Browse — Gallery / Ledger / Detail Panel

No structural change from v1 (see prior spec for full layout). **New additions to the Detail Panel:**

- **Rating block**, placed directly below the confidence claim, visually distinct: a five-star or five-dot rating (pick one shape and never reuse it for confidence — recommend stars, since confidence already owns dots), aggregate score + review count ("4.3 from 212 collectors"), tap to open a lightweight review list (star + optional one-line comment, no long-form reviews — this is a rating system, not a second Fragrantica).
- **Shop block**, below Rating: if the house/entry has a known retailer carrying it, a "Shop this dupe" button linking out through an affiliate-tagged URL. When multiple retailers carry it, show as a short list (retailer name + price) rather than picking one for the user. Label honestly: small "affiliate link" disclosure text, permanently visible, not hidden in a settings page — this is a trust product, the monetization has to be as transparent as the sourcing methodology.
- **Comment thread**, collapsed by default under a "12 comments" disclosure, not auto-expanded — this is a reference page first, a discussion page second. Comments are flat (no nested replies beyond one level) to keep this from becoming a forum.
- **"List this for trade"** quick action, if the user owns this entry in their Cabinet — pre-fills a Trade listing with the entry already attached.

### 3.2 My Cabinet

Structural carryover from v1, plus:
- **My Listings** section — small, collapsed by default, shows active trade posts with status (Active / Pending / Completed)
- **My Contributions** section — every pairing the user has suggested, with its confirmation progress, so contributors have one place to check on submissions instead of hunting through the Submit queue

---

## 4. New: Discover

**Purpose:** the answer to "what's happening in this world right now" — the single most-requested addition, and the reason someone opens the app on a day they're not actively hunting for a specific pairing.

- **New to the Index.** Straightforward, data-driven: entries added in the last 7-14 days, newest first. No curation needed, just a date filter on existing data.
- **Trending This Week.** Also data-driven, computed from real in-app signals already available: most-saved-to-Cabinet this week + most-confirmed community submissions this week, blended into one ranked rail. Genuine trending, not manufactured — if nothing moved this week, the section says so plainly rather than padding itself.
- **The Buzz.** The one editorial section — upcoming/announced releases not yet available, cross-platform chatter (what's being talked about on TikTok/Reddit/YouTube), house announcements. This needs an actual human-or-research process behind it (someone or something monitoring the space), not just a database query — flag this honestly as an ongoing content operation, not a one-time build. Rendered as a small number of curated cards (3-5), refreshed on a cadence (weekly is realistic), each linking out to its source rather than the app claiming the information as its own research.
- **Recommended for Your Cabinet.** Bounded and occasional, not an infinite feed — 6-8 suggestions based on houses/references already in the user's Cabinet, refreshed once a day, not re-ranked on every scroll. The goal is "you might have missed this," not maximizing time-in-app. This satisfies the "recommendation area" ask without becoming the addictive engagement-feed v1 explicitly avoided — the boundedness is the feature, not a limitation.

---

## 5. New: Trade Board

**Purpose:** peer-to-peer trading and selling among collectors — scoped as a classifieds board with in-app coordination, **not** a payment processor. The app facilitates the connection; money and shipping happen off-platform between users, at least in this version. Building actual payment/escrow is a serious trust-and-safety and possibly regulatory undertaking — start without it, add it later only if the classifieds model proves out and demand is clearly there.

- **Listing types:** For Sale, For Trade (open to offers), Wanted (someone posting what they're hunting for) — three clearly distinct visual treatments (a simple color-coded tag is enough, don't over-engineer this).
- **Browse listings.** Filterable by listing type, house, reference, and — critically — proximity/shipping region if that data is ever collected, since fragrance trading has real shipping-cost and customs implications collectors care about.
- **Listing detail.** Photos (real photos of the actual bottle, not the dataset's stock art — trading requires proof of condition), fill level if partial, asking price/trade terms, and a **Message Seller** button that opens a Messages thread scoped to that listing.
- **Post a listing.** Pulls from the user's Cabinet if the item is already tracked there (auto-fills dupe name, house, inspiration), otherwise a manual entry form. Condition/fill-level field, since secondhand fragrance trading lives and dies on that detail.
- **Trust signals, kept minimal for v1:** a simple "N successful trades" counter per user, self-reported completion (both parties mark a trade complete) — no complex reputation/review system yet. This is the kind of thing to expand carefully once real usage patterns exist, not design exhaustively up front.

---

## 6. New: Messages

**Purpose:** scoped narrowly, on purpose. This is not a general chat feature — it exists to (a) coordinate a specific trade and (b) deliver system notifications (a contribution got confirmed, someone messaged about a listing, a wishlisted reference just got a new confirmed dupe).

- **Thread list.** Each thread tied to either a Trade listing (shown with a small listing-preview header pinned to the top of the thread) or a system notification category. No open-ended "start a chat with anyone" — threads only originate from a listing's Message Seller button, which keeps this from becoming a general social feature with the moderation burden that implies.
- **Notifications** live in this same tab as a filtered view, not a separate badge system layered on top — one inbox, two tabs within it (Trade / Updates).

---

## 7. New: Suggest a Clone / Rating — merged into "Contribute"

Renaming Submit → **Contribute**, and giving it two clearly separated halves rather than treating rating as an afterthought bolted onto Detail Panel alone:

- **Suggest a Clone** — same form and confirmation-queue mechanic as v1 (four fields, 3-confirmation promotion), now explicitly promoted from Browse's header, not just reachable via a tab
- **Rate a Fragrance** — a lightweight, separate flow: search for something already in the index, leave a star rating + optional one-liner. This is intentionally decoupled from the Suggest flow — someone rating a fragrance they already bought shouldn't need to also verify a sourcing claim, and someone confirming a sourcing claim shouldn't be asked to rate a scent they may not own.

---

## 8. Affiliate commerce — where it lives, and where it deliberately doesn't

- **Where it shows:** the Shop block in Detail Panel (Section 3.1), and optionally a small price/retailer indicator on Gallery cards on hover — never as an interstitial, never as a popup, never gating access to the pairing data itself. The data has to stay free and trustworthy-feeling regardless of monetization.
- **Where it explicitly doesn't show:** Trade Board listings are peer-to-peer, no affiliate insertion there — mixing "buy from a verified retailer via our link" with "buy secondhand from a stranger" in the same visual space would confuse two very different trust levels.
- **Ties to existing infrastructure:** this connects to the affiliate program relationships already in progress for the broader app (FragranceX, Jomashop, PerfumeBox, GiftExpress, Venba Fragrance confirmed; several others flagged as direct-outreach opportunities) — Shop links should be built to route through whichever affiliate program actually covers a given retailer, falling back to a plain (non-monetized) link when no program exists yet, rather than blocking the link entirely.

---

## 9. Component inventory (additions to v1's list)

- **Rating Stars** (distinct shape/color from Confidence Badge — non-negotiable)
- **Trade Listing Card** (photo-forward, type tag, price/terms, condition)
- **Message Thread** (listing-preview header + flat message list)
- **Shop Link Row** (retailer name, price, affiliate disclosure microcopy)
- **Trending Rail** (same shell as v1's Lineage spotlight rail — reuse it, don't invent a new horizontal-scroll pattern for every section)
- **Contribution Status Chip** (Pending N/3 · Confirmed · used in My Cabinet and Contribute)

---

## 10. Revised: what to still hold the line on

Even with this expansion, a few things from v1 are worth keeping out, or at minimum starting without:

- **No in-app payments/escrow** — Trade Board coordinates, it doesn't process money, at least at first.
- **No open-ended messaging** — threads only originate from a trade listing; this is not a DM-anyone social feature.
- **No infinite Discover feed** — Recommended stays bounded and daily-refreshed, not endlessly scrollable.
- **No algorithmic ranking of Browse itself** — Browse stays sort/filter-driven and predictable; "hot" content lives only in Discover, where a user has opted into that mode, so the main reference experience never feels manipulated toward engagement over accuracy.

---

## 11. New: Community-Determined Confidence (replaces the research-tier system as the live signal)

**This is the single biggest mechanic change in the app.** Confidence stops being something assigned once by research and frozen; it becomes a live, moving number the community pushes up or down forever. This also fully replaces the old "3 confirmations and you're promoted, done" one-way mechanic from the original Contribute flow — confidence should now be capable of *rising or falling* indefinitely, not just crossing a threshold once.

### 11.1 The vote mechanic

- Every pairing carries two buttons, not a star rating: **"Confirms this"** and **"Doesn't match."** Binary, not a slider — collectors are voting on a factual claim (is X actually a dupe of Y), not expressing a spectrum of enjoyment. Keep this visually and functionally distinct from the Rating Stars (Section 3.1/9) — rating asks "is this a good fragrance," confidence-voting asks "is this claim true." Different question, different control, different icon shape.
- **One vote per user per entry**, changeable (a user can flip their vote later, but not stack multiple votes) — reuse the existing voter-identity mechanic already built for the old confirmation system rather than inventing a new one.
- Votes are visible in aggregate ("340 confirm · 12 dispute") but never as a raw list of who voted — this is a trust signal, not a social leaderboard.

### 11.2 From votes to a displayed confidence state

A raw vote count isn't a badge by itself — it needs thresholds that produce the actual states shown throughout the app:

| State | Condition (illustrative, tune with real data later) | Badge treatment |
|---|---|---|
| **Neutral / Unconfirmed** | Fewer than ~10 total votes | Dotted/hollow badge outline — visually "not yet decided," not styled as a low score |
| **Community Confirmed** | 10+ votes, 80%+ agree | Filled badge, same visual family as the old "strong-consensus" |
| **Emerging** | 10+ votes, 60-80% agree | Partial-fill badge — genuinely trending toward confirmed but not settled |
| **Disputed** | Real volume on both sides (e.g., 40-60% split with 15+ votes) | The existing "disputed" treatment — flag, not failure |
| **Community Disputes This** | Net negative, 70%+ say "doesn't match" | A distinct low state — this is new; the current system has no "the community thinks this is wrong" state, and it needs one, styled as a warning, not just an absence of confidence |

- **Minimum vote thresholds matter more than the percentages** — a single vote should never be enough to move an entry out of Neutral. This is the same principle that made the old 3-confirmation threshold work; it just needs to keep applying forever instead of one-and-done.
- **A confidence history sparkline** on the Detail Panel (this is where the brand board's "intensity waveform" component finally gets honest, real data to render — see v1 Section 5) — showing the vote balance shift over time. Genuinely useful for a pairing that used to be trusted and is now being disputed, which the old static-tier system had no way to show at all.

### 11.3 Anti-gaming, kept simple for v1

- Vote weight is flat (one person, one vote) at launch — no reputation-weighted voting yet, that's a v2 problem once real usage patterns exist to design against.
- Rate-limit voting per session (a burst of 50 votes in a minute from one identity is a signal, not a trust event) — this only needs a simple cooldown, not a fraud-detection system, at this scale.
- The existing per-browser voter-id mechanic is a soft protection, not a hard one (someone could clear storage and vote again) — worth knowing going in, and worth revisiting if the community grows past the size where that's a real problem rather than a theoretical one.

### 11.4 Resolved: the research seeds the vote tally, then the community takes over

Decided: **seeded start.** Every entry's existing research tier converts into a *starting synthetic vote count* the day this mechanic goes live — not a permanent badge, just the opening position in a now-live tally that real votes add to from that point forward, in either direction.

Suggested seeding, calibrated so the vote-threshold table in 11.2 still behaves sensibly on day one:

| Research tier (existing) | Seeded as | Resulting starting state |
|---|---|---|
| **Strong-consensus** | 15 confirm / 0 dispute | Comfortably inside Community Confirmed, but not so high that real disagreement can't move it — a determined run of "doesn't match" votes still pulls it toward Emerging or Disputed over time |
| **Contested** | 5 confirm / 1 dispute | Sits right at the edge of Neutral/Emerging — reflects "one decent source, not nothing" without pretending it's settled |
| **Loose** | 2 confirm / 0 dispute | Barely above the Neutral floor — a handful of real votes either way will move it quickly, which is correct, since loose entries are exactly the ones that most need community input |
| **Disputed (existing flag)** | 5 confirm / 5 dispute | Seeded to land directly in the Disputed state from day one — the flag was already recording a real disagreement between sources, so the seed should show that split immediately rather than starting neutral and waiting for the community to rediscover a conflict the research already found |
| **Community-verified (already-promoted)** | Their real accumulated vote count, unchanged | These already came from actual votes under the old one-time mechanic — carry the real numbers forward rather than reseeding them synthetically |

This preserves the actual signal in the research (a strong-consensus entry starts trusted, a loose one starts fragile) while making every single number on that table something the community can genuinely overturn — including the strong-consensus entries, if enough people vote "doesn't match." Nothing is permanent anymore; the research just gets to set the opening position instead of getting thrown away.

**Implementation note:** converting the current dataset's stored confidence tiers into this seeded vote-tally format is a data migration, not a UI change — worth doing as its own focused pass on the actual `dupeData.json`/component when you're ready to build this rather than folding it into further spec work.
