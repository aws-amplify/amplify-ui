import React from 'react';

import {
  createContextUtilities,
  useHasValueUpdated,
} from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

// import { assertLocationData } from '../../../validators';
import { LocationData } from '../../../actions';

export const ERROR_MESSAGE =
  'Invalid `location` value provided as initial value to `LocationProvider.';
const EMPTY_STRING = '';
export const INITIAL_STATE: LocationState = {
  current: undefined,
  path: EMPTY_STRING,
  key: '',
};

export type LocationActionType =
  | { type: 'NAVIGATE'; location: LocationData; path: string }
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
  current: LocationDataLite | undefined;

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

export interface LocationDataLite extends Partial<LocationData> {}

export interface LocationProviderProps {
  children?: React.ReactNode;

  /**
   * controlled `location` value. Can be used to update `location` value
   * externally
   */
  location?: LocationDataLite;

  /**
   * default `location` value. Provide to initialize the `StorageBrowser`
   * with a provided value with uncontrolled behavior
   */
  defaultLocation?: LocationDataLite;

  onLocationChange?: (value: {
    location: LocationDataLite | undefined;
    path: string;
  }) => void;

  /**
   * controlled `location` navigation sub path delineated by '/' characters.
   */
  path?: string;

  defaultPath?: string;
}

const createLocationState = (
  current: LocationDataLite | undefined,
  path: string
): LocationState => ({ current, path, key: `${current?.prefix ?? ''}${path}` });

function locationReducer(
  state: LocationState,
  action: LocationActionType
): LocationState {
  switch (action.type) {
    case 'NAVIGATE': {
      const { location, path = EMPTY_STRING } = action;

      if (state.current?.id === location.id && state.path === path) {
        return state;
      }

      return createLocationState(location, path);
    }
    case 'RESET_LOCATION': {
      return INITIAL_STATE;
    }
  }
}

const defaultValue: LocationStateContext = [INITIAL_STATE, noop];
export const { LocationContext, useLocation } = createContextUtilities({
  contextName: 'Location',
  defaultValue,
});

export function LocationProvider({
  children,
  defaultLocation,
  defaultPath,
  location,
  onLocationChange,
  path,
}: LocationProviderProps): React.JSX.Element {
  const hasChangedControlledBehavior = useHasValueUpdated(!!location, true);
  if (hasChangedControlledBehavior) {
    // eslint-disable-next-line no-console
    console.warn('Do not change between controlled and uncontrolled behavior');
  }

  const hasControlledLocation = !!location;
  const hasControlledPath = !!path;

  // eslint-disable-next-line no-console
  //   console.log('defaultLocation', defaultLocation);

  // eslint-disable-next-line no-console
  //   console.log('location', location);

  //   const resolvedLocation = location ?? defaultLocation;
  //   if (resolvedLocation) {
  //     const { id, prefix, type } = resolvedLocation;
  //     resolvedLocation['id'] = id ?? crypto.randomUUID();
  //     resolvedLocation['type'] = type
  //       ? type
  //       : prefix.length
  //         ? 'PREFIX'
  //         : 'BUCKET';

  //     assertLocationData(resolvedLocation, ERROR_MESSAGE);
  //   }

  const [state, dispatch] = React.useReducer(
    locationReducer,
    hasControlledLocation || !defaultLocation
      ? INITIAL_STATE
      : createLocationState(defaultLocation, defaultPath ?? '')
  );

  const shouldRunChangeCallback = useHasValueUpdated(
    `${state.current?.id}${state.path}`,
    true
  );

  // eslint-disable-next-line no-console
  //   console.log('shouldRunChangeCallback', shouldRunChangeCallback);

  React.useEffect(() => {
    if (!onLocationChange || !shouldRunChangeCallback) return;

    onLocationChange({ location: state.current, path: state.path });
  }, [onLocationChange, shouldRunChangeCallback, state]);

  // eslint-disable-next-line no-console
  //   console.log('hasControlledLocation', hasControlledLocation);

  const _value: LocationStateContext = React.useMemo(() => {
    if (!hasControlledLocation && !hasControlledPath) return [state, dispatch];

    const _location = hasControlledLocation ? location : state.current;
    const _path = hasControlledPath ? path : state.path;

    // // eslint-disable-next-line no-console
    // console.log('_location', _location);

    return [{ ...state, current: _location, path: _path }, dispatch];
  }, [hasControlledLocation, hasControlledPath, path, location, state]);

  // eslint-disable-next-line no-console
  //   console.log('_value', _value);

  return (
    <LocationContext.Provider value={_value}>
      {children}
    </LocationContext.Provider>
  );
}
