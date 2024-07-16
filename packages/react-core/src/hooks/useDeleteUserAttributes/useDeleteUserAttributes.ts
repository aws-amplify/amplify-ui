import { useDeleteUserAttributes } from './constants';
import { UseDeleteUserAttributes, Actions } from './types';

const useUserAttributesDelete = <T extends keyof Actions>(
  action: T
): UseDeleteUserAttributes => {
  const useDelete = useDeleteUserAttributes();

  if (action === 'delete') {
    return useDelete;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesDelete };
