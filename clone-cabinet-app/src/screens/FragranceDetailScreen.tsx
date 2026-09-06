import { useDataset } from "../data/DatasetProvider";
import { useCabinet, defaultEntry } from "../data/CabinetProvider";
import { BottlePortrait, LineageNode } from "../components/fragrance";
import { Button, EmptyState, StatusChip } from "../components/primitives";
import "./FragranceDetailScreen.css";

// A minimal Detail screen — real fields only, nothing from the full isDetail spec (accord
// bars/metric dials/reviews/market tabs) that the current dataset can't honestly back yet.
// Phase 5 will expand this once those fields exist or the screen's tabs are scoped to what's
// real today (lineage clearly is).
export function FragranceDetailScreen({ id }: { id: string }) {
  const { dataset } = useDataset();
  const { entries, addEntry } = useCabinet();
  if (!dataset) return null;

  const fragrance = dataset.fragrancesById.get(id);
  if (!fragrance) {
    return <EmptyState title="Not found" body="This fragrance isn't in the current index." />;
  }

  const relations = dataset.lineage[id] ?? [];
  const meta = [fragrance.house, fragrance.concentration, fragrance.year].filter(Boolean).join(" · ");
  const cabinetEntry = entries.get(id);

  return (
    <div className="cc-fdetail">
      <div className="cc-fdetail__hero">
        <BottlePortrait id={fragrance.id} name={fragrance.name} image={fragrance.image} ratio="hero" radius="0" inset={false} />
      </div>
      <div className="cc-fdetail__pad">
        {fragrance.house ? <div className="cc-label cc-fdetail__house">{fragrance.house}</div> : null}
        <h1 className="cc-fdetail__name">{fragrance.name}</h1>
        {meta ? <div className="cc-fdetail__meta cc-micro">{meta}</div> : null}
        {fragrance.family ? <div className="cc-fdetail__family cc-micro">{fragrance.family}</div> : null}
        {fragrance.thesis ? <p className="cc-fdetail__thesis">{fragrance.thesis}</p> : null}
        {fragrance.price != null ? (
          <div className="cc-fdetail__price cc-archive-code">${fragrance.price}</div>
        ) : null}

        <div className="cc-fdetail__cabinet-row">
          {cabinetEntry ? (
            <StatusChip tone="cabinet">{cabinetEntry.status}</StatusChip>
          ) : (
            <Button size="sm" onClick={() => addEntry(defaultEntry(fragrance.id))}>
              Add to Cabinet
            </Button>
          )}
        </div>

        {fragrance.accords.length > 0 ? (
          <section className="cc-fdetail__section">
            <span className="cc-label">Accords</span>
            {/* Names only — no per-accord strength exists in the dataset (INTEGRATION_GUIDE.md
                Section 3), so AccordBar (which requires a real value) isn't used here. */}
            <div className="cc-fdetail__accord-tags">
              {fragrance.accords.map((a) => (
                <AccordBarPlaceholder key={a} label={a} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="cc-fdetail__section">
          <span className="cc-label">Worth smelling next</span>
          {relations.length > 0 ? (
            <div className="cc-fdetail__lineage-row">
              {relations.map((r) => {
                const related = dataset.fragrancesById.get(r.id);
                if (!related) return null;
                return (
                  <LineageNode
                    key={r.id}
                    fragrance={{ id: related.id, name: related.name, house: related.house, image: related.image }}
                    relation={r.relation}
                    verified={r.verified}
                    confidence={r.confidence}
                  />
                );
              })}
            </div>
          ) : (
            <p className="cc-micro">No lineage recorded for this entry yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

// A name-only accord tag — AccordBar itself requires a real strength value we don't have.
function AccordBarPlaceholder({ label }: { label: string }) {
  return <span className="cc-fdetail__accord-tag cc-label">{label}</span>;
}
