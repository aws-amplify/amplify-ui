import * as React from 'react';

export interface TabsContextInterface {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  activeTab: '',
  setActiveTab: () => {},
});
