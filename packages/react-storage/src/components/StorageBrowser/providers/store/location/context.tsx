import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { assertLocationData } from '../../../validators';
import { LocationData } from '../../../actions';

export const ERROR_MESSAGE =
  'Invalid `location` value provided as initial value to `LocationProvider.';

export const DEFAULT_STATE: LocationState = {
  current: undefined,
  path: '',
  key: '',
};

export type LocationActionType =
  | {
      type: 'NAVIGATE';
      location: LocationData;
      path?: string;
    }
  | { type: 'RESET_LOCATION' };

/**
 * Stores current `location` and nested `path` values set on
 * navigate events.
 *
 * @example
 *`"s3://my-bucket/my/prefix/a-path/a-nested-path/"`
 *
 * ```
 * const state: LocationState = {
 *   location: {
 *     bucket: 'my-bucket',
 *     permisson: 'READWRITE',
 *     prefix: 'my/prefix/',
 *     type: 'PREFIX',
 *   },
 *   path: 'a-path/a-nested-path/',
 *   key: 'my/prefix/a-path/a-nested-path/',
 * }
 *
 */
export interface LocationState {
  /**
   * current `location` metadata
   */
  current: LocationData | undefined;

  /**
   * current `location` subpath within a `location`
   */
  path: string;

  /**
   * fully qualified string consisting of `location` prefix and path
   */
  key: string;
}

export type LocationStateContext = [
  LocationState,
  (action: LocationActionType) => void,
];

export interface LocationProviderProps {
  children?: React.ReactNode;
  location?: LocationData;
  path?: string;
}

function handleAction(
  state: LocationState,
  action: LocationActionType
): LocationState {
  switch (action.type) {
    case 'NAVIGATE': {
      const { location, path = '' } = action;

      if (state.current?.id === location.id && state.path === path) {
        return state;
      }

      return {
        current: location,
        path,
        key: `${location.prefix ?? ''}${path}`,
      };
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
  path = '',
}: LocationProviderProps): React.JSX.Element {
  if (location) {
    assertLocationData(location, ERROR_MESSAGE);
  }

  const value = React.useReducer(
    handleAction,
    location
      ? {
          current: location,
          path,
          key: `${location.prefix ?? ''}${path}`,
        }
      : DEFAULT_STATE
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
