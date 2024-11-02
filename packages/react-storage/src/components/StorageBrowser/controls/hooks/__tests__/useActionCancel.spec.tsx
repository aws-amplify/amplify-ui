import * as controlsContextModule from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionCancel } from '../useActionCancel';

describe('useActionCancel', () => {
  const controlsContext: ControlsContext = {
    data: {
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: false,
    },
    actionsConfig: {
      isCancelable: true,
      type: 'BATCH_ACTION',
    },
    onActionCancel: jest.fn(),
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

    expect(useActionCancel()).toStrictEqual({
      label: controlsContext.data.actionCancelLabel,
      onCancel: controlsContext.onActionCancel,
      isDisabled: controlsContext.data.isActionCancelDisabled,
    });
  });

  it('calls onActionCancel from ControlsContext when onCancel is called', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);

    const { onCancel } = useActionCancel();
    onCancel!();

    expect(controlsContext.onActionCancel).toHaveBeenCalledTimes(1);
  });
});
