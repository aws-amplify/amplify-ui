import React from 'react';

import { Pagination } from '../composables/Pagination';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useControlsContext } from './context';

export const PaginationControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { data } = useControlsContext();

  const ResolvedPagination = useResolvedComposable(Pagination, 'Pagination');

  if (!data?.paginationData) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedPagination {...data.paginationData} />
    </ViewElement>
  );
};
