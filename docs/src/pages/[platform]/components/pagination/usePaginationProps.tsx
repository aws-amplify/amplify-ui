import * as React from 'react';
import { Pagination, PaginationProps } from '@aws-amplify/ui-react';
import { PaginationPropControlsProps } from './PaginationPropControls';
import { demoState } from '@/utils/demoState';

interface UsePaginationProps {
  (initialValues: PaginationProps): PaginationPropControlsProps;
}

export const usePaginationProps: UsePaginationProps = (initialValues) => {
  const [currentPage, setCurrentPage] = React.useState<
    PaginationProps['currentPage']
  >(initialValues.currentPage);
  const [totalPages, setTotalPages] = React.useState<
    PaginationProps['totalPages']
  >(initialValues.totalPages);
  const [siblingCount, setSiblingCount] = React.useState<
    PaginationProps['siblingCount']
  >(initialValues.siblingCount);
  const [hasMorePages, setHasMorePages] = React.useState<
    PaginationProps['hasMorePages']
  >(initialValues.hasMorePages);

  const onNext = React.useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const onPrevious = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const onChange = React.useCallback(
    (pageIndex) => setCurrentPage(pageIndex),
    []
  );

  React.useEffect(() => {
    demoState.set(Pagination.displayName, {
      currentPage,
      totalPages,
      siblingCount,
      hasMorePages,
    });
  }, [currentPage, totalPages, siblingCount, hasMorePages]);

  return React.useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      siblingCount,
      setSiblingCount,
      hasMorePages,
      setHasMorePages,
      onNext,
      onPrevious,
      onChange,
    }),
    [
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      siblingCount,
      setSiblingCount,
      hasMorePages,
      setHasMorePages,
      onNext,
      onPrevious,
      onChange,
    ]
  );
};
