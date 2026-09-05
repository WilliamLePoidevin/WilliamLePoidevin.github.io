import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COLORWAYS, DEFAULT_COLORWAY_ID, getColorway, type Mode } from "./colorways";

const MODE_KEY = "cc-mode";
const COLORWAY_KEY = "cc-colorway";

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    // localStorage can throw (private browsing, disabled storage) — fall back silently.
    return null;
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Non-fatal: theme choice just won't persist this session.
  }
}

interface ThemeContextValue {
  mode: Mode;
  colorwayId: string;
  setMode: (mode: Mode) => void;
  setColorwayId: (id: string) => void;
  toggleMode: () => void;
  colorways: typeof COLORWAYS;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    const stored = readStored(MODE_KEY);
    return stored === "day" ? "day" : "night";
  });
  const [colorwayId, setColorwayIdState] = useState<string>(() => {
    const stored = readStored(COLORWAY_KEY);
    return stored && getColorway(stored) ? stored : DEFAULT_COLORWAY_ID;
  });

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    writeStored(MODE_KEY, next);
  }, []);

  const setColorwayId = useCallback(
    (id: string) => {
      const meta = getColorway(id);
      setColorwayIdState(meta.id);
      writeStored(COLORWAY_KEY, meta.id);
      // Choosing a dark-only finish returns Display mode to Night — the board has no
      // daylight ground to show.
      if (!meta.publishesDay && mode === "day") {
        setMode("night");
      }
    },
    [mode, setMode]
  );

  const toggleMode = useCallback(() => {
    setMode(mode === "night" ? "day" : "night");
  }, [mode, setMode]);

  useEffect(() => {
    writeStored(MODE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, colorwayId, setMode, setColorwayId, toggleMode, colorways: COLORWAYS }),
    [mode, colorwayId, setMode, setColorwayId, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {/* Desk root carries data-mode; the shell carries data-colorway one level in. They
          cannot share an element — see colorway-bridge.css. */}
      <div className="cc-root" data-mode={mode}>
        <div className="cc-shell" data-colorway={colorwayId}>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
