import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useOverwriteToggle } from '../useOverwriteToggle';

jest.mock('../../../controls/context');

describe('useOverwriteToggle', () => {
  // assert mocks
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useOverwriteToggle data', () => {
    const data = {
      isOverwritingEnabled: false,
      isOverwriteToggleDisabled: false,
      overwriteToggleLabel: 'overwrite-label',
    };
    mockUseControlsContext.mockReturnValue({
      data,
      onToggleOverwrite: jest.fn(),
    });

    const { result } = renderHook(() => useOverwriteToggle());

    expect(result.current).toStrictEqual({
      isDisabled: data.isOverwriteToggleDisabled,
      isOverwritingEnabled: data.isOverwritingEnabled,
      label: data.overwriteToggleLabel,
      onToggle: expect.any(Function),
    });
  });
});
