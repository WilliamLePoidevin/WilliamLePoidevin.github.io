import { useMemo, useState } from "react";
import { useCabinet } from "../../data/CabinetProvider";
import { useLineageVotes } from "../../data/LineageVotesProvider";
import { useDisplayName } from "../../data/displayName";
import { useNav } from "../../nav/NavProvider";
import { CollectorAvatar, TrustMetric } from "../../components/community";
import { Button } from "../../components/primitives";
import { SettingsScreen } from "../SettingsScreen";
import "./YouScreen.css";

// A tier label derived from a real, local count — cabinet size. Nothing here is a claim about
// standing in a wider community; there is no wider community to measure against, only this
// browser's own collection.
function collectorLevel(cabinetSize: number): string {
  if (cabinetSize >= 20) return "Curator";
  if (cabinetSize >= 5) return "Connoisseur";
  return "Collector";
}

export function YouScreen() {
  const { entries } = useCabinet();
  const { voteCount } = useLineageVotes();
  const { name, setName } = useDisplayName();
  const { push } = useNav();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const stats = useMemo(() => {
    let inCabinet = 0;
    let listed = 0;
    for (const entry of entries.values()) {
      inCabinet += 1;
      if (entry.status === "For Trade" || entry.status === "Seeking") listed += 1;
    }
    return { inCabinet, listed };
  }, [entries]);

  const level = collectorLevel(stats.inCabinet);

  const saveName = () => {
    setName(draft);
    setEditing(false);
  };

  return (
    <div className="cc-you">
      <section className="cc-you__profile">
        <CollectorAvatar name={name} size={64} level={level} />
        {editing ? (
          <div className="cc-you__name-edit">
            <input
              className="cc-you__name-input"
              type="text"
              value={draft}
              maxLength={40}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
            />
            <Button size="sm" variant="secondary" onClick={saveName}>
              Save
            </Button>
          </div>
        ) : (
          <button
            type="button"
            className="cc-you__name"
            onClick={() => {
              setDraft(name);
              setEditing(true);
            }}
          >
            {name}
          </button>
        )}
      </section>

      <section className="cc-you__stats">
        <TrustMetric label="In cabinet" value={stats.inCabinet} />
        <TrustMetric label="Listed" value={stats.listed} detail="For Trade / Seeking" />
        <TrustMetric label="Lineage votes" value={voteCount} />
      </section>

      <p className="cc-micro cc-you__hint">
        These are your own real numbers from this browser — Clone Cabinet has no accounts or backend, so nothing
        here is shared with or compared against other collectors.
      </p>

      <Button variant="secondary" onClick={() => push("Settings", () => <SettingsScreen />)}>
        Settings
      </Button>
    </div>
  );
}
