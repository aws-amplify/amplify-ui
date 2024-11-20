import React from 'react';

import { ExtendedActionConfigs } from '../actions';

import { Views, ViewsContextType } from './types';
import { DEFAULT_ACTION_VIEWS, DEFAULT_PRIMARY_VIEWS, getViews } from './utils';

export const ViewsContext = React.createContext<ViewsContextType>({
  primary: DEFAULT_PRIMARY_VIEWS,
  action: DEFAULT_ACTION_VIEWS,
});

export function ViewsProvider({
  children,
  views,
  actions,
}: {
  children?: React.ReactNode;
  actions?: ExtendedActionConfigs;
  views?: Views;
}): React.JSX.Element {
  const { custom } = actions ?? {};

  const value = React.useMemo(() => getViews(views, custom), [custom, views]);

  return (
    <ViewsContext.Provider value={value}>{children}</ViewsContext.Provider>
  );
}

export function useViews(): ViewsContextType {
  return React.useContext(ViewsContext);
}
