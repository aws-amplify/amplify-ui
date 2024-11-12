import * as controlsContextModule from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionExit } from '../useActionExit';

describe('useActionExit', () => {
  const controlsContext: ControlsContext = {
    data: {
      actionExitLabel: 'Exit',
      isActionExitDisabled: false,
    },
    onActionExit: jest.fn(),
  };
  const useControlsContextSpy = jest.spyOn(
    controlsContextModule,
    'useControlsContext'
  );

  afterEach(() => {
    useControlsContextSpy.mockClear();
  });

  it('returns object as it is received from ControlsContext', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);

    expect(useActionExit()).toStrictEqual({
      label: controlsContext.data.actionExitLabel,
      onExit: controlsContext.onActionExit,
      isDisabled: controlsContext.data.isActionExitDisabled,
    });
  });

  it('calls onActionExit from ControlsContext when onActionExit is called', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);

    const { onExit } = useActionExit();
    onExit!();

    expect(controlsContext.onActionExit).toHaveBeenCalledTimes(1);
  });
});
