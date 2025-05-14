import { renderHook } from '@testing-library/react';

import { LoadingIndicatorProps } from '../../../components/composables/LoadingIndicator';
import { useControlsContext } from '../../context';
import { useLoadingIndicator } from '../useLoadingIndicator';

jest.mock('../../../controls/context');

describe('useLoadingIndicator', () => {
  const data = {
    loadingIndicatorLabel: 'loading-indicator-label',
    isLoading: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({ data });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns LoadingIndicator props', () => {
    const { result } = renderHook(() => useLoadingIndicator());

    const expected: LoadingIndicatorProps = {
      label: data.loadingIndicatorLabel,
      isLoading: data.isLoading,
    };

    expect(result.current).toStrictEqual(expected);
  });
});
