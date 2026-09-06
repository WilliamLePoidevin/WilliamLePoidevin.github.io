import { useDataset } from "../data/DatasetProvider";
import { useCabinet } from "../data/CabinetProvider";
import { useNav } from "../nav/NavProvider";
import { CABINET_STATUSES, type CabinetStatus } from "../data/cabinet";
import { BottlePortrait } from "../components/fragrance";
import { Button, StatusChip, EmptyState } from "../components/primitives";
import "./CabinetEntryDetailScreen.css";

export function CabinetEntryDetailScreen({ fragranceId }: { fragranceId: string }) {
  const { dataset } = useDataset();
  const { entries, updateEntry, removeEntry } = useCabinet();
  const { pop } = useNav();

  const fragrance = dataset?.fragrancesById.get(fragranceId);
  const entry = entries.get(fragranceId);

  if (!fragrance || !entry) {
    return <EmptyState title="Not found" body="This bottle isn't in your cabinet anymore." />;
  }

  const remove = () => {
    removeEntry(fragranceId);
    pop();
  };

  return (
    <div className="cc-entry-detail">
      <div className="cc-entry-detail__portrait">
        <BottlePortrait id={fragrance.id} name={fragrance.name} image={fragrance.image} ratio="hero" radius="0" inset={false} />
      </div>
      <div className="cc-entry-detail__pad">
        {fragrance.house ? <div className="cc-label cc-entry-detail__house">{fragrance.house}</div> : null}
        <h1 className="cc-entry-detail__name">{fragrance.name}</h1>

        <div className="cc-entry-detail__field">
          <span className="cc-label">Status</span>
          <div className="cc-entry-detail__chip-row">
            {CABINET_STATUSES.map((s: CabinetStatus) => (
              <StatusChip key={s} selected={entry.status === s} onClick={() => updateEntry(fragranceId, { status: s })}>
                {s}
              </StatusChip>
            ))}
          </div>
        </div>

        {entry.status === "For Trade" || entry.status === "Seeking" ? (
          <div className="cc-entry-detail__trade-fields">
            <span className="cc-label">Listing terms</span>
            <input
              className="cc-entry-detail__input"
              type="text"
              placeholder="Condition (e.g. 95% full, like new)"
              value={entry.condition ?? ""}
              onChange={(e) => updateEntry(fragranceId, { condition: e.target.value || null })}
            />
            <input
              className="cc-entry-detail__input"
              type="text"
              placeholder="Presentation (e.g. boxed, bottle only)"
              value={entry.presentation ?? ""}
              onChange={(e) => updateEntry(fragranceId, { presentation: e.target.value || null })}
            />
            <input
              className="cc-entry-detail__input"
              type="number"
              min="0"
              placeholder="Asking price (public)"
              value={entry.price ?? ""}
              onChange={(e) => updateEntry(fragranceId, { price: e.target.value ? Number(e.target.value) : null })}
            />
            <input
              className="cc-entry-detail__input"
              type="text"
              placeholder="What you want in return"
              value={entry.wants ?? ""}
              onChange={(e) => updateEntry(fragranceId, { wants: e.target.value || null })}
            />
          </div>
        ) : null}

        <div className="cc-entry-detail__field">
          <span className="cc-label">Fill: {entry.fillPercent}%</span>
          <input
            className="cc-entry-detail__range"
            type="range"
            min="0"
            max="100"
            value={entry.fillPercent}
            onChange={(e) => updateEntry(fragranceId, { fillPercent: Number(e.target.value) })}
          />
        </div>

        <div className="cc-entry-detail__row">
          <span className="cc-micro">Acquired {entry.acquired}</span>
          <span className="cc-micro">Worn {entry.wornCount}×</span>
          {entry.sizeMl != null ? <span className="cc-micro">{entry.sizeMl}ml</span> : null}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateEntry(fragranceId, { wornCount: entry.wornCount + 1, lastWorn: new Date().toISOString().slice(0, 10) })}
        >
          Log a wear
        </Button>

        {entry.value != null ? (
          <div className="cc-entry-detail__value cc-archive-code">${entry.value} · private</div>
        ) : null}

        <Button variant="caution" onClick={remove}>
          Remove from Cabinet
        </Button>
      </div>
    </div>
  );
}
