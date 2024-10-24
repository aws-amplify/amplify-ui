import { ActionStartProps } from '../../composables/ActionStart';
import { useControlsContext } from '../../controls/context';

export const useActionStart = (): ActionStartProps => {
  const {
    data: { actionStartLabel, isActionStartDisabled },
    onActionStart,
  } = useControlsContext();
  return {
    label: actionStartLabel,
    isDisabled: isActionStartDisabled,
    onStart: onActionStart,
  };
};
