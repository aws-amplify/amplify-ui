import React from 'react';

interface UsePaginate {
  currentPage: number;
  handlePaginateNext: (input: {
    resultCount: number;
    hasNextToken: boolean;
  }) => void;
  handlePaginatePrevious: (input?: {}) => void;
  handleReset: () => void;
  range: [start: number, end: number];
}

export const usePaginate = ({
  onPaginateNext,
  onPaginatePrevious,
  pageSize,
}: {
  onPaginateNext?: () => void;
  onPaginatePrevious?: () => void;
  pageSize: number;
}): UsePaginate => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleReset = React.useRef(() => {
    setCurrentPage(1);
  }).current;

  return React.useMemo(() => {
    const isInitialPage = currentPage === 1;
    const start = isInitialPage ? 0 : (currentPage - 1) * pageSize;
    const end = isInitialPage ? pageSize : currentPage * pageSize;
    return {
      currentPage,
      handlePaginateNext: (input) => {
        const { hasNextToken, resultCount } = input;
        const highestPageVisited = Math.round(resultCount / pageSize);
        const shouldPaginate =
          highestPageVisited === currentPage && hasNextToken;

        if (shouldPaginate && typeof onPaginateNext === 'function') {
          onPaginateNext();
        }
        setCurrentPage((prev) => prev + 1);
      },
      handlePaginatePrevious: () => {
        if (typeof onPaginatePrevious === 'function') onPaginatePrevious();

        setCurrentPage((prev) => prev - 1);
      },
      handleReset,
      range: [start, end],
    };
  }, [currentPage, handleReset, onPaginateNext, onPaginatePrevious, pageSize]);
};
