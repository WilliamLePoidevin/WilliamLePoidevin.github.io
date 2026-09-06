import { useNav } from "../../nav/NavProvider";
import { Button, EmptyState } from "../../components/primitives";
import "./TabRootScreen.css";

interface TabRootScreenProps {
  tabLabel: string;
  pushedTitle: string;
}

// Phase 3 is shell + navigation only — no domain components or real screens yet (those are
// Phase 4/5). This stub exists to prove the nav mechanics work: each tab keeps its own back
// stack, and a pushed screen's TopBar title reads as that stack's own, not the tab root's.
export function TabRootScreen({ tabLabel, pushedTitle }: TabRootScreenProps) {
  const { push } = useNav();

  return (
    <div className="cc-tab-root">
      <EmptyState
        title={`${tabLabel} — not built yet`}
        body="Phase 3 wires the nav shell only. Domain components and real screens are Phase 4-5."
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              push(pushedTitle, () => (
                <div className="cc-tab-root">
                  <EmptyState
                    title={pushedTitle}
                    body="A pushed screen, inside this tab's own back stack. Use the back arrow to pop."
                  />
                </div>
              ))
            }
          >
            Push a screen
          </Button>
        }
      />
    </div>
  );
}
