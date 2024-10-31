import React from 'react';

interface UsePaginate {
  currentPage: number;
  highestPageVisited: number;
  handlePaginate: (page: number) => void;
  handleReset: () => void;
  range: [start: number, end: number];
}

export const usePaginate = ({
  onPaginate,
  pageSize,
  resultCount,
}: {
  onPaginate?: () => void;
  pageSize: number;
  resultCount: number;
}): UsePaginate => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleReset = React.useRef(() => {
    setCurrentPage(1);
  }).current;

  return React.useMemo((): UsePaginate => {
    const highestPageVisited = Math.ceil(resultCount / pageSize);
    const isFirstPage = currentPage === 1;
    const start = isFirstPage ? 0 : (currentPage - 1) * pageSize;
    const end = isFirstPage ? pageSize : currentPage * pageSize;

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
      handleReset,
      highestPageVisited,
      range: [start, end],
    };
  }, [currentPage, handleReset, onPaginate, pageSize, resultCount]);
};
