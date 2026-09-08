import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Vote = "confirm" | "dispute";
type LogEventType = Vote | "retract";

interface VoteEvent {
  type: LogEventType;
  /** ISO timestamp of this browser's own local clock when the choice was made. */
  at: string;
}

type VoteLog = Record<string, VoteEvent[]>;

export interface VoteHistoryPoint {
  /** null for the seeded starting point — the dataset carries no real seed timestamp. */
  at: string | null;
  confirm: number;
  dispute: number;
}

const LOG_KEY = "cc-lineage-vote-log";
const LEGACY_KEY = "cc-lineage-votes"; // pre-history format: one stored choice, no timeline

function readLog(): VoteLog {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (raw) return JSON.parse(raw) as VoteLog;
  } catch {
    return {};
  }
  // One-time migration: turn the old single-choice snapshot into a one-entry log so an
  // existing vote isn't silently lost when this ships.
  try {
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (!legacyRaw) return {};
    const legacy = JSON.parse(legacyRaw) as Record<string, Vote>;
    const migrated: VoteLog = {};
    const at = new Date().toISOString();
    for (const [key, vote] of Object.entries(legacy)) migrated[key] = [{ type: vote, at }];
    return migrated;
  } catch {
    return {};
  }
}

function writeLog(log: VoteLog) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(log));
  } catch {
    // Non-fatal: this session's vote just won't persist.
  }
}

function currentVote(events: VoteEvent[] | undefined): Vote | undefined {
  const last = events?.[events.length - 1];
  if (!last || last.type === "retract") return undefined;
  return last.type;
}

interface LineageVotesContextValue {
  /** This browser's own vote on a relation, or undefined if it hasn't voted (or undid it). */
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
  /**
   * The running confirm/dispute balance over time — Section 11.2's confidence-history
   * sparkline. Starts at the seed (no real timestamp exists for that point, so `at` is null)
   * and adds one real, timestamped point per local vote/undo/change this browser has actually
   * made. Same honesty limit as getAdjustedCounts: only this browser's own history is real
   * data here, never fabricated activity from other collectors.
   */
  getVoteHistory: (relationKey: string, seedConfirm: number, seedDispute: number) => VoteHistoryPoint[];
  /** How many relations this browser has voted on — a real, local count. */
  voteCount: number;
  clearAll: () => void;
}

const LineageVotesContext = createContext<LineageVotesContextValue | null>(null);

export function LineageVotesProvider({ children }: { children: ReactNode }) {
  const [log, setLog] = useState<VoteLog>(readLog);

  const getVote = useCallback((relationKey: string) => currentVote(log[relationKey]), [log]);

  const setVote = useCallback((relationKey: string, vote: Vote) => {
    setLog((current) => {
      const events = current[relationKey] ?? [];
      // Voting the same way again is a toggle-off (an undo), not a stackable click.
      const type: LogEventType = currentVote(events) === vote ? "retract" : vote;
      const next = { ...current, [relationKey]: [...events, { type, at: new Date().toISOString() }] };
      writeLog(next);
      return next;
    });
  }, []);

  const getAdjustedCounts = useCallback(
    (relationKey: string, seedConfirm: number, seedDispute: number) => {
      const vote = currentVote(log[relationKey]);
      return {
        confirm: seedConfirm + (vote === "confirm" ? 1 : 0),
        dispute: seedDispute + (vote === "dispute" ? 1 : 0),
      };
    },
    [log]
  );

  const getVoteHistory = useCallback(
    (relationKey: string, seedConfirm: number, seedDispute: number): VoteHistoryPoint[] => {
      const points: VoteHistoryPoint[] = [{ at: null, confirm: seedConfirm, dispute: seedDispute }];
      let active: Vote | undefined;
      for (const event of log[relationKey] ?? []) {
        active = event.type === "retract" ? undefined : event.type;
        points.push({
          at: event.at,
          confirm: seedConfirm + (active === "confirm" ? 1 : 0),
          dispute: seedDispute + (active === "dispute" ? 1 : 0),
        });
      }
      return points;
    },
    [log]
  );

  const clearAll = useCallback(() => {
    writeLog({});
    setLog({});
    try {
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      // Non-fatal.
    }
  }, []);

  const voteCount = useMemo(
    () => Object.values(log).filter((events) => currentVote(events) !== undefined).length,
    [log]
  );

  const value = useMemo(
    () => ({ getVote, setVote, getAdjustedCounts, getVoteHistory, voteCount, clearAll }),
    [getVote, setVote, getAdjustedCounts, getVoteHistory, voteCount, clearAll]
  );

  return <LineageVotesContext.Provider value={value}>{children}</LineageVotesContext.Provider>;
}

export function useLineageVotes(): LineageVotesContextValue {
  const ctx = useContext(LineageVotesContext);
  if (!ctx) throw new Error("useLineageVotes must be used within a LineageVotesProvider");
  return ctx;
}
