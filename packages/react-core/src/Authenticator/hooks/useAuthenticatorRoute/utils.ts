import { AuthenticatorRoute } from '@aws-amplify/ui';

import { AuthenticatorRouteComponentKey } from '../types';
import { isComponentRouteKey } from '../utils';
import {
  ConfirmSignInSelector,
  RouteSelector,
  SetupTOTPSelector,
} from './types';

// selects nothing
const defaultSelector = () => [];

const confirmSignInSelector: ConfirmSignInSelector = ({
  error,
  isPending,
  toSignIn,
  user,
}) => [error, isPending, toSignIn, user];

const setupTOTPSelector: SetupTOTPSelector = ({ error, isPending, user }) => [
  error,
  isPending,
  user,
];

const routeSelectors: Record<AuthenticatorRouteComponentKey, RouteSelector> = {
  confirmSignIn: confirmSignInSelector,
  setupTOTP: setupTOTPSelector,

  // TODO: replace with route specific selector
  confirmResetPassword: defaultSelector,
  signIn: defaultSelector,
  signUp: defaultSelector,
  forceNewPassword: defaultSelector,
  confirmSignUp: defaultSelector,
  confirmVerifyUser: defaultSelector,
  resetPassword: defaultSelector,
};

export const getRouteSelector = (route: AuthenticatorRoute): RouteSelector =>
  isComponentRouteKey(route) ? routeSelectors[route] : defaultSelector;
