import { useMemo } from "react";
import { useDataset } from "../data/DatasetProvider";
import { getFragrancesByHouse } from "../data/selectors";
import { useNav } from "../nav/NavProvider";
import { FragranceCard } from "../components/fragrance";
import { EmptyState } from "../components/primitives";
import type { Fragrance } from "../data/types";
import { FragranceDetailScreen } from "./FragranceDetailScreen";
import "./HouseScreen.css";

export function HouseScreen({ houseId }: { houseId: string }) {
  const { dataset } = useDataset();
  const { push } = useNav();

  const fragrances = useMemo(
    () => (dataset ? getFragrancesByHouse(dataset.fragrances, houseId) : []),
    [dataset, houseId]
  );

  const openFragrance = (f: Fragrance) => push(f.name, () => <FragranceDetailScreen id={f.id} />);

  if (!dataset) return null;

  return (
    <div className="cc-house">
      <p className="cc-micro cc-house__count">{fragrances.length.toLocaleString()} in the index</p>
      {fragrances.length === 0 ? (
        <EmptyState title="Nothing here yet" body="No fragrances from this house are in the index." />
      ) : (
        <div className="cc-house__grid">
          {fragrances.map((f) => (
            <FragranceCard key={f.id} fragrance={f} variant="compact" onClick={() => openFragrance(f)} />
          ))}
        </div>
      )}
    </div>
  );
}
