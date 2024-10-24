import { ActionStartProps } from '../../composables/ActionStart';
import { useControlsContext } from '../../controls/context';

export type UseActionStart = () => {
  props?: ActionStartProps;
};

export const useActionStart: UseActionStart = () => {
  const {
    data: { actionStartLabel, isActionStartDisabled },
    onActionStart,
  } = useControlsContext();
  return {
    props: {
      label: actionStartLabel,
      isDisabled: isActionStartDisabled,
      onStart: onActionStart,
    },
  };
};
