import { AuthenticatorRoute } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';
import {
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentName,
} from '../types';

import {
  UseAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import { MACHINE_KEYS } from './constants';
import { UseAuthenticatorRoute } from './types';

// selects nothing
const defaultSelector = () => [];

const createSelector =
  (keys: AuthenticatorMachineContextKey[]): UseAuthenticatorSelector =>
  (context) =>
    keys.map((key) => context[key]);

export const getRouteSelector = (
  route: AuthenticatorRoute
): UseAuthenticatorSelector =>
  isComponentRouteKey(route)
    ? createSelector(MACHINE_KEYS[route])
    : defaultSelector;

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

export function resolveDefault<PlatformProps = {}>(): UseAuthenticatorRoute<
  PlatformProps,
  AuthenticatorRouteComponentName
> {
  return {
    Component: RenderNothing,
    props: {},
  } as UseAuthenticatorRoute<PlatformProps, AuthenticatorRouteComponentName>;
}
