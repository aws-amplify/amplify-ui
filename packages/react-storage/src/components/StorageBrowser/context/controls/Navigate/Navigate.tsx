import React from 'react';

import { FolderName, LocationData } from '../../actions/types';

const INITIAL_STATE: NavigateState = {
  location: undefined,
  history: undefined,
};

export type NavigateAction =
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'DESELECT_LOCATION' }
  | { type: 'ENTER_FOLDER'; name: FolderName }
  | { type: 'EXIT_FOLDER'; name: FolderName };

export interface NavigateState {
  location: LocationData | undefined;
  history: string[] | undefined;
}

export type NavigateStateContext = [
  state: NavigateState,
  handleUpdateState: (action: NavigateAction) => void,
];

export function navigateReducer(
  state: NavigateState,
  action: NavigateAction
): NavigateState {
  switch (action.type) {
    case 'SELECT_LOCATION': {
      // This action comes from the navigate item specifying the location
      // It uses the current state location and so this has the "old" scope
      // which could include the previous folder we were at
      // We'll need to update the scope here
      // We need to update the prefix too?

      const { location } = action;
      const { bucket } = location;

      const scope = `s3://${bucket}/*`;

      return {
        location: { ...location, scope, prefix: undefined },
        history: undefined,
      };
    }
    case 'DESELECT_LOCATION': {
      return {
        location: undefined,
        history: undefined,
      };
    }
    case 'ENTER_FOLDER': {
      const { name } = action;
      const { location, history } = state;

      // TODO: Look into why listLocationsItems returns the current folder as a result
      // Clicking on it in the list locations items view would add it to the history if
      // we didn't  have this check
      if (name === history?.[history.length - 1]) {
        // Don't add the same folder into history again
        return state;
      }

      const { bucket, permission, type } = location!;

      const scope = `s3://${bucket}/${name}*`;

      return {
        location: { bucket, prefix: name, permission, scope, type },
        history: [...(state.history ?? []), name],
      };
    }
    case 'EXIT_FOLDER': {
      const { name } = action;
      const { location } = state;
      const { bucket, permission, type } = location!;

      const scope = `s3://${bucket}/${name}*`;

      const indexOfTargetFolder = state.history?.indexOf(name) ?? -1;

      if (indexOfTargetFolder > -1) {
        // Update history to include all of the history up to the target folder we're navigating to
        const updatedHistory = state.history?.slice(0, indexOfTargetFolder + 1);

        return {
          location: { bucket, prefix: name, permission, scope, type },
          history: updatedHistory,
        };
      }

      return state;
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
