import { ActionExitProps } from '../../composables/ActionExit';
import { useControlsContext } from '../../controls/context';

export const useActionExit = (): ActionExitProps => {
  const {
    data: { actionExitLabel: label, isActionExitDisabled: isDisabled },
    onActionExit: onExit,
  } = useControlsContext();

  return { label, isDisabled, onExit };
};
