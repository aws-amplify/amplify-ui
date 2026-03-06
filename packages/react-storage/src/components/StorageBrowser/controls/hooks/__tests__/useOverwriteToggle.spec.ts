import { renderHook } from '@testing-library/react';

import { OverwriteToggleProps } from '../../../components/composables/OverwriteToggle';
import { useControlsContext } from '../../context';
import { useOverwriteToggle } from '../useOverwriteToggle';

jest.mock('../../../controls/context');

describe('useOverwriteToggle', () => {
  const data = {
    isOverwritingEnabled: false,
    isOverwriteToggleDisabled: false,
    overwriteToggleLabel: 'overwrite-label',
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns OverwriteToggle props', () => {
    mockUseControlsContext.mockReturnValue({
      data,
      onToggleOverwrite: jest.fn(),
    });

    const { result } = renderHook(() => useOverwriteToggle());

    const expected: OverwriteToggleProps = {
      isDisabled: data.isOverwriteToggleDisabled,
      isOverwritingEnabled: data.isOverwritingEnabled,
      label: data.overwriteToggleLabel,
      onToggle: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
