import type { ReactNode } from "react";
import { TabRootScreen } from "./TabRootScreen";
import { DiscoverScreen } from "./DiscoverScreen";
import type { TabId } from "../../nav/types";

export const TAB_ROOTS: Record<TabId, () => ReactNode> = {
  discover: () => <DiscoverScreen />,
  lineage: () => <TabRootScreen tabLabel="Lineage" pushedTitle="Relation Detail" />,
  cabinet: () => <TabRootScreen tabLabel="My Cabinet" pushedTitle="Bottle Detail" />,
  trade: () => <TabRootScreen tabLabel="Trade" pushedTitle="Listing" />,
  you: () => <TabRootScreen tabLabel="You" pushedTitle="Settings" />,
};
