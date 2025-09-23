import type { ActionExitProps } from '../../components/composables/ActionExit';
import { useControlsContext } from '../context';

export const useActionExit = (): ActionExitProps => {
  const {
    data: { actionExitLabel: label, isActionExitDisabled: isDisabled },
    onActionExit: onExit,
  } = useControlsContext();

  return { label, isDisabled, onExit };
};
