import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { assertIsLocationData } from '../../../validators';
import { LocationData } from '../../../actions';

export const ERROR_MESSAGE =
  'Invalid `location` value provided as initial value to `LocationProvider.';

export const DEFAULT_STATE: LocationState = {
  location: undefined,
  path: undefined,
};

export type LocationActionType =
  | { type: 'NAVIGATE'; location: LocationData; path?: string }
  | { type: 'RESET_LOCATION' };

/**
 * Stores current `location` and nested `path` values set on
 * navigate events.
 *
 * @example
 *`"s3//:my-bucket/my-prefix/a-path/a-nested-path/"`
 *
 * ```
 * const state: LocationState = {
 *   location: {
 *     bucket: 'my-bucket',
 *     permisson: 'READWRITE',
 *     prefix: 'my-prefix/',
 *     type: 'PREFIX',
 *   },
 *   path: 'a-path/a-nested-path/',
 * }
 *
 */
export interface LocationState {
  /**
   * current `location` metadata
   */
  location: LocationData | undefined;

  /**
   * current `location` subpath within a `location`
   */
  path: string | undefined;
}

export type LocationStateContext = [
  LocationState,
  (action: LocationActionType) => void,
];

export interface LocationProviderProps extends Partial<LocationState> {
  children?: React.ReactNode;
}

function handleAction(
  state: LocationState,
  action: LocationActionType
): LocationState {
  switch (action.type) {
    case 'NAVIGATE': {
      const { location, path } = action;

      if (state.location?.id === location.id && state.path === path) {
        return state;
      }

      return { location, path };
    }
    case 'RESET_LOCATION': {
      return DEFAULT_STATE;
    }
  }
}

const defaultValue: LocationStateContext = [DEFAULT_STATE, noop];
export const { LocationContext, useLocation } = createContextUtilities({
  contextName: 'Location',
  defaultValue,
});

export function LocationProvider({
  children,
  location,
  path,
}: LocationProviderProps): React.JSX.Element {
  if (location) {
    assertIsLocationData(location, ERROR_MESSAGE);
  }

  const value = React.useReducer(
    handleAction,
    location ? { location, path } : DEFAULT_STATE
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
