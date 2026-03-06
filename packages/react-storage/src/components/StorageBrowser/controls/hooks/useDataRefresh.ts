import type { DataRefreshProps } from '../../components/composables/DataRefresh';
import { useControlsContext } from '../context';

export const useDataRefresh = (): DataRefreshProps => {
  const {
    data: { isDataRefreshDisabled },
    onRefresh,
  } = useControlsContext();

  return { isDisabled: isDataRefreshDisabled, onRefresh };
};
