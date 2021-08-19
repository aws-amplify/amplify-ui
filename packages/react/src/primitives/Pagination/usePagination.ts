import { useCallback, useState } from 'react';

import { UsePaginationProps, UsePaginationResult } from '../types/pagination';

export const usePagination = (
  props: UsePaginationProps
): UsePaginationResult => {
  let { currentPage: initialPage, totalPages, siblingCount = 1 } = props;

  // The current page should not be less than 1
  initialPage = Math.max(initialPage, 1);
  // The sibling count should not be less than 1
  siblingCount = Math.max(siblingCount, 1);
  // The total pages should be always greater than current page
  totalPages = Math.max(initialPage, totalPages);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const onNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const onPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const onChange = useCallback((newPage: number, prevPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return {
    currentPage,
    totalPages,
    siblingCount,
    onNext,
    onPrevious,
    onChange,
  };
};
