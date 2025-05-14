import { renderHook } from '@testing-library/react';

import { ActionCancelProps } from '../../../components/composables/ActionCancel';
import { useControlsContext } from '../../context';
import { useActionCancel } from '../useActionCancel';

jest.mock('../../../controls/context');

describe('useActionCancel', () => {
  const data = {
    actionCancelLabel: 'action-cancel-label',
    isActionCancelDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onActionCancel: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns ActionCancel props', () => {
    const { result } = renderHook(() => useActionCancel());

    const expected: ActionCancelProps = {
      label: data.actionCancelLabel,
      isDisabled: data.isActionCancelDisabled,
      onCancel: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
