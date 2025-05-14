import { renderHook } from '@testing-library/react';

import { AddFilesProps } from '../../../components/composables/AddFiles';
import { useControlsContext } from '../../context';
import { useAddFiles } from '../useAddFiles';

jest.mock('../../../controls/context');

describe('useAddFiles', () => {
  const data = {
    addFilesLabel: 'add-files-label',
    isAddFilesDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onAddFiles: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns AddFiles props', () => {
    const { result } = renderHook(() => useAddFiles());

    const expected: AddFilesProps = {
      label: data.addFilesLabel,
      isDisabled: data.isAddFilesDisabled,
      onAddFiles: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
