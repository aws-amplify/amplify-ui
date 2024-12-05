import React from 'react';

import { Pagination } from '../composables/Pagination';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { usePagination } from './hooks/usePagination';

export const PaginationControl = (): React.JSX.Element => {
  const props = usePagination();

  const Resolved = useResolvedComposable(Pagination, 'Pagination');

  return <Resolved {...props} />;
};
