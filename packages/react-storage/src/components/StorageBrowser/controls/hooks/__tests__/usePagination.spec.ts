import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { usePagination } from '../usePagination';

jest.mock('../../../controls/context');

describe('usePagination', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns usePagination data', () => {
    const data = {
      paginationData: { hasNextPage: true, highestPageVisited: 1, page: 1 },
    };
    mockUseControlsContext.mockReturnValue({ data, onPaginate: jest.fn() });

    const { result } = renderHook(() => usePagination());

    expect(result.current).toStrictEqual({
      hasNextPage: data.paginationData.hasNextPage,
      highestPageVisited: data.paginationData.highestPageVisited,
      page: data.paginationData.page,
      onPaginate: expect.any(Function),
    });
  });
});
