import { NextAuthenticatorServiceFacade } from '@aws-amplify/ui';
import { UseMachine } from '../types';

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
const unverifiedContactMethods = {};

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
  unverifiedContactMethods,
  username: 'Charles',
};

export const mockUseMachineOutput: UseMachine = mockMachineContext;
