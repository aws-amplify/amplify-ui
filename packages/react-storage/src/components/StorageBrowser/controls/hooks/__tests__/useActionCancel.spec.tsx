import { useControlsContext } from '../../../controls/context';
import { ControlsContext } from '../../types';
import { useActionCancel } from '../useActionCancel';

jest.mock('../../../controls/context');

describe('useActionCancel', () => {
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
      actionCancel: {
        text: 'Cancel',
        onClick: jest.fn(),
      },
    },
  };
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns object with disabled as false based on taskCounts when actionsConfig.actionCancel.disabled is undefined', () => {
    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionCancel()).toStrictEqual({
      props: {
        disabled: false,
        onClick: controlsContext.actionsConfig.actionCancel?.onClick,
        text: controlsContext.actionsConfig.actionCancel?.text,
      },
    });
  });

  it('returns object with disabled as true based on taskCounts when actionsConfig.actionCancel.disabled is undefined', () => {
    controlsContext.data.taskCounts!.QUEUED = 0;
    controlsContext.data.taskCounts!.COMPLETE = 5;
    controlsContext.data.taskCounts!.TOTAL = 10;

    mockUseControlsContext.mockReturnValue(controlsContext);

    expect(useActionCancel()).toStrictEqual({
      props: {
        disabled: true,
        onClick: controlsContext.actionsConfig.actionCancel?.onClick,
        text: controlsContext.actionsConfig.actionCancel?.text,
      },
    });
  });

  it('returns object with disabled as undefined when taskCounts & actionsConfig.actionCancel.disabled are both undefined', () => {
    mockUseControlsContext.mockReturnValue({
      data: {},
      actionsConfig: controlsContext.actionsConfig,
    });

    expect(useActionCancel()).toStrictEqual({
      props: {
        disabled: undefined,
        onClick: controlsContext.actionsConfig.actionCancel?.onClick,
        text: controlsContext.actionsConfig.actionCancel?.text,
      },
    });
  });
});
