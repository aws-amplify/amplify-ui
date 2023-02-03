import { AuthenticatorRoute } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';
import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
  DefaultComponentType,
  DefaultPropsType,
  Defaults,
} from '../newTypes';
import { SignInBaseProps } from '../types';

import {
  UseAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import {
  MACHINE_PROP_KEYS,
  EVENT_HANDLER_KEY_MAP,
  NEW_MACHINE_PROP_KEYS,
} from './constants';
import {
  ConvertedMachineProps,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  UseAuthenticatorRoute,
  UseAuthenticatorRouteDefault,
  UseAuthenticatorRouteProps,
  // Resolvers,
  NewAuthenticatorRoute,
  TransitionalRoute,
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
): ConvertedMachineProps => ({
  ...MACHINE_PROP_KEYS[route].reduce(
    (acc, key) => ({
      ...acc,
      [isFormEventHandlerKey(key) ? convertEventHandlerKey(key) : key]:
        context[key],
    }),
    {} as ConvertedMachineProps
  ),
});

type Messy = {
  [K in NewAuthenticatorRoute]: K extends 'signIn'
    ? Pick<SignInBaseProps, 'hideSignUp'>
    : void;
};

const additionalProps: Messy = {
  // confirmResetPassword: { hideSignUp: false },
  // confirmSignIn: { hideSignUp: false },
  // confirmSignUp: { hideSignUp: false },
  // confirmVerifyUser: { h?ideSignUp: false },
  // forceNewPassword: { hideSignUp: false },
  signIn: { hideSignUp: false },
  // signUp: { hideSignUp: false },
  // resetPassword: { hideSignUp: false },
  // setupTOTP: { hideSignUp: false },
  // verifyUser: { hideSignUp: false },
  // idle: undefined,
  // authenticated: undefined,
  // signOut: undefined,
  // setup: undefined,
  transition: undefined,
};

// export type NewAuthenticatorComponentRoute = Exclude<
//   NewAuthenticatorRoute,
//   TransitionalRoute
// >;

function isTransitionalRoute(
  route: NewAuthenticatorRoute
): route is TransitionalRoute {
  return route === 'transition';
}

export function newGetConvertedMachineProps<R extends NewAuthenticatorRoute>(
  route: R,
  context: AuthenticatorMachineContext
): UseAuthenticatorRouteProps[R] {
  // if (isTransitionalRoute(route)) {
  //   return undefined;
  // }
  return {
    ...NEW_MACHINE_PROP_KEYS[route].reduce(
      (acc, key) => ({
        ...acc,
        [isFormEventHandlerKey(key) ? convertEventHandlerKey(key) : key]:
          context[key],
      }),
      {} as ConvertedMachineProps
    ),
    ...additionalProps[route],
  };
}

// export function resolveConfirmResetPasswordRoute(
//   props: UseAuthenticator
// ): Resolvers['confirmResetPassword'] {
//   return newGetConvertedMachineProps('confirmResetPassword', props);
// }

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
  const { user, ...machineProps } = getConvertedMachineProps(
    'confirmSignIn',
    props
  );

  // prior to the `confirmSignIn` route, `user.username` is populated
  const challengeName = user.challengeName!;

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

export function resolveResetPasswordRoute<FieldType = {}>(
  Component: Defaults<FieldType>['ResetPassword'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'ResetPassword', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('resetPassword', props),
    },
  };
}

export function resolveSetupTOTPRoute<FieldType = {}>(
  Component: Defaults<FieldType>['SetupTOTP'],
  props: UseAuthenticator
): UseAuthenticatorRoute<'SetupTOTP', FieldType> {
  return {
    Component,
    props: {
      ...Component,
      ...getConvertedMachineProps('setupTOTP', props),
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
  FieldType = {}
>(): UseAuthenticatorRouteDefault<FieldType> {
  return {
    Component: RenderNothing as DefaultComponentType<FieldType>,
    props: {} as DefaultPropsType,
  };
}

// export const resolvers: Pick<Resolvers, 'signIn' | 'transition'> = {
//   // confirmResetPassword: (props) =>
//   //   newGetConvertedMachineProps('confirmResetPassword', props),
//   transition: (_) => undefined,
//   signIn: (props) => ({
//     ...newGetConvertedMachineProps('signIn', props),
//   }),
// };
