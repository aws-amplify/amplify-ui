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

  it('returns object with disabled as false based on taskCounts when actionsConfig.actionStartIsDisabled is undefined', () => {
    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionStart()).toStrictEqual({
      props: {
        disabled: false,
        onClick: controlsContext.actionsConfig.actionStart?.onClick,
        label: controlsContext.actionsConfig.actionStart?.label,
      },
    });
  });

  it('returns object with disabled as true based on taskCounts when actionsConfig.actionStartIsDisabled is undefined', () => {
    controlsContext.data.taskCounts!.QUEUED = 0;
    controlsContext.data.taskCounts!.COMPLETE = 5;
    controlsContext.data.taskCounts!.TOTAL = 10;

    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionStart()).toStrictEqual({
      props: {
        disabled: true,
        onClick: controlsContext.actionsConfig.actionStart?.onClick,
        label: controlsContext.actionsConfig.actionStart?.label,
      },
    });
  });

  it('returns object with disabled as undefined when taskCounts & actionsConfig.actionStartIsDisabled are both undefined', () => {
    mockUseControlsContext.mockReturnValue({
      data: {},
      actionsConfig: controlsContext.actionsConfig,
    });

    expect(useActionStart()).toStrictEqual({
      props: {
        disabled: undefined,
        onClick: controlsContext.actionsConfig.actionStart?.onClick,
        label: controlsContext.actionsConfig.actionStart?.label,
      },
    });
  });
});
