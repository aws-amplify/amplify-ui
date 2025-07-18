import React from 'react';

import { isFunction } from '@aws-amplify/ui';

const DEFAULT_PAGE_SIZE = 100;

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
  pageSize?: number;
}

export const usePaginate = <T>({
  items,
  onPaginate,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
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

    const highestPageVisited = visitedRef.current;

    const isFirstPage = currentPage === 1;
    const start = isFirstPage ? 0 : (currentPage - 1) * pageSize;
    const end = isFirstPage ? pageSize : currentPage * pageSize;
    const pageItems = hasItems ? items.slice(start, end) : [];

    return {
      currentPage,
      handlePaginate: (page) => {
        if (page < 1) return;

        if (isFunction(onPaginate)) onPaginate(page);

        if (page > currentPage && page > highestPageVisited)
          visitedRef.current = page;

        setCurrentPage(page);
      },
      handleReset,
      highestPageVisited,
      pageItems,
    };
  }, [currentPage, handleReset, items, onPaginate, pageSize]);
};
