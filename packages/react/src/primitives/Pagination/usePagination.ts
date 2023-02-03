import * as React from 'react';

import { UsePaginationProps, UsePaginationResult } from '../types/pagination';

export const usePagination = (
  props: UsePaginationProps
): UsePaginationResult => {
  const {
    currentPage: initialPage = 1,
    totalPages,
    hasMorePages = false,
    siblingCount = 1,
  } = props;

  // The current page should not be less than 1
  const sanitizedInitialPage = Math.max(initialPage, 1);

  // The total pages should be always greater than current page
  const sanitizedTotalPages = Math.max(sanitizedInitialPage, totalPages);
  const [currentPage, setCurrentPage] = React.useState(sanitizedInitialPage);

  // Reset current page if initialPage or totalPages changes
  React.useEffect(() => {
    setCurrentPage(sanitizedInitialPage);
  }, [sanitizedInitialPage, sanitizedTotalPages]);

  const onNext = React.useCallback(() => {
    if (currentPage < sanitizedTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, sanitizedTotalPages]);

  const onPrevious = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const onChange = React.useCallback((newPageIndex?: number) => {
    if (typeof newPageIndex === 'number') {
      setCurrentPage(newPageIndex);
    }
  }, []);

  return {
    currentPage,
    hasMorePages,
    onChange,
    onNext,
    onPrevious,
    // The sibling count should not be less than 1
    siblingCount: Math.max(siblingCount, 1),
    totalPages: sanitizedTotalPages,
  };
};
