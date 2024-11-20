import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useAddFiles } from '../useAddFiles';

jest.mock('../../../controls/context');

describe('useAddFiles', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useAddFiles data', () => {
    const data = {
      addFilesLabel: 'add-files-label',
      isAddFilesDisabled: false,
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onAddFiles: jest.fn(),
    });

    const { result } = renderHook(() => useAddFiles());

    expect(result.current).toStrictEqual({
      isDisabled: data.isAddFilesDisabled,
      label: data.addFilesLabel,
      onAddFiles: expect.any(Function),
    });
  });
});
