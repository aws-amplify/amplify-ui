import { useSendUserAttributeVerificationCode } from './constants';
import { Actions, UseActions } from '../useUserAttributes/interfaces';

const useUserAttributesSendCode = <T extends keyof Actions>(
  action: T
): [state: UseActions[T][0], handleAction: UseActions[T][1]] => {
  const useSendCode = useSendUserAttributeVerificationCode();

  if (action === 'sendCode') {
    return useSendCode;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesSendCode };
