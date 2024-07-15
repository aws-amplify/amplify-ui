import {
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
} from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

export type UseSendUserAttributeVerificationCode = [
  ActionState<SendUserAttributeVerificationCodeOutput | undefined>,
  (input: SendUserAttributeVerificationCodeInput) => void,
];
