import { useMemo, useState } from "react";
import { useCabinet } from "../../data/CabinetProvider";
import { useDataset } from "../../data/DatasetProvider";
import { useNav } from "../../nav/NavProvider";
import { CABINET_STATUSES, type CabinetEntry, type SortKey } from "../../data/cabinet";
import type { Fragrance } from "../../data/types";
import { CabinetShelf, FragranceCard, OpenChamber } from "../../components/fragrance";
import { StatusChip, EmptyState } from "../../components/primitives";
import { AddToCabinetScreen } from "../AddToCabinetScreen";
import { CabinetEntryDetailScreen } from "../CabinetEntryDetailScreen";
import "./CabinetScreen.css";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "acquired", label: "Acquired" },
  { key: "house", label: "House" },
  { key: "fill", label: "Fill" },
  { key: "value", label: "Value" },
];

function sortRows(rows: { entry: CabinetEntry; fragrance: Fragrance }[], sort: SortKey) {
  const sorted = [...rows];
  switch (sort) {
    case "house":
      sorted.sort((a, b) => (a.fragrance.house ?? "").localeCompare(b.fragrance.house ?? ""));
      break;
    case "fill":
      sorted.sort((a, b) => b.entry.fillPercent - a.entry.fillPercent);
      break;
    case "value":
      sorted.sort((a, b) => (b.entry.value ?? -1) - (a.entry.value ?? -1));
      break;
    default:
      sorted.sort((a, b) => b.entry.acquired.localeCompare(a.entry.acquired));
  }
  return sorted;
}

export function CabinetScreen() {
  const { entries } = useCabinet();
  const { dataset, loading } = useDataset();
  const { push } = useNav();
  const [sort, setSort] = useState<SortKey>("acquired");

  const rows = useMemo(() => {
    if (!dataset) return [];
    const list: { entry: CabinetEntry; fragrance: Fragrance }[] = [];
    for (const entry of entries.values()) {
      const fragrance = dataset.fragrancesById.get(entry.fragranceId);
      if (fragrance) list.push({ entry, fragrance });
    }
    return list;
  }, [entries, dataset]);

  const openAdd = () => push("Add to Cabinet", () => <AddToCabinetScreen />);
  const openEntry = (fragranceId: string) =>
    push("Bottle Detail", () => <CabinetEntryDetailScreen fragranceId={fragranceId} />);

  if (loading) return null;

  if (rows.length === 0) {
    return (
      <div className="cc-cabinet__empty">
        <EmptyState
          title="Nothing in your cabinet yet"
          body="Find a fragrance on Discover and add it, or start here."
          action={<OpenChamber label="The Open Chamber" hint="Add your first bottle." onClick={openAdd} />}
        />
      </div>
    );
  }

  return (
    <div className="cc-cabinet">
      <div className="cc-cabinet__sort">
        {SORTS.map((s) => (
          <StatusChip key={s.key} selected={sort === s.key} onClick={() => setSort(s.key)}>
            {s.label}
          </StatusChip>
        ))}
      </div>

      {CABINET_STATUSES.map((status) => {
        const group = sortRows(
          rows.filter((r) => r.entry.status === status),
          sort
        );
        if (group.length === 0) return null;
        return (
          <CabinetShelf key={status} columns={3} label={`${group.length} ${status.toUpperCase()}`}>
            {group.map(({ entry, fragrance }) => (
              <FragranceCard
                key={entry.fragranceId}
                fragrance={fragrance}
                variant="shelf"
                status={entry.status}
                onClick={() => openEntry(entry.fragranceId)}
              />
            ))}
            {status === "In Cabinet" ? <OpenChamber onClick={openAdd} /> : null}
          </CabinetShelf>
        );
      })}
    </div>
  );
}
