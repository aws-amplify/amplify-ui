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
} from "@aws-amplify/auth";

import { Hub } from "@aws-amplify/core";

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
  return typeof input === "object" && input !== null;
}

function isUpdateUserAttributesInput(
  input: AttributeManagementInputs
): input is UpdateUserAttributesInput {
  return (
    typeof input === "object" && input !== null && "userAttributes" in input
  );
}

function isConfirmUserAttributeInput(
  input: AttributeManagementInputs
): input is ConfirmUserAttributeInput {
  return (
    typeof input === "object" &&
    input !== null &&
    "userAttributeKey" in input &&
    "confirmationCode" in input
  );
}
function isSendUserAttributeVerificationCodeInput(
  input: AttributeManagementInputs
): input is SendUserAttributeVerificationCodeInput {
  return (
    typeof input === "object" && input !== null && "userAttributeKey" in input
  );
}

// Actions passed to useDataState
export const deleteUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof deleteUserAttributes>>,
  input: DeleteUserAttributesInput
) => {
  if (!isDeleteUserAttributesInput(input)) {
    throw new Error("Invalid DeleteUserAttributesInput");
  } else {
    try {
      const result = await deleteUserAttributes(input);
      Hub.dispatch("ui", {
        event: "FETCH_ATTRIBUTES",
        message: "attributes deleted successfully",
      });
      return result;
    } catch (error) {
      Hub.dispatch("ui", {
        event: "attributesUpdateFailure",
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
    throw new Error("Invalid UpdateUserAttributesInput");
  } else {
    try {
      const result = await updateUserAttributes(input);
      Hub.dispatch("ui", {
        event: "FETCH_ATTRIBUTES",
        message: "attributes updated successfully",
      });
      return result;
    } catch (error) {
      Hub.dispatch("ui", {
        event: "attributesUpdateFailure",
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
    throw new Error("Invalid ConfirmUserAttributeInput");
  } else {
    try {
      const result = await confirmUserAttribute(input);
      Hub.dispatch("ui", {
        event: "FETCH_ATTRIBUTES",
        message: "attributes confirmed successfully",
      });
      return result;
    } catch (error) {
      Hub.dispatch("ui", {
        event: "attributesUpdateFailure",
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
    throw new Error("Invalid SendUserAttributeVerificationCodeInput");
  } else {
    try {
      const result = await sendUserAttributeVerificationCode(input);
      Hub.dispatch("ui", {
        event: "FETCH_ATTRIBUTES",
        message: "attributes confirmed successfully",
      });
      return result;
    } catch (error) {
      Hub.dispatch("ui", {
        event: "attributesUpdateFailure",
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
  console.log(input); // to avoid unused vars
  try {
    const result = await fetchUserAttributes();
    return result;
  } catch (error) {
    Hub.dispatch("ui", {
      event: "attributesUpdateFailure",
      message: error as string,
    });
    throw error;
  }
};
