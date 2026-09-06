import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Vote = "confirm" | "dispute";

const STORAGE_KEY = "cc-lineage-votes";

function readStored(): Record<string, Vote> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Vote>) : {};
  } catch {
    return {};
  }
}

function writeStored(votes: Record<string, Vote>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  } catch {
    // Non-fatal: this session's vote just won't persist.
  }
}

interface LineageVotesContextValue {
  /** This browser's own vote on a relation, or undefined if it hasn't voted. */
  getVote: (relationKey: string) => Vote | undefined;
  /** One vote per browser per relation, changeable — CLONE_CABINET_UX_SPEC.md Section 11.1. */
  setVote: (relationKey: string, vote: Vote) => void;
  /**
   * The seeded confirm/dispute counts plus this browser's own vote layered on top. There is no
   * backend here — every visitor sees the same seed from lineage.json, and only their own vote
   * (stored locally) moves the count they see. This is an honest, real, working version of the
   * mechanic for one browser; it is NOT live-syncing across users, because nothing in this
   * static site can aggregate votes across visitors. That needs a real backend — see
   * CLONE_CABINET_UX_SPEC.md Section 11's own framing of this as the thing a live service must
   * eventually own.
   */
  getAdjustedCounts: (relationKey: string, seedConfirm: number, seedDispute: number) => { confirm: number; dispute: number };
  /** How many relations this browser has voted on — a real, local count. */
  voteCount: number;
  clearAll: () => void;
}

const LineageVotesContext = createContext<LineageVotesContextValue | null>(null);

export function LineageVotesProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<Record<string, Vote>>(readStored);

  const getVote = useCallback((relationKey: string) => votes[relationKey], [votes]);

  const setVote = useCallback((relationKey: string, vote: Vote) => {
    setVotes((current) => {
      // Voting the same way again is a no-op; the buttons are toggles, not stackable clicks.
      const next = current[relationKey] === vote ? { ...current } : { ...current, [relationKey]: vote };
      if (current[relationKey] === vote) delete next[relationKey];
      writeStored(next);
      return next;
    });
  }, []);

  const getAdjustedCounts = useCallback(
    (relationKey: string, seedConfirm: number, seedDispute: number) => {
      const vote = votes[relationKey];
      return {
        confirm: seedConfirm + (vote === "confirm" ? 1 : 0),
        dispute: seedDispute + (vote === "dispute" ? 1 : 0),
      };
    },
    [votes]
  );

  const clearAll = useCallback(() => {
    writeStored({});
    setVotes({});
  }, []);

  const voteCount = useMemo(() => Object.keys(votes).length, [votes]);

  const value = useMemo(
    () => ({ getVote, setVote, getAdjustedCounts, voteCount, clearAll }),
    [getVote, setVote, getAdjustedCounts, voteCount, clearAll]
  );

  return <LineageVotesContext.Provider value={value}>{children}</LineageVotesContext.Provider>;
}

export function useLineageVotes(): LineageVotesContextValue {
  const ctx = useContext(LineageVotesContext);
  if (!ctx) throw new Error("useLineageVotes must be used within a LineageVotesProvider");
  return ctx;
}
