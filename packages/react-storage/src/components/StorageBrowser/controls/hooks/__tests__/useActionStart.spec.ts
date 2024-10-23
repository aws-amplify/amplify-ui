import { useControlsContext } from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionStart } from '../useActionStart';

jest.mock('../../../controls/context');

describe('useActionStart', () => {
  const controlsContext: ControlsContext = {
    data: {
      taskCounts: {
        CANCELED: 2,
        COMPLETE: 4,
        FAILED: 3,
        INITIAL: 0,
        PENDING: 0,
        QUEUED: 1,
        TOTAL: 10,
      },
    },
    actionsConfig: {
      isCancelable: true,
      type: 'BATCH_ACTION',
      actionStart: {
        label: 'Start',
        onClick: jest.fn(),
      },
    },
  };
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns object as it is received from ControlsContext', () => {
    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionStart()).toStrictEqual({
      props: controlsContext.actionsConfig.actionStart,
    });
  });
});
