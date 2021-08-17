'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.usePagination = void 0;
var react_1 = require('react');
var usePagination = function (props) {
  var initialPage = props.currentPage,
    totalPages = props.totalPages,
    _a = props.siblingCount,
    siblingCount = _a === void 0 ? 1 : _a;
  // The current page should not be less than 1
  initialPage = Math.max(initialPage, 1);
  // The sibling count should not be less than 1
  siblingCount = Math.max(siblingCount, 1);
  // The total pages should be always greater than current page
  totalPages = Math.max(initialPage, totalPages);
  var _b = react_1.useState(initialPage),
    currentPage = _b[0],
    setCurrentPage = _b[1];
  var onNext = react_1.useCallback(
    function () {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, totalPages]
  );
  var onPrevious = react_1.useCallback(
    function () {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    [currentPage]
  );
  var onChange = react_1.useCallback(function (newPage, prevPage) {
    setCurrentPage(newPage);
  }, []);
  return {
    currentPage: currentPage,
    totalPages: totalPages,
    siblingCount: siblingCount,
    onNext: onNext,
    onPrevious: onPrevious,
    onChange: onChange,
  };
};
exports.usePagination = usePagination;
//# sourceMappingURL=usePagination.js.map
