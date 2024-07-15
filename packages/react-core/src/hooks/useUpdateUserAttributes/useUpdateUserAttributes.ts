import { useUpdateUserAttributes } from './constants';
import { Actions, UseActions } from '../useUserAttributes/interfaces';

const useUserAttributesUpdate = <T extends keyof Actions>(
  action: T
): [state: UseActions[T][0], handleAction: UseActions[T][1]] => {
  const useUpdate = useUpdateUserAttributes();

  if (action === 'update') {
    return useUpdate;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesUpdate };
