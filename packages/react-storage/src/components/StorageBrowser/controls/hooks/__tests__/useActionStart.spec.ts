import * as controlsContextModule from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionStart } from '../useActionStart';

describe('useActionStart', () => {
  const controlsContext: ControlsContext = {
    data: {
      actionStartLabel: 'Start',
    },
    onActionStart: jest.fn(),
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

    expect(useActionStart()).toStrictEqual({
      label: controlsContext.data.actionStartLabel,
      onStart: expect.any(Function),
      isDisabled: controlsContext.data.isActionStartDisabled,
    });
  });

  it('calls onActionStart from ControlsContext when onStart is called', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);

    const { onStart } = useActionStart();
    onStart!();

    expect(controlsContext.onActionStart).toHaveBeenCalledTimes(1);
  });
});
