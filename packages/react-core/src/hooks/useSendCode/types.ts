import {
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
} from '@aws-amplify/auth';

import { ActionState } from '../useDataState';
import { sendUserAttributeVerificationCodeAction } from './constants';

export type UseSendUserAttributeVerificationCode = [
  ActionState<SendUserAttributeVerificationCodeOutput | undefined>,
  (input: SendUserAttributeVerificationCodeInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  sendCode: typeof sendUserAttributeVerificationCodeAction;
}
