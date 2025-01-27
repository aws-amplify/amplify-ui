import { renderHook } from '@testing-library/react';
import { SearchSubfoldersToggleProps } from '../../../composables/SearchSubfoldersToggle';
import { useControlsContext } from '../../../controls/context';
import { useSearchSubfoldersToggle } from '../useSearchSubfoldersToggle';

jest.mock('../../../controls/context');

describe('useSearchSubfoldersToggle', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns SearchSubfoldersToggle props', () => {
    const data = {
      isSearchingSubfolders: true,
      searchSubfoldersToggleLabel: 'search-subfolders-label',
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onToggleSearchSubfolders: jest.fn(),
    });

    const { result } = renderHook(() => useSearchSubfoldersToggle());

    const expected: SearchSubfoldersToggleProps = {
      isSearchingSubfolders: data.isSearchingSubfolders,
      label: data.searchSubfoldersToggleLabel,
      onToggle: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
