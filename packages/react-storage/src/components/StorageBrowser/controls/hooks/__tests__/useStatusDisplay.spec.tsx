import { useControlsContext } from '../../../controls/context';
import { useStatusDisplay } from '../useStatusDisplay';

jest.mock('../../../controls/context');

describe('useStatusDisplay', () => {
  const data = {
    taskCounts: {
      CANCELED: 2,
      COMPLETE: 4,
      FAILED: 3,
      INITIAL: 0,
      PENDING: 0,
      QUEUED: 1,
      TOTAL: 10,
    },
  };

  const actionsConfig = {
    isCancelable: true,
    type: 'BATCH_ACTION',
  };
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useStatusDisplay data', () => {
    mockUseControlsContext.mockReturnValue({ data, actionsConfig });

    expect(useStatusDisplay()).toStrictEqual({
      props: {
        statuses: [
          expect.objectContaining({ count: 4 }),
          expect.objectContaining({ count: 3 }),
          expect.objectContaining({ count: 2 }),
          expect.objectContaining({ count: 1 }),
        ],
        total: 10,
      },
    });
  });

  it('returns empty object if taskCounts is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {}, actionsConfig });

    expect(useStatusDisplay()).toStrictEqual({});
  });

  it('returns empty object if taksCount total is 0', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        taskCounts: {
          CANCELED: 0,
          COMPLETE: 0,
          FAILED: 0,
          INITIAL: 0,
          PENDING: 0,
          QUEUED: 0,
          TOTAL: 0,
        },
      },
      actionsConfig,
    });

    expect(useStatusDisplay()).toStrictEqual({});
  });

  it('returns empty object if not a batch action', () => {
    mockUseControlsContext.mockReturnValue({
      data,
      actionsConfig: {
        isCancelable: true,
        type: 'SINGLE_ACTION',
      },
    });

    expect(useStatusDisplay()).toStrictEqual({});
  });

  it('omits canceled status if action is not cancelable', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        taskCounts: {
          CANCELED: 0,
          COMPLETE: 4,
          FAILED: 3,
          INITIAL: 0,
          PENDING: 0,
          QUEUED: 1,
          TOTAL: 8,
        },
      },
      actionsConfig: {
        isCancelable: false,
        type: 'BATCH_ACTION',
      },
    });

    expect(useStatusDisplay()).toStrictEqual({
      props: {
        statuses: [
          expect.objectContaining({ count: 4 }),
          expect.objectContaining({ count: 3 }),
          expect.objectContaining({ count: 1 }),
        ],
        total: 8,
      },
    });
  });
});
