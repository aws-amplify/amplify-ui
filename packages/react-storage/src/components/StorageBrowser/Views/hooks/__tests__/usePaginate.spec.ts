import { act, renderHook } from '@testing-library/react-hooks';

import { usePaginate } from '../usePaginate';

describe('usePaginate', () => {
  it('returns the expected values on initial call', () => {
    const { result } = renderHook(() => usePaginate({ pageSize: 100 }));

    expect(result.current.currentPage).toBe(1);
    expect(typeof result.current.handlePaginateNext).toBe('function');
    expect(typeof result.current.handlePaginatePrevious).toBe('function');
    expect(typeof result.current.handleReset).toBe('function');
  });

  it('returns the expected value of `currentPage` on paginate next', () => {
    const { result } = renderHook(() => usePaginate({ pageSize: 100 }));

    act(() => {
      result.current.handlePaginateNext({
        hasNextToken: true,
        resultCount: 100,
      });
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('returns the expected value of `currentPage` on paginate previous', () => {
    const { result } = renderHook(() => usePaginate({ pageSize: 100 }));

    act(() => {
      result.current.handlePaginateNext({
        hasNextToken: true,
        resultCount: 100,
      });
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handlePaginatePrevious();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('returns the expected value of `currentPage` on reset', () => {
    const { result } = renderHook(() => usePaginate({ pageSize: 100 }));

    act(() => {
      result.current.handlePaginateNext({
        hasNextToken: true,
        resultCount: 100,
      });
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('calls `onPaginateNext` and `onPaginatePrevious` as expected', () => {
    const onPaginateNext = jest.fn();
    const onPaginatePrevious = jest.fn();

    const { result } = renderHook(() =>
      usePaginate({ onPaginateNext, onPaginatePrevious, pageSize: 100 })
    );

    act(() => {
      result.current.handlePaginateNext({
        hasNextToken: true,
        resultCount: 100,
      });
    });

    expect(onPaginateNext).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePaginatePrevious();
    });

    expect(onPaginatePrevious).toHaveBeenCalledTimes(1);
  });
});
