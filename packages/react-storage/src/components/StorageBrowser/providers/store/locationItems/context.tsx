import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

// temp: to be replaced with listLocationItems data type during integration
export interface FileData {
  key: string;
  lastModified: Date;
  id: string;
  size: number;
  type: 'FILE';
}

export const DEFAULT_STATE: LocationItemsState = {
  fileDataItems: undefined,
};

export type LocationItemsAction =
  | { type: 'RESET' }
  | { type: 'SET_FILE_DATA'; items?: FileData[] }
  | { type: 'REMOVE_FILE_DATA'; id: string };

export interface LocationItemsState {
  fileDataItems: FileData[] | undefined;
}

export type HandleLocationItemsAction = (event: LocationItemsAction) => void;

export type LocationItemStateContext = [
  LocationItemsState,
  HandleLocationItemsAction,
];

export interface LocationItemsProviderProps {
  locationItems?: LocationItemsState;
  children?: React.ReactNode;
}

const locatonItemsReducer = (
  prevState: LocationItemsState,
  event: LocationItemsAction
): LocationItemsState => {
  switch (event.type) {
    case 'SET_FILE_DATA': {
      const { items } = event;
      if (!items?.length) return prevState;

      if (!prevState.fileDataItems?.length) return { fileDataItems: items };

      const nextFileDataItems = items?.reduce(
        (fileDataItems: FileData[], item) =>
          prevState.fileDataItems?.some(({ id }) => id === item.id)
            ? fileDataItems
            : [...fileDataItems, item],
        []
      );

      if (!nextFileDataItems?.length) return prevState;

      return {
        fileDataItems: [...prevState.fileDataItems, ...nextFileDataItems],
      };
    }
    case 'REMOVE_FILE_DATA': {
      const { id } = event;

      if (!prevState.fileDataItems) return prevState;

      const fileDataItems = prevState.fileDataItems.filter(
        (item) => item.id !== id
      );

      if (fileDataItems.length === prevState.fileDataItems.length) {
        return prevState;
      }

      return { fileDataItems };
    }
    case 'RESET': {
      return DEFAULT_STATE;
    }
  }
};

const defaultValue: LocationItemStateContext = [DEFAULT_STATE, noop];
export const { LocationItemsContext, useLocationItems } =
  createContextUtilities({
    contextName: 'LocationItems',
    defaultValue,
  });

export function LocationItemsProvider({
  children,
  locationItems = DEFAULT_STATE,
}: LocationItemsProviderProps): React.JSX.Element {
  const value = React.useReducer(locatonItemsReducer, locationItems);

  return (
    <LocationItemsContext.Provider value={value}>
      {children}
    </LocationItemsContext.Provider>
  );
}
