import {
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
} from '@aws-amplify/auth';

import { DataState } from '../useDataState';
import { sendUserAttributeVerificationCodeAction } from './constants';

export type UseSendUserAttributeVerificationCode = [
  DataState<SendUserAttributeVerificationCodeOutput | undefined>,
  (input: SendUserAttributeVerificationCodeInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  sendCode: typeof sendUserAttributeVerificationCodeAction;
}
