import { AuthenticatorRoute } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';

import { AuthenticatorRouteComponentKey } from '../types';
import { UseAuthenticator } from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import {
  ConfirmSignInSelector,
  RouteSelector,
  SetupTOTPSelector,
  UseAuthenticatorRoute,
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
  verifyUser: defaultSelector,
};

export const getRouteSelector = (route: AuthenticatorRoute): RouteSelector =>
  isComponentRouteKey(route) ? routeSelectors[route] : defaultSelector;

export function resolveConfirmSignIn<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>['Component'],
  { error, fields, isPending, toSignIn, user }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'> {
  const { Footer, FormFields, Header } = Component;
  return {
    Component,
    props: {
      challengeName: user.challengeName!,
      error,
      fields,
      Footer,
      FormFields,
      Header,
      isPending,
      toSignIn,
    },
  };
}

export function resolveSetupTOTP<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>['Component'],
  { error, fields, getTotpSecretCode, isPending, user }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'> {
  const { Footer, FormFields, Header } = Component;
  return {
    Component,
    props: {
      error,
      fields,
      Footer,
      FormFields,
      getTotpSecretCode,
      Header,
      isPending,
      totpUsername: user.username!,
      totpIssuer: 'AWSCognito',
    },
  };
}

export function resolveDefault<
  PlatformProps = {}
>(): UseAuthenticatorRoute<PlatformProps> {
  return {
    Component: RenderNothing,
    props: {},
  } as UseAuthenticatorRoute<PlatformProps>;
}
