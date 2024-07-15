import { useConfirmUserAttribute } from './constants';
import { Actions, UseActions } from '../useUserAttributes/interfaces';

const useUserAttributesConfirm = <T extends keyof Actions>(
  action: T
): [state: UseActions[T][0], handleAction: UseActions[T][1]] => {
  const useConfirm = useConfirmUserAttribute();

  if (action === 'fetch') {
    return useConfirm;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesConfirm };
