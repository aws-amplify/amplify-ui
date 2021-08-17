'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.usePaginationItems = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = require('react');
var i18n_1 = require('./i18n');
var useRange_1 = require('./useRange');
var PaginationItem_1 = require('./PaginationItem');
/**
 * This hook will be used to get the pagination items to be rendered in the pagination primitive
 * @param currentPage current page number
 * @param totalPages total number of pages
 * @param siblingCount the number of siblings on each side of
 * @param onNext callback function triggered when the next-page button is pressed
 * @param onPrevious callback function triggered when the prev-page button is pressed
 * @param onChange callback function triggered every time the page changes
 * @returns an array of pagination items
 */
var usePaginationItems = function (
  currentPage,
  totalPages,
  siblingCount,
  onNext,
  onPrevious,
  onChange
) {
  var previousItem = jsx_runtime_1.jsx(
    PaginationItem_1.PaginationItem,
    {
      type: 'previous',
      currentPage: currentPage,
      onClick: onPrevious,
      isDisabled: currentPage <= 1,
      ariaLabel: i18n_1.i18n.PaginationItem.PreviousItem.ariaLabel,
    },
    'previous'
  );
  var nextItem = jsx_runtime_1.jsx(
    PaginationItem_1.PaginationItem,
    {
      type: 'next',
      currentPage: currentPage,
      onClick: onNext,
      isDisabled: currentPage >= totalPages,
      ariaLabel: i18n_1.i18n.PaginationItem.NextItem.ariaLabel,
    },
    'next'
  );
  // To get the range of page numbers to be rendered in the pagination primitive
  var range = useRange_1.useRange(currentPage, totalPages, siblingCount);
  var pageItems = react_1.useMemo(
    function () {
      return range.map(function (item, idx) {
        if (item === useRange_1.ELLIPSIS) {
          return jsx_runtime_1.jsx(
            PaginationItem_1.PaginationItem,
            { type: 'ellipsis' },
            idx === 1 ? 'start-ellipsis' : 'end-ellipsis'
          );
        }
        return (
          // Note: Do NOT use index for `key` and instead use page number
          // otherwise, react cannot update the component correctly with its diff mechanism
          jsx_runtime_1.jsx(
            PaginationItem_1.PaginationItem,
            {
              type: 'page',
              page: item,
              currentPage: currentPage,
              onClick: onChange,
              ariaLabel: 'Go to page ' + item,
            },
            item
          )
        );
      });
    },
    [range, currentPage, onChange]
  );
  return __spreadArray(__spreadArray([previousItem], pageItems), [nextItem]);
};
exports.usePaginationItems = usePaginationItems;
//# sourceMappingURL=usePaginationItems.js.map
