import { useUpdateUserAttributes } from './constants';
import { Actions, UseUpdateUserAttributes } from './types';

const useUserAttributesUpdate = <T extends keyof Actions>(
  action: T
): UseUpdateUserAttributes => {
  const useUpdate = useUpdateUserAttributes();

  if (action === 'update') {
    return useUpdate;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesUpdate };
