import { ActionCancelProps } from '../../composables/ActionCancel';
import { useControlsContext } from '../../controls/context';

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
