import { renderHook } from '@testing-library/react';
import * as controlsContextModule from '../../context';
import { ControlsContext } from '../../types';
import { useLoadingIndicator } from '../useLoadingIndicator';

const isLoading = true;
const loadingIndicatorLabel = 'Load!';

describe('useLoadingIndicator', () => {
  const controlsContext: ControlsContext = {
    data: {
      isLoading,
      loadingIndicatorLabel,
    },
  };

  const useControlsContextSpy = jest.spyOn(
    controlsContextModule,
    'useControlsContext'
  );

  afterEach(() => {
    useControlsContextSpy.mockClear();
  });

  it('provides the expected values to consumers', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);
    const { result } = renderHook(() => useLoadingIndicator());

    expect(result.current).toMatchObject({
      isLoading,
      label: loadingIndicatorLabel,
    });
  });
});
