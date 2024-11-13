import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useAddFolder } from '../useAddFolder';

jest.mock('../../../controls/context');

describe('useAddFolder', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useAddFolder data', () => {
    const data = {
      addFolderLabel: 'add-folder-label',
      isAddFolderDisabled: false,
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onAddFolder: jest.fn(),
    });

    const { result } = renderHook(() => useAddFolder());

    expect(result.current).toStrictEqual({
      isDisabled: data.isAddFolderDisabled,
      label: data.addFolderLabel,
      onAddFolder: expect.any(Function),
    });
  });
});
