import { useMemo, useState } from "react";
import { useDataset } from "../data/DatasetProvider";
import { useCabinet, defaultEntry } from "../data/CabinetProvider";
import { useNav } from "../nav/NavProvider";
import { searchFragrances } from "../data/selectors";
import { CABINET_STATUSES, type CabinetStatus } from "../data/cabinet";
import type { Fragrance } from "../data/types";
import { FragranceCard } from "../components/fragrance";
import { Button, StatusChip } from "../components/primitives";
import "./AddToCabinetScreen.css";

export function AddToCabinetScreen() {
  const { dataset } = useDataset();
  const { addEntry } = useCabinet();
  const { pop } = useNav();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Fragrance | null>(null);
  const [status, setStatus] = useState<CabinetStatus>("In Cabinet");
  const [sizeMl, setSizeMl] = useState("");
  const [fillPercent, setFillPercent] = useState(100);
  const [value, setValue] = useState("");

  const results = useMemo(
    () => (dataset && query.trim() ? searchFragrances(dataset.fragrances, query, 20) : []),
    [dataset, query]
  );

  if (!selected) {
    return (
      <div className="cc-add-cabinet">
        <input
          className="cc-add-cabinet__search"
          type="search"
          autoFocus
          placeholder="Search a fragrance to add"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="cc-add-cabinet__results">
          {results.map((f) => (
            <FragranceCard key={f.id} fragrance={f} variant="compact" onClick={() => setSelected(f)} />
          ))}
          {query.trim() && results.length === 0 ? <p className="cc-micro">Nothing under that name.</p> : null}
        </div>
      </div>
    );
  }

  const save = () => {
    addEntry({
      ...defaultEntry(selected.id, status),
      sizeMl: sizeMl ? Number(sizeMl) : null,
      fillPercent,
      value: value ? Number(value) : null,
    });
    pop();
  };

  return (
    <div className="cc-add-cabinet">
      <div className="cc-add-cabinet__selected">
        <FragranceCard fragrance={selected} variant="compact" />
      </div>

      <div className="cc-add-cabinet__field">
        <span className="cc-label">Status</span>
        <div className="cc-add-cabinet__chip-row">
          {CABINET_STATUSES.map((s) => (
            <StatusChip key={s} selected={status === s} onClick={() => setStatus(s)}>
              {s}
            </StatusChip>
          ))}
        </div>
      </div>

      <div className="cc-add-cabinet__field">
        <span className="cc-label">Size (ml)</span>
        <input
          className="cc-add-cabinet__input"
          type="number"
          min="0"
          value={sizeMl}
          onChange={(e) => setSizeMl(e.target.value)}
          placeholder="e.g. 100"
        />
      </div>

      <div className="cc-add-cabinet__field">
        <span className="cc-label">Fill: {fillPercent}%</span>
        <input
          className="cc-add-cabinet__range"
          type="range"
          min="0"
          max="100"
          value={fillPercent}
          onChange={(e) => setFillPercent(Number(e.target.value))}
        />
      </div>

      <div className="cc-add-cabinet__field">
        <span className="cc-label">Value (private)</span>
        <input
          className="cc-add-cabinet__input"
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Never shown outside your cabinet"
        />
      </div>

      <div className="cc-add-cabinet__actions">
        <Button variant="ghost" onClick={() => setSelected(null)}>
          Back
        </Button>
        <Button variant="primary" onClick={save}>
          Add to Cabinet
        </Button>
      </div>
    </div>
  );
}
