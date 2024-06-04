import * as React from 'react';

export interface TabsContextInterface {
  activeTab: string;
  isLazy?: boolean;
  groupID?: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  groupID: '',
  activeTab: '',
  setActiveTab: () => {},
});
