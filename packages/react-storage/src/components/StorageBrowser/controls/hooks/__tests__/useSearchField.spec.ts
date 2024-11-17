import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useSearchField } from '../useSearchField';

jest.mock('../../../controls/context');

describe('useSearchField', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useSearchField data', () => {
    const data = {
      searchClearLabel: 'Clear',
      searchPlaceholder: 'Placeholder',
      searchSubmitLabel: 'Submit',
      searchQuery: 'Query',
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onSearch: jest.fn(),
      onSearchClear: jest.fn(),
      onSearchQueryChange: jest.fn(),
    });

    const { result } = renderHook(() => useSearchField());

    expect(result.current).toStrictEqual({
      clearLabel: data.searchClearLabel,
      placeholder: data.searchPlaceholder,
      query: data.searchQuery,
      submitLabel: data.searchSubmitLabel,
      onClear: expect.any(Function),
      onQueryChange: expect.any(Function),
      onSearch: expect.any(Function),
    });
  });
});
