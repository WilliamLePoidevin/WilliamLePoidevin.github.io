import type { ReactNode } from "react";
import {
  FragranceCard,
  BottlePortrait,
  AccordBar,
  MetricDial,
  LineageNode,
  CabinetShelf,
  OpenChamber,
  type FragranceCardData,
} from "../components/fragrance";
import { ReviewCard, TradeCard, TrustMetric, CollectorAvatar } from "../components/community";
import { Button } from "../components/primitives";
import "./DomainGallery.css";

// A 1x1 amber square, standing in for a real photo purely to prove the <img> branch renders —
// not real art. Every other example below uses the actual dataset shape: image is null.
const TEST_FIXTURE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Crect width='4' height='5' fill='%23E6D6B8'/%3E%3C/svg%3E";

// Shaped exactly like the real dataset: most enrichment fields are null. See
// docs/design/clone-cabinet/data/fragrances.json and INTEGRATION_GUIDE.md Section 3.
const REAL_SHAPED: FragranceCardData = {
  id: "cc-759f5edd",
  name: "Khamrah",
  house: "Lattafa Perfumes",
  year: null,
  concentration: null,
  accords: [],
  score: null,
  image: null,
  thesis: null,
};

// A hypothetical fully-enriched record — Phase 6 territory once real research exists. Shown
// once, clearly, to prove the card doesn't just work when everything is null.
const HYPOTHETICAL_ENRICHED: FragranceCardData = {
  id: "cc-demo0001",
  name: "Example Enriched Record",
  house: "Demo House",
  year: 2019,
  concentration: "EDP",
  accords: ["Amber", "Vanilla", "Cinnamon"],
  score: 4.1,
  image: TEST_FIXTURE_IMAGE,
  thesis: "A hypothetical fixture — no fragrance in the real dataset has this much data yet.",
};

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="cc-dgallery__section">
      <h2 className="cc-label cc-dgallery__section-title">{title}</h2>
      {note ? <p className="cc-dgallery__note">{note}</p> : null}
      <div className="cc-dgallery__section-body">{children}</div>
    </section>
  );
}

export function DomainGallery() {
  return (
    <div className="cc-dgallery">
      <header className="cc-dgallery__header">
        <p className="cc-wordmark cc-dgallery__wordmark">Clone Cabinet</p>
        <h1 className="cc-dgallery__title">Domain components</h1>
        <p className="cc-dgallery__subtitle">
          Phase 4. Every example under "real dataset shape" uses null/[] exactly like
          fragrances.json — the hidden dials and missing accord rows are the point, not a bug.
        </p>
      </header>

      <Section
        title="FragranceCard — real dataset shape (year/concentration/accords/score/thesis: null)"
        note="No fake placeholders render for the null fields — they simply don't appear."
      >
        <div className="cc-dgallery__row">
          <div className="cc-dgallery__col" style={{ maxWidth: 320 }}>
            <FragranceCard fragrance={REAL_SHAPED} variant="editorial" status="In Cabinet" />
          </div>
          <FragranceCard fragrance={REAL_SHAPED} variant="compact" status="In Cabinet" />
        </div>
      </Section>

      <Section title="FragranceCard — hypothetical fully-enriched record" note="Phase 6 data, not yet real.">
        <div className="cc-dgallery__row">
          <div className="cc-dgallery__col" style={{ maxWidth: 320 }}>
            <FragranceCard fragrance={HYPOTHETICAL_ENRICHED} variant="editorial" status="In Cabinet" />
          </div>
          <FragranceCard fragrance={HYPOTHETICAL_ENRICHED} variant="object" />
          <FragranceCard
            fragrance={{ ...HYPOTHETICAL_ENRICHED, lineageNote: "Inspiration · 82%" }}
            variant="lineage"
          />
        </div>
      </Section>

      <Section title="FragranceCard — shelf variant">
        <div className="cc-dgallery__row">
          <div style={{ width: 100 }}>
            <FragranceCard fragrance={REAL_SHAPED} variant="shelf" status="In Cabinet" />
          </div>
        </div>
      </Section>

      <Section title="BottlePortrait — placeholder vs test-fixture image">
        <div className="cc-dgallery__row">
          <div style={{ width: 120 }}>
            <BottlePortrait id="cc-759f5edd" name="Khamrah" image={null} />
          </div>
          <div style={{ width: 120 }}>
            <BottlePortrait id="cc-a1b2c3d4" name="Another Name" image={null} />
          </div>
          <div style={{ width: 120 }}>
            <BottlePortrait id="cc-demo0001" name="Example" image={TEST_FIXTURE_IMAGE} />
          </div>
        </div>
      </Section>

      <Section title="AccordBar" note="Requires a real numeric strength — the caller decides whether to render it at all.">
        <div className="cc-dgallery__col" style={{ maxWidth: 320 }}>
          <AccordBar label="Amber" value={78} />
          <AccordBar label="Vanilla" value={54} tone="iris" />
          <AccordBar label="Cinnamon" value={32} />
        </div>
      </Section>

      <Section title="MetricDial">
        <div className="cc-dgallery__row">
          <MetricDial value={78} label="Projection" caption="Heavy" />
          <MetricDial value={54} label="Sillage" tone="alloy" caption="Moderate" />
        </div>
      </Section>

      <Section title="LineageNode">
        <div className="cc-dgallery__row">
          <LineageNode
            fragrance={{ id: "cc-orig0001", name: "Creed Aventus", house: "Creed" }}
            relation="original"
            verified
            confidence={95}
          />
          <LineageNode
            fragrance={{ id: "cc-759f5edd", name: "Khamrah", house: "Lattafa" }}
            relation="interpretation"
            active
            confidence={70}
          />
          <LineageNode
            fragrance={{ id: "cc-disp0001", name: "Disputed Candidate", house: "House X" }}
            relation="inspiration"
            confidence={50}
          />
        </div>
      </Section>

      <Section title="CabinetShelf + OpenChamber">
        <CabinetShelf columns={4} label="24 Scents">
          <FragranceCard fragrance={REAL_SHAPED} variant="shelf" status="In Cabinet" />
          <FragranceCard fragrance={HYPOTHETICAL_ENRICHED} variant="shelf" />
          <OpenChamber />
        </CabinetShelf>
      </Section>

      <Section title="CollectorAvatar + TrustMetric">
        <div className="cc-dgallery__row">
          <CollectorAvatar name="Sasha Bloom" level="Curator" verified />
          <CollectorAvatar name="No Photo Yet" />
        </div>
        <div className="cc-dgallery__row">
          <TrustMetric label="Trades" value={34} tone="good" detail="0 disputes" />
          <TrustMetric label="Response time" value="< 1hr" tone="neutral" />
          <TrustMetric label="Disputes" value={2} tone="alert" />
        </div>
      </Section>

      <Section title="ReviewCard">
        <div style={{ maxWidth: 420 }}>
          <ReviewCard
            author="Sasha Bloom"
            level="Curator"
            verified
            score={4.3}
            context="Owns · 50ml · batch 21B"
            body="Opens loud and sweet, settles into something genuinely wearable by hour two."
            reactions={[{ label: "Agree", count: 12 }]}
            date="3d ago"
          />
        </div>
      </Section>

      <Section title="TradeCard">
        <div style={{ maxWidth: 420 }}>
          <TradeCard
            listing={{
              fragrance: { id: "cc-759f5edd", name: "Khamrah", house: "Lattafa Perfumes", image: null },
              condition: "95% full",
              fill: 95,
              presentation: "Boxed",
              collectorName: "Sasha Bloom",
              trades: 34,
              region: "US",
              wants: "Aventus-adjacent, or cash",
              verified: true,
            }}
            action={
              <Button size="sm" variant="secondary">
                Message seller
              </Button>
            }
          />
        </div>
      </Section>
    </div>
  );
}
