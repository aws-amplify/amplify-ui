import { renderHook } from '@testing-library/react';

import { ActionStartProps } from '../../../components/composables/ActionStart';
import { useControlsContext } from '../../context';
import { useActionStart } from '../useActionStart';

jest.mock('../../../controls/context');

describe('useActionStart', () => {
  const data = {
    actionStartLabel: 'action-start-label',
    isActionStartDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onActionStart: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns ActionStart props', () => {
    const { result } = renderHook(() => useActionStart());

    const expected: ActionStartProps = {
      label: data.actionStartLabel,
      isDisabled: data.isActionStartDisabled,
      onStart: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
