import React from 'react';

const INITIAL_STATE: NavigateState = {
  getData: () => undefined,
  initial: 'Home',
  location: {
    current: undefined,
    isLoadingInitialData: false,
    previousLocations: undefined,
  },
  locations: {
    isLoadingInitialData: false,
  },
};

type Permission = 'READ' | 'READWRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

// avoid naming clash with Location (URL) API (https://developer.mozilla.org/en-US/docs/Web/API/Location)
interface LocationData {
  name: string;
  permission: Permission;
  type: LocationType;
}

interface FolderData {
  key: string;
  type: 'FOLDER';
}

interface FileData {
  key: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

type LocationItem = FileData | FolderData;

interface ListData {
  LOCATIONS: LocationData;
  LOCATION_ITEMS: LocationItem;
}

export type NavigateAction =
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'DESELECT_LOCATION' }
  | { type: 'ENTER_LOCATION'; location: LocationData }
  | { type: 'EXIT_LOCATION' };

type GetData = <T extends keyof ListData>(type: T) => ListData[T][] | undefined;

export interface NavigateState {
  location: {
    current: LocationData | undefined;
    isLoadingInitialData: boolean;
    previousLocations: LocationData[] | undefined;
  };
  locations: { isLoadingInitialData: boolean };
  // entrypoint name, e.g. "home"
  readonly initial: string;
  readonly getData: GetData;
}

export type NavigateStateContext = [
  state: NavigateState,
  handleUpdateState: (action: NavigateAction) => void,
];

export function navigateReducer(
  state: NavigateState,
  action: NavigateAction
): NavigateState {
  if (action.type === 'SELECT_LOCATION') {
    return {
      ...state,
      location: {
        ...state.location,
        isLoadingInitialData: !state.location.isLoadingInitialData,
      },
    };
  }
  return state;
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
