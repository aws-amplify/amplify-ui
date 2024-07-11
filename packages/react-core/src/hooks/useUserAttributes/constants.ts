import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
  deleteUserAttributes,
  DeleteUserAttributesInput,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
  updateUserAttributes,
  UpdateUserAttributesInput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import {
  UserAttributes,
  UseConfirmUserAttribute,
  UseDeleteUserAttributes,
  UseFetchUserAttributes,
  UseSendUserAttributeVerificationCode,
  UseUpdateUserAttributes,
  UpdateAttributesOutput,
} from './types';

import useDataState from '../useDataState';

export const DefaultAttributes: UserAttributes = {
  email: undefined,
  phone_number: undefined,
  address: undefined,
  birthdate: undefined,
  email_verified: undefined,
  family_name: undefined,
  gender: undefined,
  given_name: undefined,
  locale: undefined,
  middle_name: undefined,
  name: undefined,
  nickname: undefined,
  phone_number_verified: undefined,
  picture: undefined,
  preferred_username: undefined,
  profile: undefined,
  sub: undefined,
  updated_at: undefined,
  website: undefined,
  zoneinfo: undefined,
};

// Default object to be passed into useDataState
export const defaultUpdateUserAttributesOutput: UpdateAttributesOutput = {
  address: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  birthdate: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  email_verified: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  family_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  gender: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  given_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  locale: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  middle_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  nickname: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  phone_number_verified: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  picture: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  preferred_username: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  profile: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  sub: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  updated_at: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  website: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  zoneinfo: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  email: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  phone_number: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
};

export const deleteUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof deleteUserAttributes>>,
  input: DeleteUserAttributesInput
): Promise<void> => {
  try {
    const result = await deleteUserAttributes(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes deleted successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to delete user attributes: ${error}`);
  }
};

export const useDeleteUserAttributes = (): UseDeleteUserAttributes =>
  useDataState(deleteUserAttributesAction, undefined);

export const updateUserAttributesAction = async (
  _prev: Awaited<UpdateAttributesOutput>,
  input: UpdateUserAttributesInput
): Promise<UpdateAttributesOutput> => {
  try {
    const result = await updateUserAttributes(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes updated successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to update user attributes: ${error}`);
  }
};

export const useUpdateUserAttributes = (): UseUpdateUserAttributes =>
  useDataState(updateUserAttributesAction, defaultUpdateUserAttributesOutput);

export const confirmUserAttributeAction = async (
  _prev: Awaited<ReturnType<typeof confirmUserAttribute>>,
  input: ConfirmUserAttributeInput
): Promise<void> => {
  try {
    const result = await confirmUserAttribute(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes confirmed successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to confirm user attributes: ${error}`);
  }
};

export const useConfirmUserAttribute = (): UseConfirmUserAttribute =>
  useDataState(confirmUserAttributeAction, undefined);

export const sendUserAttributeVerificationCodeAction = async (
  _prev: Awaited<ReturnType<typeof sendUserAttributeVerificationCode>>,
  input: SendUserAttributeVerificationCodeInput
): Promise<SendUserAttributeVerificationCodeOutput> => {
  try {
    const result = await sendUserAttributeVerificationCode(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes confirmed successfully',
    });
    return result;
  } catch (error) {
    throw new Error(
      `Failed to send user attribute verification code: ${error}`
    );
  }
};
// Default object to be passed into useDataState
export const defaultSendUserAttributeVerificationCodeOutput: SendUserAttributeVerificationCodeOutput =
  {
    attributeName: 'email',
    deliveryMedium: 'EMAIL',
    destination: 'a***@b.com',
  };

export const useSendUserAttributeVerificationCode =
  (): UseSendUserAttributeVerificationCode =>
    useDataState(
      sendUserAttributeVerificationCodeAction,
      defaultSendUserAttributeVerificationCodeOutput
    );

export const fetchUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof fetchUserAttributes> | undefined>
): Promise<FetchUserAttributesOutput> => {
  try {
    const result = await fetchUserAttributes();
    return result;
  } catch (error) {
    throw new Error(`Failed to fetch user attributes: ${error}`);
  }
};

export const useFetchUserAttributes = (): UseFetchUserAttributes =>
  useDataState(fetchUserAttributesAction, undefined);
