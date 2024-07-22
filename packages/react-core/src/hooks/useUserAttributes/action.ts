import {
  confirmUserAttribute,
  deleteUserAttributes,
  fetchUserAttributes,
  sendUserAttributeVerificationCode,
  updateUserAttributes,
  UserAttributeKey,
} from '@aws-amplify/auth';

import useDataState, { DataState } from '../useDataState';

interface VerifiableAttribute {
  name: 'email' | 'phone_number';
  codeDeliveryDetails?: {
    destination?: string;
    medium?: string;
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

export type HandleAttributeActionInput = DeleteInput | FetchInput;
// | SendCodeInput
// | ConfirmInput
// | UpdateInput;
export interface HandleAttributeActionOutput {
  attributes: { [Attribute in UserAttributeKey]?: string };
  pendingVerification: undefined | VerifiableAttribute[];
}

export type UseUserAttributesState = [
  DataState<HandleAttributeActionOutput>,
  (input: HandleAttributeActionInput) => void,
];

const fetchAction = async (
  prevResult: HandleAttributeActionOutput,
  _: FetchInput
): Promise<HandleAttributeActionOutput> => {
  const attributes = await fetchUserAttributes();
  return { ...prevResult, attributes };
};

const deleteAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributeKeys }: DeleteInput
) => {
  // cast due to underlying API interface forcing a non-idiomatic
  // structure of `userAttributeKeys`
  await deleteUserAttributes({ userAttributeKeys } as {
    userAttributeKeys: [UserAttributeKey, ...UserAttributeKey[]];
  });
  const attributes = await fetchUserAttributes();
  return { ...prevResult, attributes };
};

export async function handleAttributeAction(
  prevResult: HandleAttributeActionOutput,
  input: HandleAttributeActionInput
): Promise<HandleAttributeActionOutput> {
  try {
    switch (input.type) {
      case 'FETCH': {
        const result = await fetchAction(prevResult, input);
        return result;
      }
      case 'DELETE': {
        const result = await deleteAction(prevResult, input);
        return result;
      }
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'Unknown failure');
  }
}

export const useUserAttributes = (): UseUserAttributesState =>
  useDataState(handleAttributeAction, {
    attributes: {},
    pendingVerification: undefined,
  });
