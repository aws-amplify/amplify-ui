import { useMemo } from 'react';
import { AuthenticatorRoute } from '@aws-amplify/ui';

import { useAuthenticator } from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';

import {
  UseAuthenticatorPropsParams,
  UseAuthenticatorRouteProps,
} from './types';
import { getRouteMachineSelector, resolveRouteProps } from './utils';

/**
 * Resolves the expected `props` for an Authenticator `route` with the exception of
 * the component slot and `fields`
 *
 * @param {UseAuthenticatorPropsParams} params required params to resolve the expected `props`
 * @returns `route` specific `props`
 */
export default function useAuthenticatorProps<
  Route extends AuthenticatorRoute
>({
  route,
}: UseAuthenticatorPropsParams<Route>): UseAuthenticatorRouteProps<Route> {
  // `useAuthenticator` outputs all values from the `Authenticator` state machine
  // with only a subset of those values required by each `route`. In order to
  // prevemt extra calculations when interacting with `xstate` a selector param
  // is used to only return the `props` required by the current `route`
  const selector = useMemo(() => getRouteMachineSelector(route), [route]);
  const selectedProps = useAuthenticator(selector);

  // do not memoize, `selectedProps` does not maintain a stable reference
  return isComponentRouteKey(route)
    ? resolveRouteProps(route, selectedProps)
    : ({ route } as UseAuthenticatorRouteProps<Route>);
}
