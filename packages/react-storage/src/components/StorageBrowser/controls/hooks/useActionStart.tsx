import { ActionStartProps } from '../../composables/ActionStart';
import { useControlsContext } from '../../controls/context';

export type UseActionStart = () => {
  props?: ActionStartProps;
};

export const useActionStart: UseActionStart = () => {
  const {
    actionsConfig: { actionStart = {} },
  } = useControlsContext();
  return {
    props: {
      ...actionStart,
    },
  };
};
