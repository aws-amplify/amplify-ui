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
const hasValidationErrors = false;
const initializeMachine = jest.fn();
const isPending = false;
const QRFields = null;
const resendCode = jest.fn();
const route = 'idle';
const skipVerification = jest.fn();
const signOut = jest.fn();
const socialProviders = [] as AuthenticatorMachineContext['socialProviders'];
const submitForm = jest.fn();
const toFederatedSignIn = jest.fn();
const toForgotPassword = jest.fn();
const toSignIn = jest.fn();
const toSignUp = jest.fn();
const totpSecretCode = null;
const unverifiedUserAttributes = {};
const updateBlur = jest.fn();
const updateForm = jest.fn();
const user = { username: 'username', userId: 'userId' };
const validationErrors = {};

export const mockMachineContext: AuthenticatorMachineContext = {
  authStatus,
  challengeName,
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
  toForgotPassword,
  totpSecretCode,

  unverifiedUserAttributes,
  username: 'george',
  validationErrors,
};

export const mockUseAuthenticatorOutput: UseAuthenticator = {
  ...mockMachineContext,
  fields,
  QRFields,
};
