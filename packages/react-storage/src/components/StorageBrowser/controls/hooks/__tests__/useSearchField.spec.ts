import { renderHook } from '@testing-library/react';
import { SearchFieldProps } from '../../../composables/SearchField';
import { useControlsContext } from '../../../controls/context';
import { useSearchField } from '../useSearchField';

jest.mock('../../../controls/context');

describe('useSearchField', () => {
  const data = {
    searchClearLabel: 'search-clear-label',
    searchPlaceholder: 'search-placeholder',
    searchSubmitLabel: 'search-submit-label',
    searchQuery: 'search-query',
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onSearch: jest.fn(),
      onSearchClear: jest.fn(),
      onSearchQueryChange: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useSearchField data', () => {
    const { result } = renderHook(() => useSearchField());

    const expected: SearchFieldProps = {
      clearLabel: data.searchClearLabel,
      placeholder: data.searchPlaceholder,
      query: data.searchQuery,
      submitLabel: data.searchSubmitLabel,
      onClear: expect.any(Function),
      onQueryChange: expect.any(Function),
      onSearch: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
