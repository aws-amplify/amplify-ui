import React from 'react';

interface UsePaginatedData {
  currentPage: number;
  handlePaginateNext: (input: {
    resultCount: number;
    hasNextToken: boolean;
  }) => void;
  handlePaginatePrevious: (input?: {}) => void;
  handleReset: () => void;
}

export const usePaginatedData = ({
  onPaginateNext,
  onPaginatePrevious,
  pageSize,
}: {
  onPaginateNext?: () => void;
  onPaginatePrevious?: () => void;
  pageSize: number;
}): UsePaginatedData => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleReset = React.useRef(() => {
    setCurrentPage(1);
  }).current;

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
      handleReset,
    }),
    [currentPage, handleReset, onPaginateNext, onPaginatePrevious, pageSize]
  );
};
