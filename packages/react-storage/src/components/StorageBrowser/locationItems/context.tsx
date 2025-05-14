import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import type { FileData, FileDataItem } from '../actions';
import { createFileDataItem } from '../actions';

export const DEFAULT_STATE: LocationItemsState = {
  fileDataItems: undefined,
};

export type LocationItemsAction =
  | { type: 'SET_LOCATION_ITEMS'; items?: FileData[] }
  | { type: 'REMOVE_LOCATION_ITEM'; id: string }
  | { type: 'RESET_LOCATION_ITEMS' };

export interface LocationItemsState {
  fileDataItems: FileDataItem[] | undefined;
}

export type HandleLocationItemsAction = (event: LocationItemsAction) => void;

export type LocationItemStateContext = [
  LocationItemsState,
  HandleLocationItemsAction,
];

export interface LocationItemsProviderProps {
  children?: React.ReactNode;
}

const locationItemsReducer = (
  prevState: LocationItemsState,
  event: LocationItemsAction
): LocationItemsState => {
  switch (event.type) {
    case 'SET_LOCATION_ITEMS': {
      const { items } = event;
      if (!items?.length) return prevState;

      if (!prevState.fileDataItems?.length) {
        return { fileDataItems: items.map(createFileDataItem) };
      }

      const nextFileDataItems: FileDataItem[] = items?.reduce(
        (fileDataItems: FileDataItem[], data) =>
          prevState.fileDataItems?.some(({ id }) => id === data.id)
            ? fileDataItems
            : fileDataItems.concat(createFileDataItem(data)),
        []
      );

      if (!nextFileDataItems?.length) return prevState;

      return {
        fileDataItems: prevState.fileDataItems.concat(nextFileDataItems),
      };
    }
    case 'REMOVE_LOCATION_ITEM': {
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
    case 'RESET_LOCATION_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};

const defaultValue: LocationItemStateContext = [DEFAULT_STATE, noop];
export const { LocationItemsContext, useLocationItems } =
  createContextUtilities({ contextName: 'LocationItems', defaultValue });

export function LocationItemsProvider({
  children,
}: LocationItemsProviderProps): React.JSX.Element {
  const value = React.useReducer(locationItemsReducer, DEFAULT_STATE);

  return (
    <LocationItemsContext.Provider value={value}>
      {children}
    </LocationItemsContext.Provider>
  );
}
