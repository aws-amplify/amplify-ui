import { useControlsContext } from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionStart } from '../useActionStart';

jest.mock('../../../controls/context');

describe('useActionStart', () => {
  const controlsContext: ControlsContext = {
    data: {
      actionStartLabel: 'Start',
    },
    actionsConfig: {
      isCancelable: true,
      type: 'BATCH_ACTION',
    },
    onActionStart: jest.fn(),
  };
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns object as it is received from ControlsContext', () => {
    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionStart()).toStrictEqual({
      props: {
        label: controlsContext.data.actionStartLabel,
        onStart: expect.any(Function),
        isDisabled: controlsContext.data.isActionStartDisabled,
      },
    });
  });
});
