import * as React from 'react';

import { UsePaginationProps, UsePaginationResult } from '../types/pagination';

export const usePagination = (
  props: UsePaginationProps
): UsePaginationResult => {
  let {
    currentPage: initialPage = 1,
    totalPages,
    hasMorePages = false,
    siblingCount = 1,
  } = props;

  // The current page should not be less than 1
  initialPage = Math.max(initialPage, 1);
  // The sibling count should not be less than 1
  siblingCount = Math.max(siblingCount, 1);
  // The total pages should be always greater than current page
  totalPages = Math.max(initialPage, totalPages);
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  // Reset current page if initialPage or totalPages changes
  React.useEffect(() => setCurrentPage(initialPage), [initialPage, totalPages]);

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

  const onChange = React.useCallback((newPage: number, prevPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return {
    currentPage,
    totalPages,
    hasMorePages,
    siblingCount,
    onNext,
    onPrevious,
    onChange,
  };
};
