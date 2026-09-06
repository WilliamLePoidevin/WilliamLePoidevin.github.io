import { useMemo } from "react";
import { useCabinet } from "../../data/CabinetProvider";
import { useDataset } from "../../data/DatasetProvider";
import { useDisplayName } from "../../data/displayName";
import { useNav } from "../../nav/NavProvider";
import type { CabinetEntry } from "../../data/cabinet";
import type { Fragrance } from "../../data/types";
import { TradeCard } from "../../components/community";
import { EmptyState } from "../../components/primitives";
import { CabinetEntryDetailScreen } from "../CabinetEntryDetailScreen";
import "./TradeScreen.css";

// Trade Board, scoped to what's honestly buildable without a backend or accounts (see
// CLONE_CABINET_UX_SPEC.md Section 5). "Your listings" is real: it's your own Cabinet entries
// marked For Trade/Seeking. Browsing OTHER collectors' listings needs other real collectors —
// there are none, because this is a single-visitor static site. Rather than invent fake
// sellers and fake posts to fill that section (exactly the kind of fabricated placeholder the
// non-negotiables rule out), it says so plainly.
export function TradeScreen() {
  const { entries } = useCabinet();
  const { dataset, loading } = useDataset();
  const { name } = useDisplayName();
  const { push } = useNav();

  const listings = useMemo(() => {
    if (!dataset) return [];
    const rows: { entry: CabinetEntry; fragrance: Fragrance }[] = [];
    for (const entry of entries.values()) {
      if (entry.status !== "For Trade" && entry.status !== "Seeking") continue;
      const fragrance = dataset.fragrancesById.get(entry.fragranceId);
      if (fragrance) rows.push({ entry, fragrance });
    }
    return rows;
  }, [entries, dataset]);

  const openListing = (fragranceId: string) =>
    push("Listing", () => <CabinetEntryDetailScreen fragranceId={fragranceId} />);

  if (loading) return null;

  return (
    <div className="cc-trade">
      <section className="cc-trade__section">
        <span className="cc-label">Your listings</span>
        {listings.length === 0 ? (
          <p className="cc-micro cc-trade__hint">
            Nothing posted yet. Open a bottle in your Cabinet and set its status to For Trade or Seeking to list it
            here.
          </p>
        ) : (
          <div className="cc-trade__list">
            {listings.map(({ entry, fragrance }) => (
              <TradeCard
                key={entry.fragranceId}
                listing={{
                  fragrance: { id: fragrance.id, name: fragrance.name, house: fragrance.house, image: fragrance.image },
                  condition: entry.condition ?? undefined,
                  fill: entry.fillPercent,
                  presentation: entry.presentation ?? undefined,
                  price: entry.price,
                  collectorName: name,
                  wants: entry.wants ?? undefined,
                }}
                onClick={() => openListing(entry.fragranceId)}
              />
            ))}
          </div>
        )}
        {listings.some((l) => !l.entry.condition && !l.entry.wants && !l.entry.price) ? (
          <p className="cc-micro cc-trade__hint">
            Add condition, price, or what you want in return from a listing's detail screen.
          </p>
        ) : null}
      </section>

      <section className="cc-trade__section">
        <span className="cc-label">Browse the community</span>
        <EmptyState
          title="No other collectors yet"
          body="Trade needs other people posting listings, and this app has no backend or accounts to connect them yet. Your own listings above are ready for when it does."
        />
      </section>
    </div>
  );
}
