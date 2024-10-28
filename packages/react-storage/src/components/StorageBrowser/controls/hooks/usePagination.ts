import React from 'react';
import { useControlsContext } from '../../controls/context';

interface UsePagination {
  currentPage: number;
  hasMorePages: boolean;
  handlePaginate: (page: number) => void;
  highestPageVisited: number;
}

export const usePagination = (): UsePagination | null => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data } = useControlsContext();

  if (!data?.pagination) {
    return null;
  }

  const { hasMorePages, onPaginate, pageSize, resultCount } = data.pagination;

  const highestPageVisited = Math.round(resultCount / pageSize);

  return {
    currentPage,
    handlePaginate: (page) => {
      const shouldPaginate = page >= 1 && page <= highestPageVisited;
      if (shouldPaginate) {
        if (typeof onPaginate === 'function') onPaginate();
        setCurrentPage(page);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Page is out of bounds');
        setCurrentPage(1);
      }
    },
    hasMorePages,
    highestPageVisited,
  };
};
