import React from 'react';

import { DataRefresh } from '../composables/DataRefresh';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useDataRefresh } from './hooks/useDataRefresh';

export const DataRefreshControl = (): React.JSX.Element => {
  const props = useDataRefresh();
  const ResolvedDataRefresh = useResolvedComposable(DataRefresh, 'DataRefresh');

  return (
    // <ViewElement className={className}>
    <ResolvedDataRefresh {...props} />
    // </ViewElement>
  );
};
