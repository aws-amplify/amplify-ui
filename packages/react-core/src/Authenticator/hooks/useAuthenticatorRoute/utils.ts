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
import {
  DEFAULT_TOTP_ISSUER,
  MACHINE_PROP_KEYS,
  EVENT_HANDLER_KEY_MAP,
} from './constants';
import {
  ConvertedMachineProps,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  UseAuthenticatorRoute,
} from './types';

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

const isFormEventHandlerKey = (
  key: AuthenticatorMachineContextKey
): key is FormEventHandlerMachineKey =>
  ['updateBlur', 'updateForm', 'submitForm'].includes(key);

const convertEventHandlerKey = (
  key: FormEventHandlerMachineKey
): FormEventHandlerPropKey => EVENT_HANDLER_KEY_MAP[key];

const getConvertedMachineProps = (
  route: AuthenticatorRouteComponentKey,
  context: AuthenticatorMachineContext
): ConvertedMachineProps =>
  MACHINE_PROP_KEYS[route].reduce(
    (acc, key) => ({
      ...acc,
      [isFormEventHandlerKey(key) ? convertEventHandlerKey(key) : key]:
        context[key],
    }),
    {} as ConvertedMachineProps
  );

export function resolveConfirmResetPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ConfirmResetPassword'
  >['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmResetPassword'> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('confirmResetPassword', props),
    },
  };
}

export function resolveConfirmSignInRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'> {
  const { user, ...machineProps } = getConvertedMachineProps(
    'confirmSignIn',
    props
  );

  return {
    Component,
    props: {
      ...Component,
      ...machineProps,
      // prior to the `confirmSignIn` route, `user.username` is populated
      challengeName: user.challengeName!,
    },
  };
}

export function resolveConfirmSignUpRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ConfirmSignUp'>['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignUp'> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('confirmSignUp', props),
    },
  };
}

export function resolveConfirmVerifyUserRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ConfirmVerifyUser'
  >['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ConfirmVerifyUser'> {
  const { skipVerification, ...machineProps } = getConvertedMachineProps(
    'confirmVerifyUser',
    props
  );

  return {
    Component,
    props: { ...Component, ...machineProps, skipVerification },
  };
}

export function resolveForceNewPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<
    PlatformProps,
    'ForceNewPassword'
  >['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ForceNewPassword'> {
  const { validationErrors, ...machineProps } = getConvertedMachineProps(
    'forceNewPassword',
    props
  );

  return {
    Component,
    props: { ...Component, ...machineProps, validationErrors },
  };
}

export function resolveResetPasswordRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'ResetPassword'>['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'ResetPassword'> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('resetPassword', props),
    },
  };
}

export function resolveSetupTOTPRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>['Component'],
  { getTotpSecretCode, ...props }: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'> {
  const { user, ...machineProps } = getConvertedMachineProps(
    'setupTOTP',
    props
  );
  return {
    Component,
    props: {
      ...Component,
      ...machineProps,

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
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SignIn'> {
  // default `hideSignUp` to false
  const hideSignUp = false;

  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('signIn', props),

      hideSignUp,
    },
  };
}

export function resolveSignUpRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'SignUp'>['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'SignUp'> {
  const machineProps = getConvertedMachineProps('signUp', props);

  return {
    Component,
    props: { ...Component, ...machineProps },
  };
}

export function resolveVerifyUserRoute<PlatformProps = {}>(
  Component: UseAuthenticatorRoute<PlatformProps, 'VerifyUser'>['Component'],
  props: UseAuthenticator
): UseAuthenticatorRoute<PlatformProps, 'VerifyUser'> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('verifyUser', props),
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
