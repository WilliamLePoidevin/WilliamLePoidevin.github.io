import { useDataset } from "../data/DatasetProvider";
import { useLineageVotes } from "../data/LineageVotesProvider";
import { getConfidenceState, getConfidencePercent, CONFIDENCE_LABEL } from "../data/confidence";
import { mergeRelationsById } from "../data/lineageEdges";
import { BottlePortrait, ConfidenceBadge } from "../components/fragrance";
import { Button, EmptyState } from "../components/primitives";
import "./RelationDetailScreen.css";

interface RelationDetailScreenProps {
  dupeId: string;
  originalId: string;
}

// The live confirm/dispute vote — CLONE_CABINET_UX_SPEC.md Section 11.1. Binary, one vote per
// browser, changeable. There's no backend, so this browser's own vote is the only one that can
// actually move — see LineageVotesProvider's header comment for why that's an honest limit,
// not a hidden one.
export function RelationDetailScreen({ dupeId, originalId }: RelationDetailScreenProps) {
  const { dataset } = useDataset();
  const { getVote, setVote, getAdjustedCounts } = useLineageVotes();

  if (!dataset) return null;
  const dupe = dataset.fragrancesById.get(dupeId);
  const original = dataset.fragrancesById.get(originalId);
  // Merged the same way the list view builds edges, so a pairing backed by two source
  // citations shows the same combined vote count wherever it's viewed from.
  const relation = mergeRelationsById(dataset.lineage[dupeId] ?? []).find((r) => r.id === originalId);

  if (!dupe || !original || !relation) {
    return <EmptyState title="Not found" body="This pairing isn't in the current index." />;
  }

  const relationKey = `${dupeId}:${originalId}`;
  const myVote = getVote(relationKey);
  const counts = getAdjustedCounts(relationKey, relation.confirmVotes, relation.disputeVotes);
  const state = getConfidenceState(counts.confirm, counts.dispute);
  const percent = getConfidencePercent(counts.confirm, counts.dispute);
  const total = counts.confirm + counts.dispute;

  return (
    <div className="cc-relation-detail">
      <div className="cc-relation-detail__pair">
        <div className="cc-relation-detail__side">
          <BottlePortrait id={dupe.id} name={dupe.name} image={dupe.image} ratio="square" radius="var(--radius-card)" />
          <div className="cc-relation-detail__side-name">{dupe.name}</div>
          {dupe.house ? <div className="cc-micro">{dupe.house}</div> : null}
        </div>
        <span className="cc-relation-detail__arrow" aria-hidden="true">
          &#8594;
        </span>
        <div className="cc-relation-detail__side">
          <BottlePortrait id={original.id} name={original.name} image={original.image} ratio="square" radius="var(--radius-card)" />
          <div className="cc-relation-detail__side-name">{original.name}</div>
          {original.house ? <div className="cc-micro">{original.house}</div> : null}
        </div>
      </div>

      <div className="cc-relation-detail__pad">
        <ConfidenceBadge confirmVotes={counts.confirm} disputeVotes={counts.dispute} />
        <p className="cc-relation-detail__state-note cc-micro">
          {total > 0 ? `${counts.confirm} confirm · ${counts.dispute} dispute` : "No votes yet"}
          {state !== "neutral" ? ` · ${percent}% agree` : ""}
        </p>

        {relation.disputed ? (
          <p className="cc-relation-detail__disputed-note cc-micro">
            Sources disagreed on this one — see the note below.
          </p>
        ) : null}

        <p className="cc-relation-detail__source">{relation.source}</p>

        <div className="cc-relation-detail__vote-row">
          <Button
            variant={myVote === "confirm" ? "signal" : "secondary"}
            onClick={() => setVote(relationKey, "confirm")}
          >
            Confirms this
          </Button>
          <Button
            variant={myVote === "dispute" ? "caution" : "secondary"}
            onClick={() => setVote(relationKey, "dispute")}
          >
            Doesn't match
          </Button>
        </div>
        {myVote ? (
          <p className="cc-micro cc-relation-detail__my-vote">
            You {myVote === "confirm" ? "confirmed" : "disputed"} this. Tap again to undo, or pick the other side to
            change your vote.
          </p>
        ) : null}

        <p className="cc-micro cc-relation-detail__label-note">Currently: {CONFIDENCE_LABEL[state]}</p>
      </div>
    </div>
  );
}
