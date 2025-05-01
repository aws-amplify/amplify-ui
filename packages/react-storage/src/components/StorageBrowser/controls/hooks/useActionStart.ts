import type { ActionStartProps } from '../../components/composables/ActionStart';
import { useControlsContext } from '../context';

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
