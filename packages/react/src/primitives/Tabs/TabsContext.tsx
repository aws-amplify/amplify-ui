import * as React from 'react';

export interface TabsContextInterface {
  activeTab: string;
  isLazy?: boolean;
  groupId: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  groupId: '',
  activeTab: '',
  setActiveTab: () => {},
});
