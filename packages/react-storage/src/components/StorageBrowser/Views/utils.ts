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
  const isLastPage =
    // Checks if we have more results than pageSize and we're on the last page.
    Math.round(resultCount / pageSize) === currentPage ||
    // Checks if we have less results than pageSize (only one page)
    Math.round(resultCount / pageSize) === 0;
  const start = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;
  const end = currentPage === 1 ? pageSize : currentPage * pageSize;

  return {
    disableRefresh: isLoading || resultCount === 0,
    disableNext: (!hasNextToken && isLastPage) || isLoading,
    disablePrevious: currentPage <= 1 || isLoading,
    range: [start, end],
  };
};
