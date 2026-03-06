import React from 'react';

import { isFunction } from '@aws-amplify/ui';

interface UsePaginateState<T> {
  currentPage: number;
  highestPageVisited: number;
  handlePaginate: (page: number) => void;
  handleReset: () => void;
  pageItems: T[];
}

interface UsePaginateInput<T> {
  items?: T[];
  onPaginate?: (page?: number) => void;
  page?: number;
  pageSize: number;
}

export const usePaginate = <T>({
  items,
  onPaginate,
  page = 1,
  pageSize,
}: UsePaginateInput<T>): UsePaginateState<T> => {
  const [currentPage, setCurrentPage] = React.useState(page);
  const visitedRef = React.useRef(page);

  const handleReset = React.useRef(() => {
    setCurrentPage(page);
    // set `visitedRef` to initially provided `page`
    visitedRef.current = page;
  }).current;

  return React.useMemo((): UsePaginateState<T> => {
    const hasItems = Array.isArray(items);
    const totalItems = hasItems ? items.length : 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    // Auto-adjust current page if it's beyond available pages
    // For server-side pagination, don't auto-adjust if onPaginate callback is provided
    let adjustedCurrentPage = currentPage;
    if (currentPage > totalPages && !isFunction(onPaginate)) {
      adjustedCurrentPage = totalPages;
      setCurrentPage(adjustedCurrentPage);
    }

    const highestPageVisited = visitedRef.current;

    const isFirstPage = adjustedCurrentPage === 1;
    const start = isFirstPage ? 0 : (adjustedCurrentPage - 1) * pageSize;
    const end = isFirstPage ? pageSize : adjustedCurrentPage * pageSize;
    const pageItems = hasItems ? items.slice(start, end) : [];

    return {
      currentPage: adjustedCurrentPage,
      handlePaginate: (page) => {
        if (page < 1) return;

        // For server-side pagination, allow going beyond totalPages if onPaginate is provided
        if (page > totalPages && !isFunction(onPaginate)) return;

        if (isFunction(onPaginate)) onPaginate(page);

        if (page > adjustedCurrentPage && page > highestPageVisited)
          visitedRef.current = page;

        setCurrentPage(page);
      },
      handleReset,
      highestPageVisited,
      pageItems,
    };
  }, [currentPage, handleReset, items, onPaginate, pageSize]);
};
