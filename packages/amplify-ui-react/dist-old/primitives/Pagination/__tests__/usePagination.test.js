'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var react_hooks_1 = require('@testing-library/react-hooks');
var usePagination_1 = require('../usePagination');
describe('usePagination test suite', function () {
  it('should return correct props with initial values', function () {
    var result = react_hooks_1.renderHook(function () {
      return usePagination_1.usePagination({ currentPage: 1, totalPages: 10 });
    }).result;
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.siblingCount).toBe(1);
    expect(result.current.onNext).toBeDefined();
    expect(result.current.onPrevious).toBeDefined();
    expect(result.current.onChange).toBeDefined();
  });
  it('should initialize sibling count correctly if provided', function () {
    var result = react_hooks_1.renderHook(function () {
      return usePagination_1.usePagination({
        currentPage: 1,
        totalPages: 10,
        siblingCount: 2,
      });
    }).result;
    expect(result.current.siblingCount).toBe(2);
  });
  it('should initialize callback functions with appropriate functionality', function () {
    var result = react_hooks_1.renderHook(function () {
      return usePagination_1.usePagination({ currentPage: 1, totalPages: 10 });
    }).result;
    react_hooks_1.act(function () {
      result.current.onNext();
    });
    expect(result.current.currentPage).toBe(2);
    react_hooks_1.act(function () {
      result.current.onPrevious();
    });
    expect(result.current.currentPage).toBe(1);
    react_hooks_1.act(function () {
      result.current.onChange(5, 1);
    });
    expect(result.current.currentPage).toBe(5);
  });
});
//# sourceMappingURL=usePagination.test.js.map
