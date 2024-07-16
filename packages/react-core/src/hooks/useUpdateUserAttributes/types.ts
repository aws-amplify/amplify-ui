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

// type UpdateDataWithoutEmailPhoneNumber = {
//   [Attribute in Exclude<UserAttributeKey, 'email' | 'phone_number'>]: {
//     isUpdated: boolean;
//   };
// };

// type UpdateDataForEmailPhoneNumber = {
//   [Attribute in Extract<UserAttributeKey, 'email' | 'phone_number'>]: {
//     nextStep:
//       | {
//           codeDeliveryDetails: {
//             attributeName: 'email' | 'phone_number';
//             deliveryMedium: string;
//             destination: string;
//           };
//           updateAttributeStep: string;
//         }
//       | undefined;
//   };
// };

// export type UpdateData =
//   | UpdateDataWithoutEmailPhoneNumber
//   | UpdateDataForEmailPhoneNumber;

// const defaultVer: VerifiableAttributes = {
//   email: {
//     nextStep: undefined,
//   },
//   phone_number: {
//     nextStep: undefined,
//   },
// };

// const defaultNonVer: BasicAttributes = {
//   name: {
//     isUpdated: false,
//   },
//   nickname: {
//     isUpdated: false,
//   },
//   locale: {
//     isUpdated: false,
//   },
//   profile: {
//     isUpdated: false,
//   },
//   picture: {
//     isUpdated: false,
//   },
//   given_name: {
//     isUpdated: false,
//   },
//   family_name: {
//     isUpdated: false,
//   },
//   middle_name: {
//     isUpdated: false,
//   },
//   birthdate: {
//     isUpdated: false,
//   },
//   website: {
//     isUpdated: false,
//   },
//   address: {
//     isUpdated: false,
//   },
//   updated_at: {
//     isUpdated: false,
//   },
//   gender: {
//     isUpdated: false,
//   },
//   preferred_username: {
//     isUpdated: false,
//   },
//   sub: {
//     isUpdated: false,
//   },
//   zoneinfo: {
//     isUpdated: false,
//   },
//   email_verified: {
//     isUpdated: false,
//   },
//   phone_number_verified: {
//     isUpdated: false,
//   },
// };
