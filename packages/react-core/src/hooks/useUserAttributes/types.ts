import { UpdateUserAttributesInput, UserAttributeKey } from '@aws-amplify/auth';
import { DataState } from '../useDataState';

interface VerifiableAttribute {
  name: 'email' | 'phone_number';
  codeDeliveryDetails?: {
    destination?: string;
    medium?: string;
  };
  currentValue?: string;
}

export interface AttributeState {
  attributes: { [Attribute in UserAttributeKey]?: string };
  pendingVerification: undefined | VerifiableAttribute[];
  confirmStatus: {
    isLoading: boolean;
    hasError: boolean;
    message: string | undefined;
  };
  deleteStatus: {
    isLoading: boolean;
    hasError: boolean;
    message: string | undefined;
  };
  fetchStatus: {
    isLoading: boolean;
    hasError: boolean;
    message: string | undefined;
  };
  sendCodeStatus: {
    isLoading: boolean;
    hasError: boolean;
    message: string | undefined;
  };
  updateStatus: {
    isLoading: boolean;
    hasError: boolean;
    message: string | undefined;
  };
}

export type UseUpdateUserAttributes = [
  DataState<UpdateData>,
  (input: UpdateUserAttributesInput) => void,
];

export type UpdateData = {
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

// what does a deleted attr value look like? e.g. is a string or undefined
export type AttributeHandler = <T extends HandlerInputs>(input: T) => void;

export interface FetchInput {
  type: 'FETCH';
}

export interface DeleteInput {
  type: 'DELETE';
  data: {
    userAttributeKeys: [UserAttributeKey, ...UserAttributeKey[]];
  };
}

export interface UpdateInput {
  type: 'UPDATE';
  data: {
    userAttributes: { [Attribute in UserAttributeKey]?: string };
  };
}

export interface ConfirmInput {
  type: 'CONFIRM';
  data: {
    userAttributeKey: 'email' | 'phone_number';
    confirmationCode: string;
  };
}

export interface SendCodeInput {
  type: 'SEND_CODE';
  data: {
    userAttributeKey: 'email' | 'phone_number';
  };
}

export const sendCodeInput: SendCodeInput = {
  type: 'SEND_CODE',
  data: {
    userAttributeKey: 'email',
  },
};

export type HandlerInputs =
  | SendCodeInput
  | FetchInput
  | ConfirmInput
  | DeleteInput
  | UpdateInput;

export type UseUserAttributes = () => [AttributeState, AttributeHandler];
