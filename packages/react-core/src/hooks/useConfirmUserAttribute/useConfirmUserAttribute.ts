import { useConfirmUserAttribute } from './constants';
import { Actions, UseConfirmUserAttribute } from './types';

const useUserAttributesConfirm = <T extends keyof Actions>(
  action: T
): UseConfirmUserAttribute => {
  const useConfirm = useConfirmUserAttribute();

  if (action === 'confirm') {
    return useConfirm;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesConfirm };
