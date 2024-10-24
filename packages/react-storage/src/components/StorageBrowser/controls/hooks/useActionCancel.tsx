import { ActionCancelProps } from '../../composables/ActionCancel';
import { useControlsContext } from '../../controls/context';

export const useActionCancel = (): ActionCancelProps => {
  const {
    data: { actionCancelAriaLabel, actionCancelText, isActionCancelDisabled },
    onActionCancel,
  } = useControlsContext();
  return {
    onCancel: onActionCancel,
    ariaLabel: actionCancelAriaLabel,
    isDisabled: isActionCancelDisabled,
    text: actionCancelText,
  };
};
