import type { ActionCancelProps } from '../../components/composables/ActionCancel';
import { useControlsContext } from '../context';

export const useActionCancel = (): ActionCancelProps => {
  const {
    data: { actionCancelLabel, isActionCancelDisabled },
    onActionCancel,
  } = useControlsContext();
  return {
    onCancel: onActionCancel,
    isDisabled: isActionCancelDisabled,
    label: actionCancelLabel,
  };
};
