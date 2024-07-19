import { UpdateUserAttributesInput, UserAttributeKey } from '@aws-amplify/auth';

import { DataState } from '../useDataState';
import { updateUserAttributesAction } from './constants';

// Describes actions passed to useDataState
export interface Actions {
  update: typeof updateUserAttributesAction;
}

export type UseUpdateUserAttributes = [
  DataState<UpdateData>,
  (input: UpdateUserAttributesInput) => void,
];

// export type UpdateData =
//   | {
//       [Attribute in Exclude<UserAttributeKey, 'email' | 'phone_number'>]?: {
//         isUpdated: boolean;
//       };
//     }
//   | {
//       [Attribute in Extract<UserAttributeKey, 'email' | 'phone_number'>]?: {
//         nextStep:
//           | {
//               codeDeliveryDetails: {
//                 attributeName: 'email' | 'phone_number';
//                 deliveryMedium: string;
//                 destination: string;
//               };
//               updateAttributeStep: string;
//             }
//           | undefined;
//       };
//     };

export type UpdateData = {
  [Attribute in Extract<UserAttributeKey, 'email' | 'phone_number'>]?: {
    nextStep:
      | {
          codeDeliveryDetails?: {
            attributeName: 'email' | 'phone_number';
            deliveryMedium: string;
            destination: string;
          };
          updateAttributeStep: string;
        }
      | undefined;
  };
};
