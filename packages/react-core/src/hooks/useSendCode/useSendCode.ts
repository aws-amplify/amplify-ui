import { useSendUserAttributeVerificationCode } from './constants';
import { Actions } from './types';
import { UseSendUserAttributeVerificationCode } from './types';

const useUserAttributesSendCode = <T extends keyof Actions>(
  action: T
): UseSendUserAttributeVerificationCode => {
  const useSendCode = useSendUserAttributeVerificationCode();

  if (action === 'sendCode') {
    return useSendCode;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesSendCode };
