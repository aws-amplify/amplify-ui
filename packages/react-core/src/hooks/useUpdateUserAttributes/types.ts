import { UpdateUserAttributesInput, UserAttributeKey } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

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

export type UseUpdateUserAttributes = [
  ActionState<UpdateAttributesOutput | undefined>,
  (input: UpdateUserAttributesInput) => void,
];
