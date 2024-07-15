import {
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from '../useDataState';
import { UseSendUserAttributeVerificationCode } from './types';

export const sendUserAttributeVerificationCodeAction = async (
  _prev: Awaited<
    ReturnType<typeof sendUserAttributeVerificationCode> | undefined
  >,
  input: SendUserAttributeVerificationCodeInput
): Promise<SendUserAttributeVerificationCodeOutput | undefined> => {
  try {
    const result = await sendUserAttributeVerificationCode(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes confirmed successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`${error}`);
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
    useDataState(sendUserAttributeVerificationCodeAction, undefined);
