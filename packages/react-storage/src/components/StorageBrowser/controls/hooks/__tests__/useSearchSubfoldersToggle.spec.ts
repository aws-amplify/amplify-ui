import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useSearchSubfoldersToggle } from '../useSearchSubfoldersToggle';

jest.mock('../../../controls/context');

describe('useSearchSubfoldersToggle', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useSearchSubfoldersToggle data', () => {
    const data = {
      isSearchingSubfolders: true,
      searchSubfoldersToggleLabel: 'search-subfolders-label',
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onToggleSearchSubfolders: jest.fn(),
    });

    const { result } = renderHook(() => useSearchSubfoldersToggle());

    expect(result.current).toStrictEqual({
      isSearchingSubfolders: data.isSearchingSubfolders,
      label: data.searchSubfoldersToggleLabel,
      onToggle: expect.any(Function),
    });
  });
});
