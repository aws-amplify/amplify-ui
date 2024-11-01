import { usePaginate } from '../usePaginate';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('../../../controls/context');

describe('usePaginate', () => {
  const data = {
    paginateCallback: jest.fn(),
    resultCount: 100,
    pageSize: 10,
    hasNextToken: false,
  };

  const warn = jest.spyOn(console, 'warn');

  it('returns the expected values on initial call', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    expect(result?.current?.currentPage).toBe(1);
    expect(typeof result?.current?.onPaginate).toBe('function');
    expect(typeof result?.current?.handleReset).toBe('function');
    expect(typeof result?.current?.highestPageVisited).toBe('number');
    expect(typeof result?.current?.range[0]).toBe('number');
    expect(typeof result?.current?.range[1]).toBe('number');
  });

  it('returns the expected value of `highestPageVisited` on paginate when not on the last page', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    const expectedHighestPage = Math.ceil(data.resultCount / data.pageSize);

    act(() => {
      result?.current?.onPaginate(expectedHighestPage);
    });

    expect(result?.current?.highestPageVisited).toBe(10);
  });

  it('paginates beyond the page count without warning when a "next token" is present', () => {
    const { result } = renderHook(() =>
      usePaginate({ ...data, hasNextToken: true })
    );

    act(() => {
      result?.current?.onPaginate(11);
    });

    expect(warn).not.toHaveBeenCalled();
  });

  it('returns the expected value of `currentPage` on paginate', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    expect(result?.current?.currentPage).toBe(1);

    act(() => {
      result?.current?.onPaginate(2);
    });

    expect(result?.current?.currentPage).toBe(2);
  });

  it('calls `onPaginate` as expected', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    act(() => {
      result?.current?.onPaginate(2);
    });

    expect(data.paginateCallback).toHaveBeenCalled();
  });
});
