import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { supabase, supabaseConfigured } from "./supabaseClient";
import { getVoterId } from "./voterId";

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

interface Counts {
  confirm: number;
  dispute: number;
}

interface LineageVotesContextValue {
  /** This browser's own vote on a relation, or undefined if it hasn't voted. */
  getVote: (relationKey: string) => Vote | undefined;
  /** One vote per browser per relation, changeable — CLONE_CABINET_UX_SPEC.md Section 11.1. */
  setVote: (relationKey: string, vote: Vote) => void;
  /**
   * v1.2: when Supabase is configured (see supabaseClient.ts), this is a REAL cross-device
   * tally — every voter's row, counted server-side, never trusted from the client. Falls back
   * to the original local-only approximation (seed counts + this browser's own vote layered
   * on top) when no backend is configured, so the app still works with zero setup.
   */
  getAdjustedCounts: (relationKey: string, seedConfirm: number, seedDispute: number) => Counts;
  /** How many relations this browser has voted on — a real, local count either way. */
  voteCount: number;
  clearAll: () => void;
}

const LineageVotesContext = createContext<LineageVotesContextValue | null>(null);

export function LineageVotesProvider({ children }: { children: ReactNode }) {
  const [myVotes, setMyVotes] = useState<Record<string, Vote>>(readStored);
  const [remoteCounts, setRemoteCounts] = useState<Record<string, Counts>>({});
  const inFlight = useRef<Set<string>>(new Set());
  const voterId = useRef<string>(getVoterId());

  const getVote = useCallback((relationKey: string) => myVotes[relationKey], [myVotes]);

  const fetchCounts = useCallback((relationKey: string) => {
    if (!supabase || inFlight.current.has(relationKey)) return;
    inFlight.current.add(relationKey);
    (async () => {
      try {
        const { data, error } = await supabase.rpc("get_vote_counts", { p_relation_key: relationKey });
        if (error) {
          console.warn("Clone Cabinet: get_vote_counts failed", relationKey, error.message);
          return;
        }
        const row = Array.isArray(data) ? data[0] : data;
        if (row) {
          setRemoteCounts((current) => ({
            ...current,
            [relationKey]: { confirm: Number(row.confirm_count) || 0, dispute: Number(row.dispute_count) || 0 },
          }));
        }
      } finally {
        inFlight.current.delete(relationKey);
      }
    })();
  }, []);

  const setVote = useCallback(
    (relationKey: string, vote: Vote) => {
      setMyVotes((current) => {
        // Voting the same way again is a no-op; the buttons are toggles, not stackable clicks.
        const next = current[relationKey] === vote ? { ...current } : { ...current, [relationKey]: vote };
        if (current[relationKey] === vote) delete next[relationKey];
        writeStored(next);
        return next;
      });

      if (supabase) {
        supabase
          .rpc("cast_lineage_vote", { p_relation_key: relationKey, p_voter_id: voterId.current, p_vote_type: vote })
          .then(({ data, error }) => {
            if (error) {
              console.warn("Clone Cabinet: cast_lineage_vote failed", relationKey, error.message);
              return;
            }
            const row = Array.isArray(data) ? data[0] : data;
            if (row) {
              setRemoteCounts((current) => ({
                ...current,
                [relationKey]: { confirm: Number(row.confirm_count) || 0, dispute: Number(row.dispute_count) || 0 },
              }));
            }
          });
      }
    },
    []
  );

  const getAdjustedCounts = useCallback(
    (relationKey: string, seedConfirm: number, seedDispute: number): Counts => {
      if (supabaseConfigured) {
        const cached = remoteCounts[relationKey];
        if (cached) return cached;
        fetchCounts(relationKey);
        return { confirm: seedConfirm, dispute: seedDispute };
      }
      const vote = myVotes[relationKey];
      return {
        confirm: seedConfirm + (vote === "confirm" ? 1 : 0),
        dispute: seedDispute + (vote === "dispute" ? 1 : 0),
      };
    },
    [myVotes, remoteCounts, fetchCounts]
  );

  const clearAll = useCallback(() => {
    writeStored({});
    setMyVotes({});
    setRemoteCounts({});
    if (supabase) {
      supabase.rpc("clear_voter_votes", { p_voter_id: voterId.current }).then(({ error }) => {
        if (error) console.warn("Clone Cabinet: clear_voter_votes failed", error.message);
      });
    }
  }, []);

  const voteCount = useMemo(() => Object.keys(myVotes).length, [myVotes]);

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
