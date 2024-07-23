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
} from './types';

const confirmAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributeKey, confirmationCode }: ConfirmInput
): Promise<HandleAttributeActionOutput> => {
  await confirmUserAttribute({ userAttributeKey, confirmationCode });
  const attributes = await fetchUserAttributes();
  return {
    ...prevResult,
    attributes,
    pendingVerification: [{ name: userAttributeKey }],
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
  return {
    ...prevResult,
    pendingVerification: [
      {
        name: userAttributeKey,
        codeDeliveryDetails: {
          destination: result.destination,
          medium: result.deliveryMedium,
        },
      },
    ],
  };
};

const updateAction = async (
  prevResult: HandleAttributeActionOutput,
  { userAttributes }: UpdateInput
): Promise<HandleAttributeActionOutput> => {
  const updates = await updateUserAttributes({ userAttributes });
  const attributes = await fetchUserAttributes();
  if (updates.email && updates.phone_number) {
    return {
      ...prevResult,
      attributes,
      pendingVerification: [
        {
          name: 'email',
          codeDeliveryDetails: {
            destination:
              updates.email.nextStep.codeDeliveryDetails?.destination,
            medium: updates.email.nextStep.codeDeliveryDetails?.deliveryMedium,
          },
        },
        {
          name: 'phone_number',
          codeDeliveryDetails: {
            destination:
              updates.phone_number.nextStep.codeDeliveryDetails?.destination,
            medium:
              updates.phone_number.nextStep.codeDeliveryDetails?.deliveryMedium,
          },
        },
      ],
    };
  } else if (updates.email && !updates.phone_number) {
    return {
      ...prevResult,
      attributes,
      pendingVerification: [
        {
          name: 'email',
          codeDeliveryDetails: {
            destination:
              updates.email.nextStep.codeDeliveryDetails?.destination,
            medium: updates.email.nextStep.codeDeliveryDetails?.deliveryMedium,
          },
        },
      ],
    };
  } else if (!updates.email && updates.phone_number) {
    return {
      ...prevResult,
      attributes,
      pendingVerification: [
        {
          name: 'phone_number',
          codeDeliveryDetails: {
            destination:
              updates.phone_number.nextStep.codeDeliveryDetails?.destination,
            medium:
              updates.phone_number.nextStep.codeDeliveryDetails?.deliveryMedium,
          },
        },
      ],
    };
  } else {
    return {
      ...prevResult,
      attributes,
    };
  }
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
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'Unknown failure');
  }
}
