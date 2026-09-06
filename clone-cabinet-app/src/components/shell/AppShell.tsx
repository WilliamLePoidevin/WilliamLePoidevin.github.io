import type { ReactNode } from "react";
import { useNav } from "../../nav/NavProvider";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { SideRail } from "./SideRail";
import { ScreenTransition } from "./ScreenTransition";
import "./AppShell.css";

interface AppShellProps {
  wide: boolean;
  /** Renders the active tab's root content (depth 1, empty stack). */
  tabRoots: Record<string, () => ReactNode>;
}

export function AppShell({ wide, tabRoots }: AppShellProps) {
  const { activeTab, activeFrame } = useNav();
  const contentKey = activeFrame?.key ?? `tab:${activeTab}`;
  const content = activeFrame ? activeFrame.render() : tabRoots[activeTab]?.();

  return (
    <div className={`cc-appshell${wide ? " cc-appshell--wide" : ""}`}>
      {wide ? <SideRail /> : null}
      <div className="cc-appshell__column">
        <TopBar />
        <ScreenTransition contentKey={contentKey}>{content}</ScreenTransition>
        {wide ? null : <BottomNav />}
      </div>
    </div>
  );
}
