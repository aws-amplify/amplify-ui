// import { AuthenticatorRoute } from '@aws-amplify/ui';
// import { useMemo } from 'react';
import {
  // UseAuthenticator,
  useAuthenticator,
} from '../useAuthenticator';
// import { AuthenticatorRouteComponentKey } from '../newTypes';

import {
  // UseAuthenticatorRoute,
  // UseAuthenticatorRouteDefault,
  // UseAuthenticatorRouteParams,
  UseAuthenticatorRouteProps,
  NewAuthenticatorRoute,
  NewAuthenticatorComponentRoute,
  UseAuthenticatorRoutePropz,
  // Resolvers,
} from './types';

import {
  getRouteMachineSelector,
  // NewAuthenticatorComponentRoute,
  // routeSelector,
  // resolveConfirmResetPasswordRoute,
  // resolveConfirmSignInRoute,
  // resolveConfirmSignUpRoute,
  // resolveConfirmVerifyUserRoute,
  // resolveDefault,
  // resolveForceNewPasswordRoute,
  // resolveResetPasswordRoute,
  // resolveSetupTOTPRoute,
  // resolveSignInRoute,
  // resolveSignUpRoute,
  // resolveVerifyUserRoute,
  resolveRouteProps,
  isComponentRoute,
} from './utils';

export default function useAuthenticatorProps<
  RouteKey extends NewAuthenticatorRoute
>({ route }: { route: RouteKey }): UseAuthenticatorRoutePropz<RouteKey> {
  const selector = getRouteMachineSelector(route);
  const machineProps = useAuthenticator(selector);

  if (!isComponentRoute(route)) {
    return { route } as UseAuthenticatorRoutePropz<RouteKey>;
  }

  return resolveRouteProps(route, machineProps);
}
