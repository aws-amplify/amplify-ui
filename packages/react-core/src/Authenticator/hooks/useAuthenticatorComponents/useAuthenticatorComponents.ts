import { useMemo } from 'react';
import { AuthenticatorRoute, capitalize } from '@aws-amplify/ui';

import { RenderNothing } from '../../../components';
import { isComponentRouteKey } from '../utils';

import {
  RouteComponentsDefaults,
  UseAuthenticatorComponents,
  UseAuthenticatorComponentsParams,
} from './types';
import { mergeComponents } from './utils';

/**
 * Handles resolving default and override Route Components, returning the
 * expected Route Component with its slot components as static properties
 *
 * @param {UseAuthenticatorComponentsParams} params Route Component `defaults`,
 * `overrides` and `route` to resolve against
 *
 * @returns Route Component with component slot static properties
 */
export default function useAuthenticatorComponents<
  Defaults extends RouteComponentsDefaults<any>,
  Route extends AuthenticatorRoute = AuthenticatorRoute
>(
  params: UseAuthenticatorComponentsParams<Defaults, Route>
): UseAuthenticatorComponents<Defaults, Route> {
  const { defaults, overrides, route } = params;

  const components = useMemo(
    () => mergeComponents(defaults, overrides),
    [defaults, overrides]
  );

  const Component = useMemo(() => {
    if (isComponentRouteKey(route)) {
      return components[capitalize(route)];
    }

    return RenderNothing;
  }, [components, route]);

  return Component;
}
