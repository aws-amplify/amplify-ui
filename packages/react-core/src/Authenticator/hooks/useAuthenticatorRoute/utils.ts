import { AuthenticatorRoute } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';
import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
  DefaultComponentType,
  DefaultPropsType,
  Defaults,
} from '../types';

import {
  UseAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import { MACHINE_PROP_KEYS, EVENT_HANDLER_KEY_MAP } from './constants';
import {
  ConvertedMachineProps,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  UseAuthenticatorRoute,
  UseAuthenticatorRouteDefault,
} from './types';

// only select `route` from machine context
export const routeSelector: UseAuthenticatorSelector = ({ route }) => [route];

const createSelector =
  (selectorKeys: AuthenticatorMachineContextKey[]): UseAuthenticatorSelector =>
  (context) => {
    const dependencies = selectorKeys.map((key) => context[key]);
    // route should always be part of deps, so hook knows when route changes.
    return [...dependencies, context.route];
  };

export const getRouteMachineSelector = (
  route: AuthenticatorRoute
): UseAuthenticatorSelector =>
  isComponentRouteKey(route)
    ? createSelector(MACHINE_PROP_KEYS[route])
    : routeSelector;

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

export function resolveConfirmResetPasswordRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ConfirmResetPassword'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ConfirmResetPassword', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('confirmResetPassword', props),
    },
  };
}

export function resolveConfirmSignInRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ConfirmSignIn'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ConfirmSignIn', FieldType> {
  const { challengeName, ...machineProps } = getConvertedMachineProps(
    'confirmSignIn',
    props
  );

  return { Component, props: { ...Component, ...machineProps, challengeName } };
}

export function resolveConfirmSignUpRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ConfirmSignUp'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ConfirmSignUp', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('confirmSignUp', props),
    },
  };
}

export function resolveConfirmVerifyUserRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ConfirmVerifyUser'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ConfirmVerifyUser', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('confirmVerifyUser', props),
    },
  };
}

export function resolveForceNewPasswordRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ForceNewPassword'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ForceNewPassword', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('forceNewPassword', props),
    },
  };
}

export function resolveForgotPasswordRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ForgotPassword'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ForgotPassword', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('forgotPassword', props),
    },
  };
}

export function resolveSetupTotpRoute<FieldType = {}>(
  Component: Defaults<FieldType>['SetupTotp'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'SetupTotp', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('setupTotp', props),
    },
  };
}

export function resolveSignInRoute<FieldType = {}>(
  Component: Defaults<FieldType>['SignIn'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'SignIn', FieldType> {
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

export function resolveSignUpRoute<FieldType = {}>(
  Component: Defaults<FieldType>['SignUp'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'SignUp', FieldType> {
  return {
    Component,
    props: { ...Component, ...getConvertedMachineProps('signUp', props) },
  };
}

export function resolveVerifyUserRoute<FieldType = {}>(
  Component: Defaults<FieldType>['VerifyUser'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'VerifyUser', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('verifyUser', props),
    },
  };
}

export function resolveDefault<
  FieldType = {},
>(): UseAuthenticatorRouteDefault<FieldType> {
  return {
    Component: RenderNothing as DefaultComponentType<FieldType>,
    props: {} as DefaultPropsType<FieldType>,
  };
}
