import { ActionCancelProps } from '../../composables/ActionCancel';
import { useControlsContext } from '../../controls/context';

export const useActionCancel = (): ActionCancelProps => {
  const {
    data: { actionCancelAriaLabel, actionCancelLabel, isActionCancelDisabled },
    onActionCancel,
  } = useControlsContext();
  return {
    onCancel: onActionCancel,
    ariaLabel: actionCancelAriaLabel,
    isDisabled: isActionCancelDisabled,
    label: actionCancelLabel,
  };
};
