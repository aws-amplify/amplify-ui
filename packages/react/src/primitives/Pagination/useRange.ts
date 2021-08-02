import { useMemo } from 'react';

import { getConsecutiveIntArray } from '../shared/utils';

export const ELLIPSIS = '...';

/**
 * This hook will be used to determine the range of page numbers to be rendered,
 * including ellipsis dots(e.g., an array like [1, '...', 4, 5, 6, '...', 10]).
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @param siblingCount the number of siblings on each side of
 * @returns an array that contains the range of numbers to be rendered
 */
export const useRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (string | number)[] => {
  const range = useMemo(() => {
    // The current page should not be less than 1
    currentPage = Math.max(currentPage, 1);
    // The sibling count should not be less than 1
    siblingCount = Math.max(siblingCount, 1);
    // The total pages should be always greater than current page
    totalPages = Math.max(currentPage, totalPages);

    // Note: 1-based index will be used for page value.
    const firstPage = 1;
    const lastPage = totalPages;

    /**
     * To avoid resizing our pagination component while a user is interacting with the component,
     * the total number of items returned by the hook should remain constant.
     * The consant is supposed to be the max number of items that would returned by the hook in all cases,
     * so it should be calculated by 1(first page) + 1(last page) + 1(current page) + 2 * siblingCount + 2(ellipses)
     */
    const maxNumOfItems = 5 + 2 * siblingCount;

    /**
     * Case 1: If the total number of pages is not greater than the max number of items that would potentially be returned,
     * then no need to run through the ellipsis cases, just simply return the range from 1 to totalPages (e.g. [1, 2, 3, 4]).
     */
    if (totalPages < maxNumOfItems) {
      return getConsecutiveIntArray(1, totalPages);
    }

    /**
     * Determine if ellipsis dots should be rendered on either left or right side, or both
     */
    const leftSiblingPage = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingPage = Math.min(currentPage + siblingCount, lastPage);

    const shouldRenderStartEllipsis = leftSiblingPage > 2;
    const shouldRenderEndEllipsis = rightSiblingPage < lastPage - 1;

    /**
     * Case 2: Only render ellipsis dots on the left side (e.g. [1, '...', 6, 7, 8, 9, 10]).
     */
    if (shouldRenderStartEllipsis && !shouldRenderEndEllipsis) {
      // 1(current page) + 1(last page) + 1(fill up a page for the position of end ellipsis) + 2 * siblingCount
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getConsecutiveIntArray(
        lastPage - rightItemCount + 1,
        lastPage
      );
      return [firstPage, ELLIPSIS, ...rightRange];
    }
    /**
     * Case 3: Only render ellipsis dots on the right side (e.g. [1, 2, 3, 4, 5, '...', 10]).
     */
    if (!shouldRenderStartEllipsis && shouldRenderEndEllipsis) {
      // 1(current page) + 1(last page) + 1(fill up a page for the position of start ellipsis) + 2 * siblingCount
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getConsecutiveIntArray(firstPage, leftItemCount);
      return [...leftRange, ELLIPSIS, lastPage];
    }

    /**
     * Case 4: Render ellipsis on both side (e.g. [1, '...', 4, 5, 6, '...', 10]).
     */
    const middleRange = getConsecutiveIntArray(
      leftSiblingPage,
      rightSiblingPage
    );
    return [firstPage, ELLIPSIS, ...middleRange, ELLIPSIS, lastPage];
  }, [currentPage, totalPages, siblingCount]);

  return range;
};
