import { renderHook } from '@testing-library/react';
import { DataRefreshProps } from '../../../composables/DataRefresh';
import { useControlsContext } from '../../../controls/context';
import { useDataRefresh } from '../useDataRefresh';

jest.mock('../../../controls/context');

describe('useDataRefresh', () => {
  const data = {
    dataRefreshLabel: 'add-folder-label',
    isDataRefreshDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onRefresh: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns DataRefresh props', () => {
    const { result } = renderHook(() => useDataRefresh());

    const expected: DataRefreshProps = {
      isDisabled: data.isDataRefreshDisabled,
      onRefresh: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
