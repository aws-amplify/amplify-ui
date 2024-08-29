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
  const isLastPage = Math.round(resultCount / pageSize) === currentPage;
  const start = currentPage === 1 ? 0 : (currentPage - 1) * pageSize;
  const end = currentPage === 1 ? pageSize : currentPage * pageSize;

  return {
    disableRefresh: isLoading || resultCount === 0,
    disableNext: (!hasNextToken && isLastPage) || isLoading,
    disablePrevious: currentPage <= 1 || isLoading,
    range: [start, end],
  };
};
