import React from 'react';

import { DataTable } from '../composables/DataTable';
import { ViewElement } from '../context/elements';
import { useDataTable } from './hooks/useDataTable';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ControlProps } from './types';

export const DataTableControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useDataTable();

  const ResolvedDataTable = useResolvedComposable(DataTable, 'DataTable');

  if (!props) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedDataTable {...props} />
    </ViewElement>
  );
};
