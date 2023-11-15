import React from 'react';

import {
  ComponentRouteProvider,
  displayTextEn,
  DisplayTextProvider,
  MachineProvider,
  MfaProvider,
  Platform,
  PlatformProvider,
  PrimitivesProvider,
  PrimitivesDefault,
} from '../context';
import { isComposable } from './isComposable';
import { CreateProviderParams, ProviderComponent, Variant } from './types';

// default `initialRoute` to `signUp`
const INITIAL_ROUTE = 'signUp';

export function createProvider<
  T extends Platform,
  K extends PrimitivesDefault<T>,
  U extends Variant,
>({
  platform,
  primitives: primitivesDefault,
  variant,
}: CreateProviderParams<T, K, U>): ProviderComponent<K, U> {
  // Composable use case does not allow for Primitive slot overrides
  const ignoreComponentsProp = isComposable(variant);

  return function Provider({
    children,
    components: _components,
    displayText: _displayText,
    initialRoute = INITIAL_ROUTE,
  }) {
    // do not memo `displayText` or `primitives`, respective providers
    // handle memoization internally
    const displayText = { ..._displayText, ...displayTextEn };
    const primitives = ignoreComponentsProp
      ? primitivesDefault
      : { ...primitivesDefault, ..._components };

    return (
      <PlatformProvider platform={platform}>
        <DisplayTextProvider {...displayText}>
          <PrimitivesProvider {...(primitives as PrimitivesDefault)}>
            <MachineProvider initialRoute={initialRoute}>
              <ComponentRouteProvider>
                <MfaProvider>{children}</MfaProvider>
              </ComponentRouteProvider>
            </MachineProvider>
          </PrimitivesProvider>
        </DisplayTextProvider>
      </PlatformProvider>
    );
  };
}
