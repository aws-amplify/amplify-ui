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

  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useStatusDisplay data', () => {
    mockUseControlsContext.mockReturnValue({ data });

    expect(useStatusDisplay()).toStrictEqual({
      statuses: [
        expect.objectContaining({ count: 4 }),
        expect.objectContaining({ count: 3 }),
        expect.objectContaining({ count: 2 }),
        expect.objectContaining({ count: 1 }),
      ],
      total: 10,
    });
  });

  it('returns default values if taskCounts is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    expect(useStatusDisplay()).toStrictEqual({ statuses: [], total: 0 });
  });

  it('returns default values if taksCount total is 0', () => {
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
    });

    expect(useStatusDisplay()).toStrictEqual({ statuses: [], total: 0 });
  });
});
