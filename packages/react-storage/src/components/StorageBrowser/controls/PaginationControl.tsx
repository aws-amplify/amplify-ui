import React from 'react';

import { Pagination } from '../composables/Pagination';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const PaginationControl = (): React.JSX.Element => {
  const { data } = useControlsContext();

  const Resolved = useResolvedComposable(Pagination, 'Pagination');

  return <Resolved {...data.paginationData} />;
};
