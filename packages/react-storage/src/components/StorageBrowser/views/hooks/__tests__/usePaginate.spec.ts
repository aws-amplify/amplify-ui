import { usePaginate } from '../usePaginate';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('../../../controls/context');

describe('usePaginate', () => {
  const data: Parameters<typeof usePaginate>[0] = {
    paginateCallback: jest.fn(),
    pageSize: 1,
    hasNextToken: false,
    items: [
      {
        key: 'key1',
        id: 'id1',
        type: 'FOLDER',
      },
      {
        key: 'key2',
        id: 'id2',
        type: 'FOLDER',
      },
    ],
  };

  it('returns the expected values on initial call', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    const { current } = result ?? {};

    expect(current?.currentPage).toBe(1);
    expect(typeof current?.onPaginate).toBe('function');
    expect(typeof current?.handleReset).toBe('function');
    expect(typeof current?.highestPageVisited).toBe('number');
  });

  it('returns the expected value of `highestPageVisited` on paginate when not on the last page', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    const expectedHighestPage = Math.ceil(data.items.length / data.pageSize);

    act(() => {
      result?.current?.onPaginate(expectedHighestPage);
    });

    expect(result?.current?.highestPageVisited).toBe(2);
  });

  it('returns the expected value of `currentPage` on paginate', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    expect(result?.current?.currentPage).toBe(1);

    act(() => {
      result?.current?.onPaginate(2);
    });

    expect(result?.current?.currentPage).toBe(2);
  });

  it('returns the expected value of pageItems', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    const expectedPageItems = data.items.slice(0, data.pageSize);

    expect(result?.current?.pageItems).toEqual(expectedPageItems);
  });

  it('calls `onPaginate` as expected', () => {
    const { result } = renderHook(() => usePaginate({ ...data }));

    act(() => {
      result?.current?.onPaginate(2);
    });

    expect(data.paginateCallback).toHaveBeenCalled();
  });
});
