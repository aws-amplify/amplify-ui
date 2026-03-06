import { renderHook, act } from '@testing-library/react';

import { usePagination } from '../usePagination';

describe('usePagination test suite', () => {
  it('should return correct props with initial values', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPages: 10 })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.siblingCount).toBe(1);
    expect(result.current.onNext).toBeDefined();
    expect(result.current.onPrevious).toBeDefined();
    expect(result.current.onChange).toBeDefined();
  });

  it('should initialize sibling count correctly if provided', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPages: 10, siblingCount: 2 })
    );

    expect(result.current.siblingCount).toBe(2);
  });

  it('should initialize callback functions with appropriate functionality', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPages: 10 })
    );

    act(() => {
      result.current.onNext();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.onPrevious();
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.onChange(5, 1);
    });
    expect(result.current.currentPage).toBe(5);
  });
});
