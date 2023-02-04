import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  // AuthenticatorRouteComponentKey,
  // DefaultComponentType,
  // DefaultPropsType,
  // Defaults,
  // ConfirmSignInRouteProps,
  // SignInRouteProps,
} from '../newTypes';

import {
  // UseAuthenticator,
  UseAuthenticatorSelector,
} from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';
import {
  // ADDITIONAL_PROP_KEYS,
  MACHINE_PROP_KEYS,
  EVENT_HANDLER_KEY_MAP,
  NEW_MACHINE_PROP_KEYS,
  RouteMachineKeys,
  // MachinePropKeys,
} from './constants';
import {
  // ConvertedMachineProps,
  FormEventHandlerMachineKey,
  FormEventHandlerPropKey,
  // ConfirmSignInMachineProps,
  // UseAuthenticatorRoute,
  // UseAuthenticatorRouteDefault,
  UseAuthenticatorRoutePropz,
  //>SignInAdditionalProps,
  // ConfirmSignInAdditionalProps,
  // Resolvers,
  // NewAuthenticatorRoute,
  NewAuthenticatorComponentRoute,
  RoutePropsTranslators,
  RouteSelectorProps,
  NewAuthenticatorRoute,
  RouteSelectorPropz,
  RouteAdditionalProps,
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

export type TranslatedWithHandlers = Record<
  FormEventHandlerPropKey,
  AuthenticatorMachineContext[FormEventHandlerMachineKey]
> &
  Omit<AuthenticatorMachineContext, FormEventHandlerMachineKey>;

type TranslateHandlerParams = Partial<AuthenticatorMachineContext> &
  Pick<AuthenticatorMachineContext, FormEventHandlerMachineKey>;

function translateHandlers<Params extends TranslateHandlerParams>({
  submitForm: handleSubmit,
  updateBlur: handleBlur,
  updateForm: handleChange,
  ...rest
}: Params) {
  return { ...rest, handleBlur, handleChange, handleSubmit };
}

const NON_MACHINE_PROPS: RoutePropsTranslators = {
  // confirmResetPassword: { hideSignUp: false },
  confirmSignIn: (machineProps) => ({
    ...translateHandlers(machineProps),
    challengeName: machineProps.user.challengeName!,
  }),
  // confirmSignUp: { hideSignUp: false },
  // confirmVerifyUser: translateHandlers,
  // forceNewPassword: { hideSignUp: false },
  signIn: (context) => ({ ...translateHandlers(context), hideSignUp: false }),
  // signUp: { hideSignUp: false },
  // resetPassword: { hideSignUp: false },
  // setupTOTP: { hideSignUp: false },
  // verifyUser: { hideSignUp: false },
  // idle: undefined,
  // authenticated: undefined,
  // signOut: undefined,
  // setup: undefined,
  // transition: undefined,
};

export function isComponentRoute(
  route: NewAuthenticatorRoute
): route is NewAuthenticatorComponentRoute {
  return !['transition'].includes(route);
}

function getRouteTranslator<T extends NewAuthenticatorComponentRoute>(
  route: T
) {
  return NON_MACHINE_PROPS[route];
}

function getRouteMachineProps<T extends NewAuthenticatorComponentRoute>(
  route: T,
  context: AuthenticatorMachineContext
): RouteSelectorPropz[T] {
  return NEW_MACHINE_PROP_KEYS[route].reduce(
    (acc, key) => ({ ...acc, [key]: context[key] }),
    {} as RouteSelectorPropz[T]
  );
}

export function resolveRouteProps<Route extends NewAuthenticatorComponentRoute>(
  route: Route,
  context: AuthenticatorMachineContext
): UseAuthenticatorRoutePropz<Route> {
  return getRouteTranslator(route)(getRouteMachineProps(route, context));
}
