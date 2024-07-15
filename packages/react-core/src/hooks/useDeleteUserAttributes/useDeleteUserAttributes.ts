import { useDeleteUserAttributes } from './constants';
import { Actions, UseActions } from '../useUserAttributes/interfaces';

const useUserAttributesDelete = <T extends keyof Actions>(
  action: T
): [state: UseActions[T][0], handleAction: UseActions[T][1]] => {
  const useDelete = useDeleteUserAttributes();

  if (action === 'delete') {
    return useDelete;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesDelete };
