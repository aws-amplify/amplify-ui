import * as React from 'react';

export interface TabsContextInterface {
  activeTab: string;
  isLazy?: boolean;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  activeTab: '',
  setActiveTab: () => {},
});
