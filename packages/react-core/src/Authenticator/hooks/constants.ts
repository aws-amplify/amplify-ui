import type {
  AuthenticatorRouteComponentKey,
  AuthenticatorRouteComponentName,
} from './types';

export const COMPONENT_ROUTE_KEYS: AuthenticatorRouteComponentKey[] = [
  'confirmResetPassword',
  'confirmSignIn',
  'confirmSignUp',
  'confirmVerifyUser',
  'forceNewPassword',
  'forgotPassword',
  'selectMfaType',
  'setupEmail',
  'setupTotp',
  'signIn',
  'signUp',
  'verifyUser',
];

export const COMPONENT_ROUTE_NAMES: AuthenticatorRouteComponentName[] = [
  'ConfirmResetPassword',
  'ConfirmSignIn',
  'ConfirmSignUp',
  'ConfirmVerifyUser',
  'ForceNewPassword',
  'ForgotPassword',
  'SelectMfaType',
  'SetupEmail',
  'SetupTotp',
  'SignIn',
  'SignUp',
  'VerifyUser',
];
