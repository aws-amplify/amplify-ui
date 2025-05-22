import React from 'react';

import { DataRefresh } from '../components/composables/DataRefresh';

import { useDataRefresh } from './hooks/useDataRefresh';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const DataRefreshControl = (): React.JSX.Element => {
  const props = useDataRefresh();
  const Resolved = useResolvedComposable(DataRefresh, 'DataRefresh');

  return <Resolved {...props} />;
};
