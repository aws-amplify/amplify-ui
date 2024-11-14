import React from 'react';

import { isFunction } from '@aws-amplify/ui';

interface UsePaginate<T> {
  currentPage: number;
  highestPageVisited: number;
  onPaginate: (page: number) => void;
  handleReset: () => void;
  pageItems: T[];
}

interface UsePaginateProps<T> {
  hasNextToken: boolean;
  items: T[];
  paginateCallback?: () => void;
  pageSize: number;
}

export const usePaginate = <T>({
  hasNextToken,
  items,
  paginateCallback,
  pageSize,
}: UsePaginateProps<T>): UsePaginate<T> => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleReset = React.useRef(() => {
    setCurrentPage(1);
  }).current;

  return React.useMemo((): UsePaginate<T> => {
    const resultCount = Array.isArray(items) ? items.length : 0;
    const highestPageVisited = Math.ceil(resultCount / pageSize);
    const isFirstPage = currentPage === 1;
    const start = isFirstPage ? 0 : (currentPage - 1) * pageSize;
    const end = isFirstPage ? pageSize : currentPage * pageSize;
    const pageItems = Array.isArray(items) ? items.slice(start, end) : [];

    return {
      currentPage,
      onPaginate: (page) => {
        const shouldPaginate =
          page >= 1 && (page <= highestPageVisited || hasNextToken);
        if (shouldPaginate) {
          if (isFunction(paginateCallback)) paginateCallback();
          setCurrentPage(page);
        }
      },
      handleReset,
      highestPageVisited,
      pageItems,
    };
  }, [
    currentPage,
    handleReset,
    hasNextToken,
    items,
    paginateCallback,
    pageSize,
  ]);
};
