import React from 'react';

import { DataTable } from '../components';

import { useDataTable } from './hooks/useDataTable';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const DataTableControl = (): React.JSX.Element => {
  const props = useDataTable();

  const Resolved = useResolvedComposable(DataTable, 'DataTable');

  return <Resolved {...props} />;
};
