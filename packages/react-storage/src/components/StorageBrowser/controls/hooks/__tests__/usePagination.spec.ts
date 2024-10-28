import { useControlsContext } from '../../context';
import { usePagination } from '../usePagination';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('../../../controls/context');

describe('usePagination', () => {
  const onPaginate = jest.fn();

  const data = {
    pagination: {
      hasMorePages: true,
      onPaginate,
      pageSize: 1,
      resultCount: 10,
    },
  };

  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns the expected values on initial call', () => {
    mockUseControlsContext.mockReturnValue({ data });

    const { result } = renderHook(() => usePagination());

    expect(result?.current?.currentPage).toBe(1);
    expect(typeof result?.current?.handlePaginate).toBe('function');
    expect(typeof result?.current?.hasMorePages).toBe('boolean');
    expect(typeof result?.current?.highestPageVisited).toBe('number');
  });

  it('returns the expected value of `highestPageVisited` on paginate', () => {
    mockUseControlsContext.mockReturnValue({ data });

    const { result } = renderHook(() => usePagination());

    const expectedHighestPage = Math.round(
      data.pagination.resultCount / data.pagination.pageSize
    );

    act(() => {
      result?.current?.handlePaginate(expectedHighestPage);
    });

    expect(result?.current?.highestPageVisited).toBe(10);
  });

  it('returns the expected value of `currentPage` on paginate', () => {
    mockUseControlsContext.mockReturnValue({ data });

    const { result } = renderHook(() => usePagination());

    expect(result?.current?.currentPage).toBe(1);

    act(() => {
      result?.current?.handlePaginate(2);
    });

    expect(result?.current?.currentPage).toBe(2);
  });

  it('calls `onPaginate` as expected', () => {
    mockUseControlsContext.mockReturnValue({ data });

    const { result } = renderHook(() => usePagination());

    act(() => {
      result?.current?.handlePaginate(2);
    });

    expect(onPaginate).toHaveBeenCalled();
  });
});
