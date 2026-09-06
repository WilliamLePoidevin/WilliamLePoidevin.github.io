import type { ReactNode } from "react";
import { TabRootScreen } from "./TabRootScreen";
import { DiscoverScreen } from "./DiscoverScreen";
import { CabinetScreen } from "./CabinetScreen";
import { LineageScreen } from "./LineageScreen";
import { TradeScreen } from "./TradeScreen";
import type { TabId } from "../../nav/types";

export const TAB_ROOTS: Record<TabId, () => ReactNode> = {
  discover: () => <DiscoverScreen />,
  lineage: () => <LineageScreen />,
  cabinet: () => <CabinetScreen />,
  trade: () => <TradeScreen />,
  you: () => <TabRootScreen tabLabel="You" pushedTitle="Settings" />,
};
