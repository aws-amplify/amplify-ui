import { renderHook } from '@testing-library/react';
import { PaginationProps } from '../../../composables/Pagination';
import { useControlsContext } from '../../../controls/context';
import { usePagination } from '../usePagination';

jest.mock('../../../controls/context');

describe('usePagination', () => {
  const data = {
    paginationData: { hasNextPage: true, highestPageVisited: 1, page: 1 },
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({ data, onPaginate: jest.fn() });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns Pagination props', () => {
    const { result } = renderHook(() => usePagination());

    const expected: PaginationProps = {
      hasNextPage: data.paginationData.hasNextPage,
      highestPageVisited: data.paginationData.highestPageVisited,
      page: data.paginationData.page,
      onPaginate: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
