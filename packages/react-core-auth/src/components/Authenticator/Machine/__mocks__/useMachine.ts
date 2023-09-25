import { NextAuthenticatorServiceFacade } from '@aws-amplify/ui';
import { UseMachine } from '../types';

const challengeName = 'CUSTOM_CHALLENGE';
const codeDeliveryDetails = undefined;
const errorMessage = 'error';
const federatedProviders = undefined;
const isPending = false;
const resendCode = jest.fn();
const route = 'idle';
const setRoute = jest.fn();
const skipVerification = jest.fn();
const submitForm = jest.fn();
const toFederatedSignIn = jest.fn();
const totpSecretCode = undefined;
const unverifiedContactMethods = {};

export const mockMachineContext: NextAuthenticatorServiceFacade = {
  challengeName,
  codeDeliveryDetails,
  errorMessage,
  federatedProviders,
  isPending,
  loginMechanism: 'username',
  resendCode,
  route,
  setRoute,
  skipVerification,
  submitForm,
  toFederatedSignIn,
  totpSecretCode,
  unverifiedContactMethods,
  username: 'Charles',
};

export const mockUseMachineOutput: UseMachine = mockMachineContext;
