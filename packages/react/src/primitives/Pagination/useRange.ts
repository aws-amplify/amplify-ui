import { useMemo } from 'react';

import { getConsecutiveIntArray } from '../shared/utils';

export const ELLIPSIS = '...';

/**
 * This hook will be used to determine the range of page numbers to be rendered,
 * including ellipsis dots(e.g., an array like [1, ..., 4, 5, 6, ..., 10]).
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @returns an array that contains the range of numbers to be rendered
 */
export const useRange = (
  currentPage: number,
  totalPages: number
): (string | number)[] => {
  const range = useMemo(() => {
    // Note: 1-based index will be used for page value.
    const firstPage = 1;
    const lastPage = totalPages;
    // The min number of pages to be shown on each side of the current page link.
    // Defaults to 1 for now.
    const siblingPages = 1;
    // The max page links to be shown.
    const maxPagesToShow = 5;

    /**
     * Case 1: If the number of pages is less than the max page links we want to show,
     * then just simply return the range from 1 to totalPages (e.g. [1, 2, 3, 4]).
     */
    if (totalPages < maxPagesToShow) {
      return getConsecutiveIntArray(1, totalPages);
    }

    /**
     * Determine if ellipsis dots should be rendered on either left or right side, or both
     */
    const leftSiblingPage = Math.max(currentPage - siblingPages, firstPage);
    const rightSiblingPage = Math.min(currentPage + siblingPages, lastPage);

    const shouldRenderStartEllipsis = leftSiblingPage > 2;
    const shouldRenderEndEllipsis = rightSiblingPage < lastPage - 1;

    /**
     * Case 2: Only render ellipsis dots on the left side (e.g. [1, '...', 7, 8, 9, 10]).
     */
    if (shouldRenderStartEllipsis && !shouldRenderEndEllipsis) {
      const rightRange = getConsecutiveIntArray(leftSiblingPage, lastPage);
      return [firstPage, ELLIPSIS, ...rightRange];
    }
    /**
     * Case 3: Only render ellipsis dots on the right side (e.g. [1, 2, 3, 4, '...', 10]).
     */
    if (!shouldRenderStartEllipsis && shouldRenderEndEllipsis) {
      const leftRange = getConsecutiveIntArray(firstPage, rightSiblingPage);
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
  }, [currentPage, totalPages]);

  return range;
};
