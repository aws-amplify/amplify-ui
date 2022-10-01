import {
  AuthenticatorRouteComponentKey,
  AuthenticatorRouteComponentName,
} from './types';

export const COMPONENT_ROUTE_KEYS: AuthenticatorRouteComponentKey[] = [
  'signIn',
  'signUp',
  'forceNewPassword',
  'confirmResetPassword',
  'confirmSignIn',
  'confirmSignUp',
  'confirmVerifyUser',
  'resetPassword',
  'setupTOTP',
];

export const COMPONENT_ROUTE_NAMES: AuthenticatorRouteComponentName[] = [
  'ConfirmResetPassword',
  'ConfirmSignIn',
  'ConfirmSignUp',
  'ConfirmVerifyUser',
  'ForceNewPassword',
  'ResetPassword',
  'SetupTOTP',
  'SignIn',
  'SignUp',
];
