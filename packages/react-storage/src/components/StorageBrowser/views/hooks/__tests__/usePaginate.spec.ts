import { act, renderHook } from '@testing-library/react';

import { LocationItemData } from '../../../actions';
import { usePaginate } from '../usePaginate';

describe('usePaginate', () => {
  const onPaginate = jest.fn();
  const items: LocationItemData[] = [
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
  ];

  const data = { onPaginate, pageSize: 1, items };

  afterEach(jest.clearAllMocks);

  it('returns the expected values on initial call', () => {
    const { result } = renderHook(() => usePaginate(data));

    const { current } = result ?? {};

    expect(current?.page).toBe(1);
    expect(current?.highestPageVisited).toBe(1);

    expect(typeof current?.handlePaginate).toBe('function');
    expect(typeof current?.handleReset).toBe('function');
  });

  it('returns the expected value of `highestPageVisited` on paginate when not on the last page', () => {
    const { result } = renderHook(() => usePaginate(data));

    const expectedHighestPage = Math.ceil(data.items.length / data.pageSize);

    act(() => {
      result?.current?.handlePaginate(expectedHighestPage);
    });

    expect(result?.current?.highestPageVisited).toBe(2);
  });

  it('returns the expected value of `page` on paginate', () => {
    const { result } = renderHook(() => usePaginate(data));

    expect(result?.current?.page).toBe(1);

    act(() => {
      result?.current?.handlePaginate(2);
    });

    expect(result?.current?.page).toBe(2);
  });

  it('returns the expected value of pageItems', () => {
    const { result } = renderHook(() => usePaginate(data));

    const expectedPageItems = data.items.slice(0, data.pageSize);

    expect(result?.current?.pageItems).toEqual(expectedPageItems);
  });

  it('calls `onPaginate` as expected', () => {
    const { result } = renderHook(() => usePaginate(data));

    const page = 2;

    act(() => {
      result?.current?.handlePaginate(page);
    });

    expect(data.onPaginate).toHaveBeenCalledTimes(1);
    expect(data.onPaginate).toHaveBeenCalledWith(page);
  });
});
