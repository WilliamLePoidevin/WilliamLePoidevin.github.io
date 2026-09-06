import { useMemo, useState } from "react";
import { useDataset } from "../../data/DatasetProvider";
import { useLineageVotes } from "../../data/LineageVotesProvider";
import { useNav } from "../../nav/NavProvider";
import { getLineageEdges, searchLineageEdges, type LineageEdge } from "../../data/lineageEdges";
import { BottlePortrait, ConfidenceBadge } from "../../components/fragrance";
import { SkeletonLoader } from "../../components/primitives";
import { RelationDetailScreen } from "../RelationDetailScreen";
import "./LineageScreen.css";

function EdgeRow({ edge, onOpen }: { edge: LineageEdge; onOpen: () => void }) {
  const { getAdjustedCounts } = useLineageVotes();
  const key = edge.key;
  const counts = getAdjustedCounts(key, edge.relation.confirmVotes, edge.relation.disputeVotes);

  return (
    <button type="button" className="cc-lineage-row" onClick={onOpen}>
      <div className="cc-lineage-row__thumb">
        <BottlePortrait id={edge.dupe.id} name={edge.dupe.name} image={edge.dupe.image} ratio="square" radius="var(--radius-inset)" />
      </div>
      <div className="cc-lineage-row__text">
        <div className="cc-lineage-row__name">{edge.dupe.name}</div>
        <div className="cc-micro">{edge.dupe.house}</div>
      </div>
      <span className="cc-lineage-row__arrow" aria-hidden="true">
        &#8594;
      </span>
      <div className="cc-lineage-row__text">
        <div className="cc-lineage-row__name">{edge.original.name}</div>
        <div className="cc-micro">{edge.original.house}</div>
      </div>
      <ConfidenceBadge confirmVotes={counts.confirm} disputeVotes={counts.dispute} />
    </button>
  );
}

// List mode only. A true Map mode (a spatial graph across 4,113 nodes) is a separate,
// larger visualization effort — deliberately deferred rather than faked as a relabelled list.
export function LineageScreen() {
  const { dataset, loading } = useDataset();
  const { push } = useNav();
  const [query, setQuery] = useState("");

  const edges = useMemo(
    () => (dataset ? getLineageEdges(dataset.fragrances, dataset.lineage, dataset.fragrancesById) : []),
    [dataset]
  );
  const results = useMemo(() => searchLineageEdges(edges, query, 30), [edges, query]);

  const openEdge = (edge: LineageEdge) =>
    push(`${edge.dupe.name} → ${edge.original.name}`, () => (
      <RelationDetailScreen dupeId={edge.dupe.id} originalId={edge.original.id} />
    ));

  if (loading) {
    return (
      <div className="cc-lineage__loading">
        <SkeletonLoader lines={5} height={56} />
      </div>
    );
  }

  return (
    <div className="cc-lineage">
      <p className="cc-micro cc-lineage__count">{edges.length.toLocaleString()} traced pairings</p>
      <input
        className="cc-lineage__search"
        type="search"
        placeholder="Search a dupe or an original"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search lineage"
      />
      <div className="cc-lineage__list">
        {results.map((edge) => (
          <EdgeRow key={edge.key} edge={edge} onOpen={() => openEdge(edge)} />
        ))}
        {results.length === 0 ? <p className="cc-micro">Nothing under that name.</p> : null}
      </div>
    </div>
  );
}
