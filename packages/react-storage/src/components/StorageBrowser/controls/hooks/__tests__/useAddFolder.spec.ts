import { renderHook } from '@testing-library/react';

import { AddFolderProps } from '../../../components/composables/AddFolder';
import { useControlsContext } from '../../context';
import { useAddFolder } from '../useAddFolder';

jest.mock('../../../controls/context');

describe('useAddFolder', () => {
  const data = {
    addFolderLabel: 'add-folder-label',
    isAddFolderDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onAddFolder: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns AddFolder props', () => {
    const { result } = renderHook(() => useAddFolder());

    const expected: AddFolderProps = {
      label: data.addFolderLabel,
      isDisabled: data.isAddFolderDisabled,
      onAddFolder: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
