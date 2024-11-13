import React from 'react';

import { DataTable } from '../composables/DataTable';
import { useDataTable } from './hooks/useDataTable';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const DataTableControl = (): React.JSX.Element | null => {
  const props = useDataTable();

  const ResolvedDataTable = useResolvedComposable(DataTable, 'DataTable');

  return <ResolvedDataTable {...props} />;
};
