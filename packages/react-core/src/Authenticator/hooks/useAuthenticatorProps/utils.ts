import { AuthenticatorRoute } from '@aws-amplify/ui';

import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentKey,
} from '../types';

import { UseAuthenticatorSelector } from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';

import { ROUTE_SELECTOR_KEYS } from './constants';
import {
  RoutePropsResolvers,
  RouteSelectorProps,
  TranslateHandlerProps,
  UseAuthenticatorRouteProps,
} from './types';

// only select `route` from machine context
const routeOnlySelector: UseAuthenticatorSelector = ({ route }) => [route];

const createSelector =
  (selectorKeys: AuthenticatorMachineContextKey[]): UseAuthenticatorSelector =>
  (context) =>
    // always include `route` in selector
    [...selectorKeys.map((key) => context[key]), context.route];

export const getRouteMachineSelector = (
  route: AuthenticatorRoute
): UseAuthenticatorSelector =>
  isComponentRouteKey(route)
    ? createSelector(ROUTE_SELECTOR_KEYS[route])
    : routeOnlySelector;

function translateHandlerProps<Props extends TranslateHandlerProps>({
  submitForm: handleSubmit,
  updateBlur: handleBlur,
  updateForm: handleChange,
  ...rest
}: Props) {
  return { ...rest, handleBlur, handleChange, handleSubmit };
}

const PROPS_RESOLVERS: RoutePropsResolvers = {
  confirmResetPassword: translateHandlerProps,
  confirmSignIn: (props) => ({
    ...translateHandlerProps(props),
    challengeName: props.user.challengeName!,
  }),
  confirmSignUp: translateHandlerProps,
  confirmVerifyUser: translateHandlerProps,
  forceNewPassword: translateHandlerProps,
  resetPassword: translateHandlerProps,
  setupTOTP: translateHandlerProps,
  signIn: (props) => ({ ...translateHandlerProps(props), hideSignUp: false }),
  signUp: (props) => ({ ...translateHandlerProps(props), hideSignIn: false }),
  verifyUser: translateHandlerProps,
};

function filterUnselectedProps<Route extends AuthenticatorRouteComponentKey>(
  route: Route,
  context: AuthenticatorMachineContext
): RouteSelectorProps[Route] {
  const selectedKeys = ROUTE_SELECTOR_KEYS[route];

  return selectedKeys?.reduce(
    (acc, key) => ({ ...acc, [key]: context[key] }),
    {} as RouteSelectorProps[Route]
  );
}

export function resolveRouteProps<Route extends AuthenticatorRouteComponentKey>(
  route: Route,
  context: AuthenticatorMachineContext
): UseAuthenticatorRouteProps<Route> {
  const filteredProps = filterUnselectedProps(route, context);
  const routePropsResolver = PROPS_RESOLVERS[route];

  return routePropsResolver?.(filteredProps);
}
