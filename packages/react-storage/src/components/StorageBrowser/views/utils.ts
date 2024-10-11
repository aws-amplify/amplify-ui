import { isFunction, isString } from '@aws-amplify/ui';

export const listViewHelpers = ({
  currentPage,
  hasNextToken,
  isLoading,
  pageSize,
  resultCount,
  hasError,
}: {
  currentPage: number;
  hasNextToken: boolean;
  isLoading: boolean;
  pageSize: number;
  resultCount: number;
  hasError: boolean;
}): {
  disableActionsMenu: boolean;
  disableNext: boolean;
  disablePrevious: boolean;
  disableRefresh: boolean;
  range: [start: number, end: number];
  renderLoading: boolean;
} => {
  // Use Math.ceil so we can round up. For example, if you have
  // 4 results, and your page size is 3, the last page (Math.ceil(4/3)) will be 2.
  // If you have 3 results and your page size is 4, the last page will be 1.
  const isLastPage = Math.ceil(resultCount / pageSize) === currentPage;
  const hasEmptyResults = resultCount === 0;
  const isInitialPage = currentPage === 1;

  const start = isInitialPage ? 0 : (currentPage - 1) * pageSize;
  const end = isInitialPage ? pageSize : currentPage * pageSize;

  return {
    disableActionsMenu: isLoading,
    disableRefresh: isLoading || hasEmptyResults,
    disableNext:
      (!hasNextToken && isLastPage) || isLoading || hasEmptyResults || hasError,
    disablePrevious:
      currentPage <= 1 || isLoading || hasEmptyResults || hasError,
    range: [start, end],
    renderLoading: isInitialPage && hasEmptyResults && isLoading,
  };
};

// checks if a dropped item is a file or a folder, as a folder will not have a type
export const isFile = (file: File): boolean => file.type !== undefined;

export const getPercentValue = (value: number): number =>
  Math.round(value * 100);

export const resolveClassName = (
  defaultClassName: string,
  className?: string | ((defaultClassName: string) => string)
): string => {
  if (isString(className)) return `${defaultClassName} ${className}`;

  if (isFunction(className)) return className(defaultClassName);

  return defaultClassName;
};

export const compareStrings = (a: string, b: string): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a.localeCompare(b);
};

export const compareNumbers = (a: number, b: number): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a - b;
};

export const compareDates = (a: Date, b: Date): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a.getTime() - b.getTime();
};
