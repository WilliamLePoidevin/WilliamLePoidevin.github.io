const STORAGE_KEY = "cc-voter-id";

// The app has no accounts, so a "voter" for shared lineage-vote tallies is just a random id a
// browser generates once and keeps to itself — the same trust level (one identity per browser)
// the local-only version already had, now recognizable across a real backend instead of only
// within one browser's localStorage.
export function getVoterId(): string {
    try {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (existing) return existing;
        const id = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, id);
        return id;
    } catch {
        // Storage unavailable — generate one for this session only.
        return crypto.randomUUID();
    }
}
