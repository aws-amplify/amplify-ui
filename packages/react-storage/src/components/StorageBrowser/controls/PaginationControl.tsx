import React from 'react';

import { Pagination } from '../composables/Pagination';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { usePagination } from './hooks/usePagination';

export const PaginationControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = usePagination();

  const ResolvedPagination = useResolvedComposable(Pagination, 'Pagination');

  if (!props) {
    return null;
  }

  const {
    currentPage,
    disableNext,
    disablePrevious,
    handlePaginateNext,
    handlePaginatePrevious,
  } = props;

  return (
    <ViewElement className={className}>
      <ResolvedPagination
        currentPage={currentPage}
        handlePaginateNext={handlePaginateNext}
        handlePaginatePrevious={handlePaginatePrevious}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
      />
    </ViewElement>
  );
};
