import React from 'react';

interface UsePaginate {
  currentPage: number;
  handlePaginateNext: (input: {
    resultCount: number;
    hasNextToken: boolean;
  }) => void;
  handlePaginatePrevious: () => void;
  handleReset: () => void;
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

  return React.useMemo(
    () => ({
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
      handleReset: () => {
        setCurrentPage(1);
      },
    }),
    [currentPage, onPaginateNext, onPaginatePrevious, pageSize]
  );
};
