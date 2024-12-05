import { renderHook } from '@testing-library/react';
import { ActionExitProps } from '../../../composables/ActionExit';
import { useControlsContext } from '../../../controls/context';
import { useActionExit } from '../useActionExit';

jest.mock('../../../controls/context');

describe('useActionExit', () => {
  const data = {
    actionExitLabel: 'action-exit-label',
    isActionExitDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onActionExit: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns ActionExit props', () => {
    const { result } = renderHook(() => useActionExit());

    const expected: ActionExitProps = {
      label: data.actionExitLabel,
      isDisabled: data.isActionExitDisabled,
      onExit: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
