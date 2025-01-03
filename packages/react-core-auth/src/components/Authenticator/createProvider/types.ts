import React from 'react';

import { DisplayText } from '../context/DisplayText';
import { InitialRoute } from '../context/ComponentRoute';
import { Components, PrimitivesDefault } from '../context/Primitives';

/**
 * `createAuthenticator` output type:
 * - `default`: React component rendering provided `children` on sign in complete
 * - `composable`: `Authenticator` composable components for advanced use cases
 */
export type Variant = 'default' | 'composable';

export interface CreateProviderParams<T, K, U> {
  platform: T;
  primitives: K;
  variant: U;
}

export interface ProviderProps<T extends PrimitivesDefault, K> {
  children?: React.ReactNode;
  // only `default` variant accepts a `components` prop
  components?: K extends 'default' ? Components<T> : never;
  displayText?: DisplayText;
  initialRoute?: InitialRoute;
}

export type ProviderComponent<T extends PrimitivesDefault, K> = (
  params: ProviderProps<T, K>
) => JSX.Element;
