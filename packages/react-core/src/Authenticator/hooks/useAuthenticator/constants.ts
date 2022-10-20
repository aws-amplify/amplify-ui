import { AuthenticatorRouteComponentKey } from './types';

export const USE_AUTHENTICATOR_ERROR =
  '`useAuthenticator` must be used inside an `Authenticator.Provider`.';

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
  'verifyUser',
];
