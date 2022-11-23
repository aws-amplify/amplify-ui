import {
  AuthenticatorLegacyFields,
  AuthenticatorMachineContext,
} from '../../types';
import { UseAuthenticator } from '../types';

const authStatus = 'unauthenticated';
const challengeName = 'CUSTOM_CHALLENGE';
const codeDeliveryDetails =
  {} as AuthenticatorMachineContext['codeDeliveryDetails'];
const error = 'error';
const fields = [] as AuthenticatorLegacyFields;
const getTotpSecretCode = jest.fn();
const hasValidationErrors = false;
const initializeMachine = jest.fn();
const isPending = false;
const resendCode = jest.fn();
const route = 'idle';
const skipVerification = jest.fn();
const signOut = jest.fn();
const socialProviders = [] as AuthenticatorMachineContext['socialProviders'];
const submitForm = jest.fn();
const toFederatedSignIn = jest.fn();
const toResetPassword = jest.fn();
const toSignIn = jest.fn();
const toSignUp = jest.fn();
const unverifiedContactMethods = {};
const updateBlur = jest.fn();
const updateForm = jest.fn();
const validationErrors = {};

const user = {
  challengeName,
} as AuthenticatorMachineContext['user'];

export const mockMachineContext: AuthenticatorMachineContext = {
  authStatus,
  codeDeliveryDetails,
  error,
  hasValidationErrors,
  initializeMachine,
  isPending,
  resendCode,
  route,
  signOut,
  submitForm,
  updateForm,
  toSignIn,
  toSignUp,
  updateBlur,
  user,
  skipVerification,
  socialProviders,
  toFederatedSignIn,
  toResetPassword,
  unverifiedContactMethods,
  validationErrors,
};

export const mockUseAuthenticatorOutput: UseAuthenticator = {
  ...mockMachineContext,
  fields,
  getTotpSecretCode,
} as unknown as UseAuthenticator;
