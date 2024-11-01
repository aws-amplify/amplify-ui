import React from 'react';

import { DataRefresh } from '../composables/DataRefresh';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useDataRefresh } from './hooks/useDataRefresh';

export const DataRefreshControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useDataRefresh();
  const ResolvedDataRefresh = useResolvedComposable(DataRefresh, 'DataRefresh');

  return (
    <ViewElement className={className}>
      <ResolvedDataRefresh {...props} />
    </ViewElement>
  );
};
