import { useMemo } from 'react';
import { AuthenticatorRoute } from '@aws-amplify/ui';

import { useAuthenticator } from '../useAuthenticator';
import { isComponentRouteKey } from '../utils';

import { UseAuthenticatorRouteProps } from './types';
import { getRouteMachineSelector, resolveRouteProps } from './utils';

export default function useAuthenticatorProps<
  RouteKey extends AuthenticatorRoute
>({ route }: { route: RouteKey }): UseAuthenticatorRouteProps<RouteKey> {
  const selector = useMemo(() => getRouteMachineSelector(route), [route]);

  // all props
  const selectedProps = useAuthenticator(selector);

  // do not memoize, `selectedProps` does not maintain a stable reference
  return isComponentRouteKey(route)
    ? resolveRouteProps(route, selectedProps)
    : ({ route } as UseAuthenticatorRouteProps<RouteKey>);
}
