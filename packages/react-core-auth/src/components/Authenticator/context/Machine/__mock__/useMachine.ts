import type { NextAuthenticatorServiceFacade } from '@aws-amplify/ui';
import type { UseMachine } from '../types';

const challengeName = 'CUSTOM_CHALLENGE';
const codeDeliveryDetails = undefined;
const errorMessage = 'error';
const federatedProviders = undefined;
const handleSubmit = jest.fn();
const isPending = false;
const resendConfirmationCode = jest.fn();
const route = 'idle';
const setRoute = jest.fn();
const skipAttributeVerification = jest.fn();
const toFederatedSignIn = jest.fn();
const totpSecretCode = undefined;
const unverifiedUserAttributes = {};
const allowedMfaTypes = undefined;

export const mockMachineContext: NextAuthenticatorServiceFacade = {
  challengeName,
  codeDeliveryDetails,
  errorMessage,
  federatedProviders,
  handleSubmit,
  isPending,
  loginMechanism: 'username',
  resendConfirmationCode,
  route,
  setRoute,
  skipAttributeVerification,
  toFederatedSignIn,
  totpSecretCode,
  unverifiedUserAttributes,
  username: 'Charles',
  allowedMfaTypes,
};

export const mockUseMachineOutput: UseMachine = mockMachineContext;
