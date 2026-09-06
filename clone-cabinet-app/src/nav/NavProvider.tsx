import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { TAB_ORDER, type StackFrame, type TabId } from "./types";

type Transition =
  | { kind: "tab"; adjacent: boolean }
  | { kind: "push" }
  | { kind: "pop" };

interface NavContextValue {
  activeTab: TabId;
  stack: StackFrame[];
  /** Top of the active tab's stack, or null when showing the tab root. */
  activeFrame: StackFrame | null;
  transition: Transition;
  switchTab: (tab: TabId) => void;
  push: (title: string, render: () => ReactNode) => void;
  pop: () => void;
  canPop: boolean;
}

const NavContext = createContext<NavContextValue | null>(null);

const emptyStacks = () =>
  TAB_ORDER.reduce((acc, id) => ({ ...acc, [id]: [] as StackFrame[] }), {} as Record<TabId, StackFrame[]>);

let frameKeySeq = 0;

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("discover");
  const [stacks, setStacks] = useState<Record<TabId, StackFrame[]>>(emptyStacks);
  const [transition, setTransition] = useState<Transition>({ kind: "tab", adjacent: true });
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const switchTab = useCallback((tab: TabId) => {
    setActiveTab((current) => {
      if (tab === current) return current;
      const fromIndex = TAB_ORDER.indexOf(current);
      const toIndex = TAB_ORDER.indexOf(tab);
      setTransition({ kind: "tab", adjacent: Math.abs(fromIndex - toIndex) === 1 });
      return tab;
    });
  }, []);

  const push = useCallback((title: string, render: () => ReactNode) => {
    const key = `frame-${++frameKeySeq}`;
    setStacks((current) => ({
      ...current,
      [activeTabRef.current]: [...current[activeTabRef.current], { key, title, render }],
    }));
    setTransition({ kind: "push" });
  }, []);

  const pop = useCallback(() => {
    setStacks((current) => {
      const tab = activeTabRef.current;
      if (current[tab].length === 0) return current;
      return { ...current, [tab]: current[tab].slice(0, -1) };
    });
    setTransition({ kind: "pop" });
  }, []);

  const stack = stacks[activeTab];
  const activeFrame = stack.length > 0 ? stack[stack.length - 1] : null;

  const value = useMemo<NavContextValue>(
    () => ({
      activeTab,
      stack,
      activeFrame,
      transition,
      switchTab,
      push,
      pop,
      canPop: stack.length > 0,
    }),
    [activeTab, stack, activeFrame, transition, switchTab, push, pop]
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within a NavProvider");
  return ctx;
}
