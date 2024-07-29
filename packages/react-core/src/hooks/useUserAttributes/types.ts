import { UserAttributeKey } from '@aws-amplify/auth';

import { DataState } from '../useDataState';

export interface VerifiableAttribute {
  name: 'email' | 'phone_number';
  codeDeliveryDetails: {
    destination: string;
    medium: string;
  };
}

export interface FetchInput {
  type: 'FETCH';
}

export interface DeleteInput {
  type: 'DELETE';
  userAttributeKeys: UserAttributeKey[];
}

export interface UpdateInput {
  type: 'UPDATE';
  userAttributes: { [Attribute in UserAttributeKey]?: string };
}

export interface ConfirmInput {
  type: 'CONFIRM';
  userAttributeKey: 'email' | 'phone_number';
  confirmationCode: string;
}

export interface SendCodeInput {
  type: 'SEND_CODE';
  userAttributeKey: 'email' | 'phone_number';
}

export type HandleAttributeActionInput =
  | DeleteInput
  | FetchInput
  | SendCodeInput
  | ConfirmInput
  | UpdateInput;

export interface HandleAttributeActionOutput {
  attributes: { [Attribute in UserAttributeKey]?: string };
  pendingVerification: undefined | VerifiableAttribute[];
}

export type UseUserAttributesState = [
  DataState<HandleAttributeActionOutput>,
  (input: HandleAttributeActionInput) => void,
];
