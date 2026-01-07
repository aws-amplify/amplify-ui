import React from 'react';
import type { ExtendedActionConfigs } from '../../actions';
import type { StorageBrowserViews } from '../types';
import type { ViewsContextType } from './types';
import { getViews } from './getViews';
import { ActionViewsContext } from './actionViews';
import { PrimaryViewsContext } from './primaryViews';

export function ViewsProvider({
  children,
  views,
  actions,
}: {
  children?: React.ReactNode;
  actions?: ExtendedActionConfigs;
  views?: StorageBrowserViews;
}): React.JSX.Element {
  const { custom } = actions ?? {};

  const value = React.useMemo(() => getViews(views, custom), [custom, views]);

  return (
    <PrimaryViewsContext.Provider value={value}>
      <ActionViewsContext.Provider value={value}>
        {children}
      </ActionViewsContext.Provider>
    </PrimaryViewsContext.Provider>
  );
}

export function useViews(): ViewsContextType {
  return {
    primary: React.useContext(PrimaryViewsContext).primary,
    action: React.useContext(ActionViewsContext).action,
  };
}
