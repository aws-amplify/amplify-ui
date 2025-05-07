import { renderHook } from '@testing-library/react';

import { StatusDisplayProps } from '../../../components/composables/StatusDisplay';
import { useControlsContext } from '../../context';

import { useStatusDisplay } from '../useStatusDisplay';

jest.mock('../../../controls/context');

describe('useStatusDisplay', () => {
  const data = {
    statusCounts: {
      CANCELED: 2,
      COMPLETE: 4,
      FAILED: 3,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 1,
      TOTAL: 10,
    },
  };
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns StatusDisplay props', () => {
    mockUseControlsContext.mockReturnValue({ data });

    const { result } = renderHook(() => useStatusDisplay());

    const expected: StatusDisplayProps = {
      statuses: [
        expect.objectContaining({ count: 4 }),
        expect.objectContaining({ count: 3 }),
        expect.objectContaining({ count: 2 }),
        expect.objectContaining({ count: 1 }),
      ],
      total: 10,
    };

    expect(result.current).toStrictEqual(expected);
  });

  it('returns default values if statusCounts is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    expect(useStatusDisplay()).toStrictEqual({ statuses: [], total: 0 });
  });

  it('returns default values if statusCounts total is 0', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        statusCounts: {
          CANCELED: 0,
          COMPLETE: 0,
          FAILED: 0,
          OVERWRITE_PREVENTED: 0,
          PENDING: 0,
          QUEUED: 0,
          TOTAL: 0,
        },
      },
    });

    expect(useStatusDisplay()).toStrictEqual({ statuses: [], total: 0 });
  });
});
