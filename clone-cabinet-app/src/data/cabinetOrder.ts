import { useCallback, useState } from "react";
import type { CabinetStatus } from "./cabinet";

const STORAGE_KEY = "cc-cabinet-order";

type OrderMap = Partial<Record<CabinetStatus, string[]>>;

function readStored(): OrderMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderMap) : {};
  } catch {
    return {};
  }
}

function writeStored(order: OrderMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Non-fatal: the custom order just won't persist.
  }
}

function reconcile(stored: string[], ids: string[]): string[] {
  const known = stored.filter((id) => ids.includes(id));
  const missing = ids.filter((id) => !known.includes(id));
  return [...known, ...missing];
}

// A collector's own manual shelf arrangement — display order only, kept separate from
// CabinetProvider since it's a presentation concern, not a field on a CabinetEntry record.
// Per status group, so reordering one shelf never touches another's arrangement.
export function useCabinetOrder() {
  const [order, setOrder] = useState<OrderMap>(readStored);

  // Stored order reconciled against the ids actually present in that shelf right now — a
  // removed bottle drops out and a newly added one lands at the end, so it self-heals rather
  // than needing manual repair as the cabinet changes.
  const resolve = useCallback((status: CabinetStatus, ids: string[]): string[] => reconcile(order[status] ?? [], ids), [
    order,
  ]);

  const moveEntry = useCallback((status: CabinetStatus, ids: string[], fragranceId: string, direction: "up" | "down") => {
    setOrder((current) => {
      const resolved = reconcile(current[status] ?? [], ids);
      const index = resolved.indexOf(fragranceId);
      const swapWith = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || swapWith < 0 || swapWith >= resolved.length) return current;
      const next = [...resolved];
      [next[index], next[swapWith]] = [next[swapWith], next[index]];
      const nextOrder = { ...current, [status]: next };
      writeStored(nextOrder);
      return nextOrder;
    });
  }, []);

  return { resolve, moveEntry };
}
