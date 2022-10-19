import { AuthenticatorRoute } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';
import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
  AuthenticatorRouteComponentName,
} from '../types';

import {
  UseAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import { DEFAULT_TOTP_ISSUER, MACHINE_PROP_KEYS } from './constants';
import { UseAuthenticatorRoute } from './types';

// selects nothing
const defaultSelector = () => [];

const createSelector =
  (selectorKeys: AuthenticatorMachineContextKey[]): UseAuthenticatorSelector =>
  (context) =>
    selectorKeys.map((key) => context[key]);

export const getRouteSelector = (
  route: AuthenticatorRoute
): UseAuthenticatorSelector =>
  isComponentRouteKey(route)
    ? createSelector(MACHINE_PROP_KEYS[route])
    : defaultSelector;

const getSelectedMachineProps = (
  route: AuthenticatorRouteComponentKey,
  context: AuthenticatorMachineContext
) =>
  MACHINE_PROP_KEYS[route].reduce(
    (acc, key) => ({ ...acc, [key]: context[key] }),
    {} as AuthenticatorMachineContext
  );

export function resolveConfirmResetPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ConfirmResetPassword'
  >['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmResetPassword'> {
  return {
    Component,
    props: {
      ...Component,
      ...getSelectedMachineProps('confirmResetPassword', props),
      fields,
    },
  };
}

export function resolveConfirmSignInRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'> {
  const { user, ...machineProps } = getSelectedMachineProps(
    'confirmSignIn',
    props
  );

  return {
    Component,
    props: {
      ...Component,
      ...machineProps,
      challengeName: user.challengeName,
      fields,
    },
  };
}

export function resolveConfirmSignUpRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ConfirmSignUp'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignUp'> {
  return {
    Component,
    props: {
      ...Component,
      ...getSelectedMachineProps('confirmSignUp', props),
      fields,
    },
  };
}

export function resolveConfirmVerifyUserRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ConfirmVerifyUser'
  >['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmVerifyUser'> {
  const { skipVerification, ...machineProps } = getSelectedMachineProps(
    'confirmVerifyUser',
    props
  );

  return {
    Component,
    props: { ...Component, ...machineProps, fields, skipVerification },
  };
}

export function resolveForceNewPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ForceNewPassword'
  >['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ForceNewPassword'> {
  const { validationErrors, ...machineProps } = getSelectedMachineProps(
    'forceNewPassword',
    props
  );

  return {
    Component,
    props: { ...Component, ...machineProps, fields, validationErrors },
  };
}

export function resolveResetPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ResetPassword'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ResetPassword'> {
  return {
    Component,
    props: {
      ...Component,
      ...getSelectedMachineProps('resetPassword', props),
      fields,
    },
  };
}

export function resolveSetupTOTPRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>['Component'],
  { fields, getTotpSecretCode, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'> {
  const { user, ...machineProps } = getSelectedMachineProps('setupTOTP', props);
  return {
    Component,
    props: {
      ...Component,
      ...machineProps,
      fields,
      getTotpSecretCode,
      // prior to reaching the `setupTOTP` route, `user` will be
      // authenticated ensuring `username` is provided
      totpUsername: user.username!,
      totpIssuer: DEFAULT_TOTP_ISSUER,
    },
  };
}

export function resolveSignInRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SignIn'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SignIn'> {
  // default `hideSignUp` to false
  const hideSignUp = false;

  return {
    Component,
    props: {
      ...Component,
      ...getSelectedMachineProps('signIn', props),
      fields,
      hideSignUp,
    },
  };
}

export function resolveSignUpRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SignUp'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SignUp'> {
  const machineProps = getSelectedMachineProps('signUp', props);

  return {
    Component,
    props: { ...Component, ...machineProps, fields },
  };
}

export function resolveVerifyUserRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'VerifyUser'>['Component'],
  { fields, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'VerifyUser'> {
  return {
    Component,
    props: {
      ...Component,
      ...getSelectedMachineProps('verifyUser', props),
      fields,
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
