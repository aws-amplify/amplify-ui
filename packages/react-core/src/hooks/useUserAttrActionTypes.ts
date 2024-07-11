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
  UpdateUserAttributesOutput,
  UserAttributeKey,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from './useDataState';

export interface ActionState<T> {
  /**
   * action data
   */
  data: T;
  /**
   * indicates whether action is running
   */
  isLoading: boolean;
  /**
   * error message
   */
  message: string | undefined;
}

// Describes JS APIs
export interface Actions {
  confirm: typeof confirmUserAttribute;
  delete: typeof deleteUserAttributes;
  sendVerificationCode: typeof sendUserAttributeVerificationCode;
  update: typeof updateUserAttributes;
  fetch: typeof fetchUserAttributes;
}

// OR of all possible handleAction inputs - used to confirm input type
export type AttributeManagementInputs =
  | ConfirmUserAttributeInput
  | DeleteUserAttributesInput
  | SendUserAttributeVerificationCodeInput
  | UpdateUserAttributesInput
  | null;

// Functions to verify correct input type to handleAction
function isDeleteUserAttributesInput(
  input: AttributeManagementInputs
): input is DeleteUserAttributesInput {
  return typeof input === 'object' && input !== null;
}

function isUpdateUserAttributesInput(
  input: AttributeManagementInputs
): input is UpdateUserAttributesInput {
  return (
    typeof input === 'object' && input !== null && 'userAttributes' in input
  );
}

function isConfirmUserAttributeInput(
  input: AttributeManagementInputs
): input is ConfirmUserAttributeInput {
  return (
    typeof input === 'object' &&
    input !== null &&
    'userAttributeKey' in input &&
    'confirmationCode' in input
  );
}
function isSendUserAttributeVerificationCodeInput(
  input: AttributeManagementInputs
): input is SendUserAttributeVerificationCodeInput {
  return (
    typeof input === 'object' && input !== null && 'userAttributeKey' in input
  );
}
function isFetchUserAttributesInput(
  input: AttributeManagementInputs
): input is null {
  return input === null;
}

// Actions passed to useDataState
export const deleteUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof deleteUserAttributes>>,
  input: DeleteUserAttributesInput
): Promise<void> => {
  if (!isDeleteUserAttributesInput(input)) {
    throw new Error('Invalid DeleteUserAttributesInput');
  } else {
    try {
      const result = await deleteUserAttributes(input);
      Hub.dispatch('ui', {
        event: 'FETCH_ATTRIBUTES',
        message: 'attributes deleted successfully',
      });
      return result;
    } catch (error) {
      Hub.dispatch('ui', {
        event: 'attributesUpdateFailure',
        message: error as string,
      });
    }
  }
};

type UseDeleteUserAttributes = [
  ActionState<void>,
  (input: DeleteUserAttributesInput) => void,
];

export const useDeleteUserAttributes = (): UseDeleteUserAttributes =>
  useDataState(deleteUserAttributesAction, undefined);

export const updateUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof updateUserAttributes>>,
  input: UpdateUserAttributesInput
): Promise<UpdateUserAttributesOutput> => {
  if (!isUpdateUserAttributesInput(input)) {
    throw new Error('Invalid UpdateUserAttributesInput');
  } else {
    try {
      const result = await updateUserAttributes(input);
      Hub.dispatch('ui', {
        event: 'FETCH_ATTRIBUTES',
        message: 'attributes updated successfully',
      });
      return result;
    } catch (error) {
      Hub.dispatch('ui', {
        event: 'attributesUpdateFailure',
        message: error as string,
      });
      throw error;
    }
  }
};

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
export const defaultUpdateUserAttributesOutput: UpdateUserAttributesOutput = {
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

type UseUpdateUserAttributes = [
  ActionState<UpdateUserAttributesOutput>,
  (input: UpdateUserAttributesInput) => void,
];

export const useUpdateUserAttributes = (): UseUpdateUserAttributes =>
  useDataState(updateUserAttributesAction, defaultUpdateUserAttributesOutput);

export const confirmUserAttributeAction = async (
  _prev: Awaited<ReturnType<typeof confirmUserAttribute>>,
  input: ConfirmUserAttributeInput
): Promise<void> => {
  if (!isConfirmUserAttributeInput(input)) {
    throw new Error('Invalid ConfirmUserAttributeInput');
  } else {
    try {
      const result = await confirmUserAttribute(input);
      Hub.dispatch('ui', {
        event: 'FETCH_ATTRIBUTES',
        message: 'attributes confirmed successfully',
      });
      return result;
    } catch (error) {
      Hub.dispatch('ui', {
        event: 'attributesUpdateFailure',
        message: error as string,
      });
    }
  }
};

type UseConfirmUserAttribute = [
  ActionState<void>,
  (input: ConfirmUserAttributeInput) => void,
];

export const useConfirmUserAttribute = (): UseConfirmUserAttribute =>
  useDataState(confirmUserAttributeAction, undefined);

export const sendUserAttributeVerificationCodeAction = async (
  _prev: Awaited<ReturnType<typeof sendUserAttributeVerificationCode>>,
  input: SendUserAttributeVerificationCodeInput
): Promise<SendUserAttributeVerificationCodeOutput> => {
  if (!isSendUserAttributeVerificationCodeInput(input)) {
    throw new Error('Invalid SendUserAttributeVerificationCodeInput');
  } else {
    try {
      const result = await sendUserAttributeVerificationCode(input);
      Hub.dispatch('ui', {
        event: 'FETCH_ATTRIBUTES',
        message: 'attributes confirmed successfully',
      });
      return result;
    } catch (error) {
      Hub.dispatch('ui', {
        event: 'attributesUpdateFailure',
        message: error as string,
      });
      throw error;
    }
  }
};
// Default object to be passed into useDataState
export const defaultSendUserAttributeVerificationCodeOutput: SendUserAttributeVerificationCodeOutput =
  {
    attributeName: 'email',
    deliveryMedium: 'EMAIL',
    destination: 'a***@b.com',
  };

type UseSendUserAttributeVerificationCode = [
  ActionState<SendUserAttributeVerificationCodeOutput>,
  (input: SendUserAttributeVerificationCodeInput) => void,
];

export const useSendUserAttributeVerificationCode =
  (): UseSendUserAttributeVerificationCode =>
    useDataState(
      sendUserAttributeVerificationCodeAction,
      defaultSendUserAttributeVerificationCodeOutput
    );

export const fetchUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof fetchUserAttributes> | undefined>,
  input: null
): Promise<FetchUserAttributesOutput> => {
  if (!isFetchUserAttributesInput(input)) {
    throw new Error('Invalid FetchUserAttributesInput');
  }
  try {
    const result = await fetchUserAttributes();
    return result;
  } catch (error) {
    Hub.dispatch('ui', {
      event: 'attributesUpdateFailure',
      message: error as string,
    });
    throw error;
  }
};

type UseFetchUserAttributes = [
  ActionState<FetchUserAttributesOutput | undefined>,
  (input: null) => void,
];

export const useFetchUserAttributes = (): UseFetchUserAttributes =>
  useDataState(fetchUserAttributesAction, undefined);

export interface UseActions {
  confirm: UseConfirmUserAttribute;
  delete: UseDeleteUserAttributes;
  fetch: UseFetchUserAttributes;
  sendVerificationCode: UseSendUserAttributeVerificationCode;
  update: UseUpdateUserAttributes;
}

export type UserAttributes = Record<UserAttributeKey, string | undefined>;
