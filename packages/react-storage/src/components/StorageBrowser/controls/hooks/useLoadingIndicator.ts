import type { LoadingIndicatorProps } from '../../components/composables/LoadingIndicator';
import { useControlsContext } from '../context';

export const useLoadingIndicator = (): LoadingIndicatorProps => {
  const {
    data: { isLoading, loadingIndicatorLabel: label },
  } = useControlsContext();

  return { isLoading, label };
};
