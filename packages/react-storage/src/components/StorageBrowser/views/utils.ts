import { isFunction, isString } from '@aws-amplify/ui';

// checks if a dropped item is a file or a folder, as a folder will not have a type
export const isFile = (file: File): boolean => file.type !== '';

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

export function isLastPage(
  currentPage: number,
  totalItems: number,
  pageSize: number
): boolean {
  // Use Math.ceil so we can round up. For example, if you have
  // 4 results, and your page size is 3, the last page (Math.ceil(4/3)) will be 2.
  // If you have 3 results and your page size is 4, the last page will be 1
  return Math.ceil(totalItems / pageSize) === currentPage;
}
