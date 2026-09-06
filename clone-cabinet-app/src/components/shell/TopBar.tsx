import { useNav } from "../../nav/NavProvider";
import { TABS } from "../../nav/types";
import { Icon } from "../primitives";
import "./TopBar.css";

// Wide mode hides the status bar and bottom nav per the handoff; TopBar stays but the caller
// is responsible for not rendering BottomNav in that layout (see AppShell).
export function TopBar() {
  const { activeTab, activeFrame, canPop, pop } = useNav();
  const tabLabel = TABS.find((t) => t.id === activeTab)?.label ?? "";
  const title = activeFrame?.title ?? tabLabel;

  return (
    <header className="cc-topbar cc-hairline">
      {canPop ? (
        <button type="button" className="cc-topbar__back" onClick={pop} aria-label="Back">
          <Icon name="chevron-left" tone="active" />
        </button>
      ) : (
        <span className="cc-topbar__spacer" aria-hidden="true" />
      )}
      <h1 className="cc-label cc-topbar__title">{title}</h1>
      <span className="cc-topbar__spacer" aria-hidden="true" />
    </header>
  );
}
