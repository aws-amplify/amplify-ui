import * as React from 'react';

export interface TabsContextInterface {
  activeTab: string;
  isLazy?: boolean;
  groupId?: string;
  whitespaceValue: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = React.createContext<TabsContextInterface>({
  groupId: '',
  activeTab: '',
  whitespaceValue: '-',
  setActiveTab: () => {},
});
