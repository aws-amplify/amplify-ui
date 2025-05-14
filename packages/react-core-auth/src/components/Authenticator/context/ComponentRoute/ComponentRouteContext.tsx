import React from 'react';
import type { AuthenticatorRoute } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { UseMachineSelector } from '../Machine';
import { useMachine } from '../Machine';

import { COMPONENT_ROUTE } from './constants';
import type {
  ComponentRoute,
  ComponentRouteContextType,
  ComponentRouteProviderProps,
} from './types';

const { ComponentRouteContext, useComponentRoute } =
  createContextUtilities<ComponentRouteContextType>({
    contextName: 'ComponentRoute',
    errorMessage:
      '`useComponentRoute` must be used inside a `ComponentRouteProvider',
  });

export function isRoute<T extends ComponentRoute | undefined>(
  route: AuthenticatorRoute | undefined,
  ...currentRoute: T[]
): route is T {
  return currentRoute.includes(route as T);
}

export const routeSelector: UseMachineSelector = ({ route }) => [route];

/**
 * `ComponentRoute` is a subset of `AuthenticatorComponentRoute` containing
 *  values that directly correlate to the UI. Renders `null` if the current
 * `route` is not a `ComponentRoute`
 */
function ComponentRouteProvider({
  children,
  hideSignUp = false,
}: ComponentRouteProviderProps): React.JSX.Element {
  const { route: _route, setRoute: setRouteBase } = useMachine(routeSelector);

  const route = isRoute(_route, ...COMPONENT_ROUTE) ? _route : undefined;
  const setRoute = React.useRef(setRouteBase).current;

  const value = React.useMemo(
    () => ({ hideSignUp, route, setRoute }),
    [hideSignUp, route, setRoute]
  );

  return (
    <ComponentRouteContext.Provider value={value}>
      {route ? children : null}
    </ComponentRouteContext.Provider>
  );
}

export { ComponentRouteProvider, useComponentRoute };
