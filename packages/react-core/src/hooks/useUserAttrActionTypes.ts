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

// Describes JS APIs
export interface Actions {
  confirm: typeof confirmUserAttribute;
  delete: typeof deleteUserAttributes;
  sendVerificationCode: typeof sendUserAttributeVerificationCode;
  update: typeof updateUserAttributes;
  fetch: typeof fetchUserAttributes;
}

// Describes inputs to handleActions
export interface HandlerInputs {
  confirm: ConfirmUserAttributeInput;
  delete: DeleteUserAttributesInput;
  fetch: undefined; // no input for fetch
  sendVerificationCode: SendUserAttributeVerificationCodeInput;
  update: UpdateUserAttributesInput;
}

// Describes state.data for each action
export interface StateDataTypes {
  confirm: undefined | void;
  delete: undefined | void;
  fetch: FetchUserAttributesOutput | undefined | void;
  sendVerificationCode:
    | SendUserAttributeVerificationCodeOutput
    | undefined
    | void;
  update: UpdateUserAttributesOutput | undefined | void;
}

// OR of all possible handleAction inputs
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

export const fetchUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof fetchUserAttributes>>,
  input: null
): Promise<FetchUserAttributesOutput> => {
  if (input !== null) {
    throw new Error('Invalid input');
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

export type UserAttributes = Record<UserAttributeKey, string | undefined>;

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
  ['custom:placeholder']: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  address: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  birthdate: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  email_verified: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  family_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  gender: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  given_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  locale: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  middle_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  nickname: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  phone_number_verified: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  picture: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  preferred_username: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  profile: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  sub: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  updated_at: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  website: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  zoneinfo: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  email: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
  phone_number: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: 'DONE',
    },
  },
};
// Default object to be passed into useDataState
export const defaultSendUserAttributeVerificationCodeOutput: SendUserAttributeVerificationCodeOutput =
  {
    attributeName: 'email',
    deliveryMedium: 'EMAIL',
    destination: 'a***@b.com',
  };
