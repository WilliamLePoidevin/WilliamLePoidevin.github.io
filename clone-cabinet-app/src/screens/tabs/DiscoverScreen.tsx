import { useMemo, useState } from "react";
import { useDataset } from "../../data/DatasetProvider";
import { getFeatured, getTopHouses, searchFragrances } from "../../data/selectors";
import { useNav } from "../../nav/NavProvider";
import { FragranceCard } from "../../components/fragrance";
import { SkeletonLoader } from "../../components/primitives";
import { FragranceDetailScreen } from "../FragranceDetailScreen";
import { HouseScreen } from "../HouseScreen";
import type { Fragrance, House } from "../../data/types";
import "./DiscoverScreen.css";

export function DiscoverScreen() {
  const { dataset, loading, error } = useDataset();
  const { push } = useNav();
  const [query, setQuery] = useState("");

  const featured = useMemo(() => (dataset ? getFeatured(dataset.fragrances, 5) : []), [dataset]);
  const houses = useMemo(() => (dataset ? getTopHouses(dataset.houses, 8) : []), [dataset]);
  const results = useMemo(() => (dataset ? searchFragrances(dataset.fragrances, query, 24) : []), [dataset, query]);

  const openFragrance = (f: Fragrance) => push(f.name, () => <FragranceDetailScreen id={f.id} />);
  const openHouse = (h: House) => push(h.name, () => <HouseScreen houseId={h.id} />);

  if (error) {
    return <p className="cc-discover__error cc-micro">Couldn't load the index: {error}</p>;
  }

  if (loading) {
    return (
      <div className="cc-discover__loading">
        <SkeletonLoader height={200} radius="var(--radius-card)" />
        <SkeletonLoader lines={3} height={14} />
      </div>
    );
  }

  return (
    <div className="cc-discover">
      {featured.length > 0 ? (
        <section className="cc-discover__section">
          <div className="cc-discover__section-head">
            <span className="cc-label">Featured</span>
            <span className="cc-micro cc-discover__section-note">Highest community value score</span>
          </div>
          <div className="cc-discover__hrow">
            {featured.map((f) => (
              <div key={f.id} className="cc-discover__hero-item">
                <FragranceCard fragrance={f} variant="object" onClick={() => openFragrance(f)} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {houses.length > 0 ? (
        <section className="cc-discover__section">
          <span className="cc-label">Houses</span>
          <div className="cc-discover__hrow">
            {houses.map((h) => (
              <button type="button" key={h.id} className="cc-discover__house" onClick={() => openHouse(h)}>
                <div className="cc-discover__house-name">{h.name}</div>
                <div className="cc-micro">{h.count} scents</div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="cc-discover__section">
        <span className="cc-label">Browse</span>
        <input
          className="cc-discover__search"
          type="search"
          placeholder="Search a fragrance or house"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the index"
        />
        <div className="cc-discover__grid">
          {results.map((f) => (
            <FragranceCard key={f.id} fragrance={f} variant="compact" onClick={() => openFragrance(f)} />
          ))}
        </div>
        {results.length === 0 ? <p className="cc-micro">Nothing under that name.</p> : null}
      </section>
    </div>
  );
}
