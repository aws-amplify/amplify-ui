import {
  ConfirmUserAttributeInput,
  DeleteUserAttributesInput,
  FetchUserAttributesOutput,
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
  UpdateUserAttributesInput,
  UserAttributeKey,
} from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

// Union type of all possible handleAction inputs - used to confirm input type
export type AttributeManagementInputs =
  | ConfirmUserAttributeInput
  | DeleteUserAttributesInput
  | SendUserAttributeVerificationCodeInput
  | UpdateUserAttributesInput
  | null;

export type UseDeleteUserAttributes = [
  ActionState<void>,
  (input: DeleteUserAttributesInput) => void,
];

export type UseUpdateUserAttributes = [
  ActionState<UpdateAttributesOutput>,
  (input: UpdateUserAttributesInput) => void,
];

export type UseConfirmUserAttribute = [
  ActionState<void>,
  (input: ConfirmUserAttributeInput) => void,
];

export type UseSendUserAttributeVerificationCode = [
  ActionState<SendUserAttributeVerificationCodeOutput>,
  (input: SendUserAttributeVerificationCodeInput) => void,
];

export type UseFetchUserAttributes = [
  ActionState<FetchUserAttributesOutput | undefined>,
  () => void,
];

export type UserAttributes = Record<UserAttributeKey, string | undefined>;

export type UpdateAttributesOutput = {
  [UserAttribute in UserAttributeKey]?: {
    isUpdated: boolean;
    nextStep: {
      updateAttributeStep: string;
      codeDeliverDetails?: {
        attributeName?: string;
        deliveryMedium?: string;
        destination?: string;
      };
    };
  };
};
