import type { ReactNode } from "react";
import { DiscoverScreen } from "./DiscoverScreen";
import { CabinetScreen } from "./CabinetScreen";
import { LineageScreen } from "./LineageScreen";
import { TradeScreen } from "./TradeScreen";
import { YouScreen } from "./YouScreen";
import type { TabId } from "../../nav/types";

export const TAB_ROOTS: Record<TabId, () => ReactNode> = {
  discover: () => <DiscoverScreen />,
  lineage: () => <LineageScreen />,
  cabinet: () => <CabinetScreen />,
  trade: () => <TradeScreen />,
  you: () => <YouScreen />,
};
