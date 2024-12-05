import { DataRefreshProps } from '../../composables/DataRefresh';
import { useControlsContext } from '../../controls/context';

export const useDataRefresh = (): DataRefreshProps => {
  const {
    data: { isDataRefreshDisabled },
    onRefresh,
  } = useControlsContext();

  return { isDisabled: isDataRefreshDisabled, onRefresh };
};
