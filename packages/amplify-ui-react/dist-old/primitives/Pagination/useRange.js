'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useRange = exports.ELLIPSIS = void 0;
var react_1 = require('react');
var utils_1 = require('../shared/utils');
exports.ELLIPSIS = '...';
/**
 * This hook will be used to determine the range of page numbers to be rendered,
 * including ellipsis dots(e.g., an array like [1, '...', 4, 5, 6, '...', 10]).
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @param siblingCount the number of siblings on each side of
 * @returns an array that contains the range of numbers to be rendered
 */
var useRange = function (currentPage, totalPages, siblingCount) {
  if (siblingCount === void 0) {
    siblingCount = 1;
  }
  var range = react_1.useMemo(
    function () {
      // The current page should not be less than 1
      currentPage = Math.max(currentPage, 1);
      // The sibling count should not be less than 1
      siblingCount = Math.max(siblingCount, 1);
      // The total pages should be always greater than current page
      totalPages = Math.max(currentPage, totalPages);
      // Note: 1-based index will be used for page value.
      var firstPage = 1;
      var lastPage = totalPages;
      /**
       * To avoid resizing our pagination component while a user is interacting with the component,
       * the total number of items returned by the hook should remain constant.
       * The consant is supposed to be the max number of items that would returned by the hook in all cases,
       * so it should be calculated by 1(first page) + 1(last page) + 1(current page) + 2 * siblingCount + 2(ellipses)
       */
      var maxNumOfItems = 5 + 2 * siblingCount;
      /**
       * Case 1: If the total number of pages is not greater than the max number of items that would potentially be returned,
       * then no need to run through the ellipsis cases, just simply return the range from 1 to totalPages (e.g. [1, 2, 3, 4]).
       */
      if (totalPages < maxNumOfItems) {
        return utils_1.getConsecutiveIntArray(1, totalPages);
      }
      /**
       * Determine if ellipsis dots should be rendered on either left or right side, or both
       */
      var leftSiblingPage = Math.max(currentPage - siblingCount, firstPage);
      var rightSiblingPage = Math.min(currentPage + siblingCount, lastPage);
      var shouldRenderStartEllipsis = leftSiblingPage > 2;
      var shouldRenderEndEllipsis = rightSiblingPage < lastPage - 1;
      /**
       * Case 2: Only render ellipsis dots on the left side (e.g. [1, '...', 6, 7, 8, 9, 10]).
       */
      if (shouldRenderStartEllipsis && !shouldRenderEndEllipsis) {
        // 1(current page) + 1(last page) + 1(fill up a page for the position of end ellipsis) + 2 * siblingCount
        var rightItemCount = 3 + 2 * siblingCount;
        var rightRange = utils_1.getConsecutiveIntArray(
          lastPage - rightItemCount + 1,
          lastPage
        );
        return __spreadArray([firstPage, exports.ELLIPSIS], rightRange);
      }
      /**
       * Case 3: Only render ellipsis dots on the right side (e.g. [1, 2, 3, 4, 5, '...', 10]).
       */
      if (!shouldRenderStartEllipsis && shouldRenderEndEllipsis) {
        // 1(current page) + 1(last page) + 1(fill up a page for the position of start ellipsis) + 2 * siblingCount
        var leftItemCount = 3 + 2 * siblingCount;
        var leftRange = utils_1.getConsecutiveIntArray(
          firstPage,
          leftItemCount
        );
        return __spreadArray(__spreadArray([], leftRange), [
          exports.ELLIPSIS,
          lastPage,
        ]);
      }
      /**
       * Case 4: Render ellipsis on both side (e.g. [1, '...', 4, 5, 6, '...', 10]).
       */
      var middleRange = utils_1.getConsecutiveIntArray(
        leftSiblingPage,
        rightSiblingPage
      );
      return __spreadArray(
        __spreadArray([firstPage, exports.ELLIPSIS], middleRange),
        [exports.ELLIPSIS, lastPage]
      );
    },
    [currentPage, totalPages, siblingCount]
  );
  return range;
};
exports.useRange = useRange;
//# sourceMappingURL=useRange.js.map
