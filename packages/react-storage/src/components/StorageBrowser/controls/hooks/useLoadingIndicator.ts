import { LoadingIndicatorProps } from '../../composables/LoadingIndicator';
import { useControlsContext } from '../../controls/context';

export const useLoadingIndicator = (): LoadingIndicatorProps => {
  const {
    data: { isLoading, loadingIndicatorLabel: label },
  } = useControlsContext();

  return { isLoading, label };
};
