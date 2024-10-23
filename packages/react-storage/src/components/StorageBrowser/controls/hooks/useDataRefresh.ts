import { DataRefreshProps } from '../../composables/DataRefresh';
import { useControlsContext } from '../../controls/context';

export type UseDataRefresh = () => {
  props?: DataRefreshProps;
};

export const useDataRefresh: UseDataRefresh = () => {
  const { actionsConfig } = useControlsContext();
  const { disabled, onClick } = actionsConfig?.dataRefresh ?? {};
  return {
    props: { disabled, onClick },
  };
};
