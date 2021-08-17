export declare const ELLIPSIS = '...';
/**
 * This hook will be used to determine the range of page numbers to be rendered,
 * including ellipsis dots(e.g., an array like [1, '...', 4, 5, 6, '...', 10]).
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @param siblingCount the number of siblings on each side of
 * @returns an array that contains the range of numbers to be rendered
 */
export declare const useRange: (
  currentPage: number,
  totalPages: number,
  siblingCount?: number
) => (string | number)[];
