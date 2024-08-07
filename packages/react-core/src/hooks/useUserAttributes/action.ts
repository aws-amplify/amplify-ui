import {
  confirmUserAttribute,
  deleteUserAttributes,
  fetchUserAttributes,
  sendUserAttributeVerificationCode,
  updateUserAttributes,
  UserAttributeKey,
} from '@aws-amplify/auth';

import {
  ConfirmInput,
  DeleteInput,
  FetchInput,
  HandleAttributeActionInput,
  HandleAttributeActionOutput,
  SendCodeInput,
  UpdateInput,
  VerifiableAttribute,
} from './types';
import { UpdateUserAttributesOutput } from 'aws-amplify/auth';

const getVerifiableAttribute = (
  attributes: UpdateUserAttributesOutput,
  name: 'email' | 'phone_number'
): VerifiableAttribute | undefined => {
  const attribute = attributes[name];
  if (
    attribute?.nextStep?.codeDeliveryDetails &&
    attribute.nextStep.updateAttributeStep === 'CONFIRM_ATTRIBUTE_WITH_CODE'
  ) {
    const { deliveryMedium, destination } =
      attribute.nextStep.codeDeliveryDetails;
    return {
      name,
      codeDeliveryDetails: {
        medium: deliveryMedium as string,
        destination: destination as string,
      },
    };
  }
};

const confirmAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributeKey, confirmationCode }: ConfirmInput
): Promise<HandleAttributeActionOutput> => {
  await confirmUserAttribute({ userAttributeKey, confirmationCode });
  const attributes = await fetchUserAttributes();
  const updatedPendingVerification = prevResult.pendingVerification
    ? prevResult.pendingVerification.filter(
        (attribute) => attribute.name !== userAttributeKey
      )
    : [];

  return {
    ...prevResult,
    attributes,
    pendingVerification:
      updatedPendingVerification.length > 0
        ? updatedPendingVerification
        : undefined,
  };
};

const deleteAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributeKeys }: DeleteInput
): Promise<HandleAttributeActionOutput> => {
  // cast due to underlying API interface forcing a non-idiomatic
  // structure of `userAttributeKeys`
  await deleteUserAttributes({ userAttributeKeys } as {
    userAttributeKeys: [UserAttributeKey, ...UserAttributeKey[]];
  });
  const attributes = await fetchUserAttributes();
  return { ...prevResult, attributes };
};

const fetchAction = async (
  prevResult: HandleAttributeActionOutput,
  _: FetchInput
): Promise<HandleAttributeActionOutput> => {
  const attributes = await fetchUserAttributes();
  return { ...prevResult, attributes };
};

const sendCodeAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributeKey }: SendCodeInput
): Promise<HandleAttributeActionOutput> => {
  const result = await sendUserAttributeVerificationCode({ userAttributeKey });

  if (!result.attributeName || !result.deliveryMedium || !result.destination) {
    throw new Error('No code delivery');
  } else {
    const pendingAttribute: VerifiableAttribute = {
      name: result.attributeName,
      codeDeliveryDetails: {
        destination: result.destination,
        medium: result.deliveryMedium,
      },
    };

    const updatedPendingVerification = prevResult.pendingVerification
      ? prevResult.pendingVerification
          .filter((attribute) => attribute.name !== pendingAttribute.name)
          .concat(pendingAttribute)
      : [pendingAttribute];

    return {
      ...prevResult,
      pendingVerification: updatedPendingVerification,
    };
  }
};

const updateAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributes }: UpdateInput
): Promise<HandleAttributeActionOutput> => {
  const updates = await updateUserAttributes({ userAttributes });
  const attributes = await fetchUserAttributes();

  const pendingEmail = getVerifiableAttribute(updates, 'email');
  const pendingPhoneNumber = getVerifiableAttribute(updates, 'phone_number');

  const pendingVerification = [
    ...(pendingEmail ? [pendingEmail] : []),
    ...(pendingPhoneNumber ? [pendingPhoneNumber] : []),
  ].filter(
    (attribute): attribute is VerifiableAttribute => attribute !== undefined
  );

  const updatedPendingVerification = prevResult.pendingVerification
    ? [...prevResult.pendingVerification, ...pendingVerification]
    : [...pendingVerification];

  return {
    ...prevResult,
    attributes,
    pendingVerification: updatedPendingVerification,
  };
};

export async function handleAttributeAction(
  prevResult: HandleAttributeActionOutput,
  input: HandleAttributeActionInput
): Promise<HandleAttributeActionOutput> {
  switch (input.type) {
    case 'FETCH': {
      const result = await fetchAction(prevResult, input);
      return result;
    }
    case 'DELETE': {
      const result = await deleteAction(prevResult, input);
      return result;
    }
    case 'CONFIRM': {
      const result = await confirmAction(prevResult, input);
      return result;
    }
    case 'SEND_CODE': {
      const result = await sendCodeAction(prevResult, input);
      return result;
    }
    case 'UPDATE': {
      const result = await updateAction(prevResult, input);
      return result;
    }
    default:
      throw new Error('Invalid Type');
  }
}
