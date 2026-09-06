import type { Fragrance, LineageMap, LineageRelation } from "./types";

// A handful of fragrances carry TWO separate relation entries pointing at the same related
// id — a real data artifact (the source research evidently logged the same pairing from two
// citations without merging them, e.g. cc-4d5f50b4 -> cc-52d4c0f5 at both 70% and 40%
// confidence). Rather than pick one citation and silently drop the other, or render a
// duplicate-keyed row, they're merged: vote counts summed (independent corroboration is a
// real, stronger signal) and both source citations kept.
export function mergeRelationsById(relations: LineageRelation[]): LineageRelation[] {
  const merged = new Map<string, LineageRelation>();
  for (const relation of relations) {
    const existing = merged.get(relation.id);
    if (!existing) {
      merged.set(relation.id, relation);
      continue;
    }
    merged.set(relation.id, {
      ...existing,
      confirmVotes: existing.confirmVotes + relation.confirmVotes,
      disputeVotes: existing.disputeVotes + relation.disputeVotes,
      disputed: existing.disputed || relation.disputed,
      verified: existing.verified || relation.verified,
      source: existing.source === relation.source ? existing.source : `${existing.source} Also: ${relation.source}`,
    });
  }
  return [...merged.values()];
}

// lineage.json is bidirectional by construction (INTEGRATION_GUIDE.md Section 1): a dupe's
// entry lists its original as "inspiration", and that original's own entry separately lists
// the dupe back as "interpretation" — two rows, one real-world pairing. Filtering to the dupe
// side's "inspiration" relations gives one canonical edge per pairing.
export interface LineageEdge {
  key: string;
  dupe: Fragrance;
  original: Fragrance;
  relation: LineageRelation;
}

export function getLineageEdges(
  fragrances: Fragrance[],
  lineage: LineageMap,
  fragrancesById: Map<string, Fragrance>
): LineageEdge[] {
  const edges: LineageEdge[] = [];
  for (const dupe of fragrances) {
    if (!dupe.isDupe) continue;
    const relations = mergeRelationsById(lineage[dupe.id] ?? []).filter((r) => r.relation === "inspiration");
    for (const relation of relations) {
      const original = fragrancesById.get(relation.id);
      if (!original) continue;
      edges.push({ key: `${dupe.id}:${original.id}`, dupe, original, relation });
    }
  }
  return edges;
}

export function searchLineageEdges(edges: LineageEdge[], query: string, limit: number): LineageEdge[] {
  const q = query.trim().toLowerCase();
  if (!q) return edges.slice(0, limit);
  const results: LineageEdge[] = [];
  for (const e of edges) {
    if (
      e.dupe.name.toLowerCase().includes(q) ||
      e.dupe.house?.toLowerCase().includes(q) ||
      e.original.name.toLowerCase().includes(q) ||
      e.original.house?.toLowerCase().includes(q)
    ) {
      results.push(e);
      if (results.length >= limit) break;
    }
  }
  return results;
}
