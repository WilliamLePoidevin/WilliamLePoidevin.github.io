// Deterministic string hash (djb2). Used to derive per-record visual variation (e.g.
// BottlePortrait's placeholder tint) from a stable id — never randomised, so the same
// fragrance always renders the same way.
export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

/** Maps a hash to a value in [min, max]. */
export function hashToRange(input: string, min: number, max: number): number {
  const h = hashString(input);
  return min + (h % (max - min + 1));
}

/** Archive code from a real id — e.g. "cc-759f5edd" -> "CC / 759F5". Never a fabricated
    sequential number: it's a display formatting of the actual id, not invented data. */
export function archiveCode(id: string): string {
  const stripped = id.replace(/[^a-z0-9]/gi, "").toUpperCase();
  const digits = stripped.replace(/^CC/, "");
  return `CC / ${digits.slice(0, 5) || stripped.slice(0, 5)}`;
}
