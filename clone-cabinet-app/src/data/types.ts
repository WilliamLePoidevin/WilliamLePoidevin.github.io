// Matches docs/design/clone-cabinet/data/*.json exactly — see INTEGRATION_GUIDE.md Section 2
// for the full field-by-field mapping and Section 3 for which fields are null and why.
export interface Fragrance {
  id: string;
  name: string;
  house: string | null;
  houseId: string | null;
  isDupe: boolean;
  year: number | null;
  concentration: string | null;
  accords: string[];
  score: number | null;
  image: string | null;
  thesis: string | null;
  longevity: string | null;
  projection: string | null;
  sillage: string | null;
  valueScore: number | null;
  owners: number | null;
  traders: number | null;
  reviews: number | null;
  family: string | null;
  region: string | null;
  price: number | null;
}

export interface House {
  id: string;
  name: string;
  region: string | null;
  founded: number | null;
  count: number;
  note: string | null;
}

export interface LineageRelation {
  id: string;
  relation: "inspiration" | "interpretation";
  verified: boolean;
  confidence: number;
  confirmVotes: number;
  disputeVotes: number;
  source: string;
  disputed: boolean;
}

export type LineageMap = Record<string, LineageRelation[]>;
