import React from 'react';

import { LocationAccess, LocationData } from '../../actions/types';

const INITIAL_STATE = {
  location: undefined,
  history: [],
};

export type NavigateAction =
  | { type: 'ACCESS_LOCATION'; location: LocationAccess }
  | { type: 'NAVIGATE'; prefix: string }
  | { type: 'EXIT' };

export interface NavigateState {
  location: LocationAccess | undefined;
  history: string[];
}

export type NavigateStateContext = [
  state: NavigateState,
  handleUpdateState: (action: NavigateAction) => void,
];

export const parseLocationAccess = (location: LocationAccess): LocationData => {
  const { permission, scope, type } = location;
  if (!scope.startsWith('s3://')) {
    throw new Error(`Invalid scope: ${scope}`);
  }

  // remove default path
  const sanitizedScope = scope.slice(5);
  let bucket, prefix;

  switch (type) {
    case 'BUCKET': {
      // { scope: 's3://bucket/*', type: 'BUCKET', },
      bucket = sanitizedScope.slice(0, -2);
      prefix = '';
      break;
    }
    case 'PREFIX': {
      // { scope: 's3://bucket/path/*', type: 'PREFIX', },
      bucket = sanitizedScope.slice(0, sanitizedScope.indexOf('/'));
      prefix = sanitizedScope.slice(bucket.length + 1, -1);

      break;
    }
    case 'OBJECT': {
      // { scope: 's3://bucket/path/to/object', type: 'OBJECT', },
      bucket = sanitizedScope.slice(0, sanitizedScope.indexOf('/'));
      prefix = sanitizedScope.slice(bucket.length);
      break;
    }
    default: {
      throw new Error(`Invalid location type: ${type}`);
    }
  }

  return { bucket, permission, prefix, type };
};

export function navigateReducer(
  state: NavigateState,
  action: NavigateAction
): NavigateState {
  switch (action.type) {
    case 'ACCESS_LOCATION': {
      const { location } = action;
      const { bucket, prefix } = parseLocationAccess(location);
      const initialEntry = prefix ? `${bucket}/${prefix}` : bucket;

      return { location, history: [initialEntry] };
    }
    case 'NAVIGATE': {
      const { prefix } = action;

      const position = state.history.indexOf(prefix);

      if (position === 0) return { ...state, history: [prefix] };

      const history =
        position === -1
          ? [...state.history, prefix]
          : state.history.slice(0, position + 1);

      return { ...state, history };
    }
    case 'EXIT': {
      return INITIAL_STATE;
    }
  }
}

export const NavigateContext = React.createContext<
  NavigateStateContext | undefined
>(undefined);

export function NavigateProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(navigateReducer, INITIAL_STATE);

  return (
    <NavigateContext.Provider value={value}>
      {children}
    </NavigateContext.Provider>
  );
}
