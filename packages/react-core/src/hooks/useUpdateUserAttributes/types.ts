import { UpdateUserAttributesInput, UserAttributeKey } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';
import { updateUserAttributesAction } from './constants';

// Describes actions passed to useDataState
export interface Actions {
  update: typeof updateUserAttributesAction;
}

export type UpdateAttributesOutput = {
  [UserAttribute in UserAttributeKey]?: {
    isUpdated: boolean; // if isUpdated true, don't return nextStep at all to user
    nextStep: {
      updateAttributeStep: string; // needs to be CONFIRM_ATTRIBUTE_WITH_CODE
      codeDeliveryDetails?: {
        attributeName?: string;
        deliveryMedium?: string;
        destination?: string;
      };
    };
  };
};

export type UseUpdateUserAttributes = [
  ActionState<UpdateData>,
  (input: UpdateUserAttributesInput) => void,
];

export type UpdateData =
  | {
      [Attribute in Exclude<UserAttributeKey, 'email' | 'phone_number'>]?: {
        isUpdated: boolean;
      };
    }
  | {
      [Attribute in Extract<UserAttributeKey, 'email' | 'phone_number'>]?: {
        nextStep:
          | {
              codeDeliveryDetails: {
                attributeName: 'email' | 'phone_number';
                deliveryMedium: string;
                destination: string;
              };
              updateAttributeStep: string;
            }
          | undefined;
      };
    };
