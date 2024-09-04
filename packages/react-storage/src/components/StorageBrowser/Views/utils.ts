export const listViewHelpers = ({
  currentPage,
  hasNextToken,
  isLoading,
  pageSize,
  resultCount,
}: {
  currentPage: number;
  hasNextToken: boolean;
  isLoading: boolean;
  pageSize: number;
  resultCount: number;
}): {
  disableNext: boolean;
  disablePrevious: boolean;
  disableRefresh: boolean;
  range: [start: number, end: number];
} => {
  // Use Math.ceil so we can round up. For example, if you have
  // 4 results, and your page size is 3, the last page (Math.ceil(4/3)) will be 2.
  // If you have 3 results and your page size is 4, the last page will be 1.
  const isLastPage = Math.ceil(resultCount / pageSize) === currentPage;

  const start = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;
  const end = currentPage === 1 ? pageSize : currentPage * pageSize;

  return {
    disableRefresh: isLoading || resultCount === 0,
    disableNext: (!hasNextToken && isLastPage) || isLoading,
    disablePrevious: currentPage <= 1 || isLoading,
    range: [start, end],
  };
};

export const getPercentValue = (value: number): number => {
  return Math.round(value * 100);
};
