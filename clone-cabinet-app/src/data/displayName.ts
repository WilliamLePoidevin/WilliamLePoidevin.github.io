import { useCallback, useState } from "react";

const STORAGE_KEY = "cc-display-name";
export const DEFAULT_DISPLAY_NAME = "You";

function readStored(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_DISPLAY_NAME;
  } catch {
    return DEFAULT_DISPLAY_NAME;
  }
}

function writeStored(name: string) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // Non-fatal: the name just won't persist this session.
  }
}

// Local to this browser, same as everything else here — there's no account system for a name
// to live on. Read fresh on mount so the Trade tab (which labels your own listings with this
// name) picks up a change made from You/Settings without needing a shared context.
export function useDisplayName() {
  const [name, setNameState] = useState<string>(readStored);

  const setName = useCallback((next: string) => {
    const trimmed = next.trim() || DEFAULT_DISPLAY_NAME;
    setNameState(trimmed);
    writeStored(trimmed);
  }, []);

  const clear = useCallback(() => {
    setNameState(DEFAULT_DISPLAY_NAME);
    writeStored(DEFAULT_DISPLAY_NAME);
  }, []);

  return { name, setName, clear };
}
