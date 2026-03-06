import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import type { FileData, FileDataItem, LocationItemData } from '../actions';
import { createFileDataItem } from '../actions';

export const DEFAULT_STATE: LocationItemsState = {
  dataItems: undefined,
  fileDataItems: undefined,
};

export type LocationItemsAction =
  | { type: 'SET_LOCATION_ITEMS'; items?: LocationItemData[] }
  | { type: 'REMOVE_LOCATION_ITEM'; id: string }
  | { type: 'RESET_LOCATION_ITEMS' };

export interface LocationItemsState {
  /**
   * Selected items (files and folders)
   * Replaces fileDataItems to support mixed selections
   */
  dataItems?: LocationItemData[];

  /**
   * @deprecated Use dataItems instead
   * Will be removed in v4.0.0
   */
  fileDataItems?: FileDataItem[];
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

      const nextDataItems = !prevState.dataItems?.length
        ? items
        : prevState.dataItems.concat(
            items.filter(
              (data) => !prevState.dataItems?.some(({ id }) => id === data.id)
            )
          );

      const fileItems = items.filter(
        (item) => item.type === 'FILE'
      ) as FileData[];

      const nextFileDataItems = !prevState.fileDataItems?.length
        ? fileItems.map(createFileDataItem)
        : prevState.fileDataItems.concat(
            fileItems
              .filter(
                (data) =>
                  !prevState.fileDataItems?.some(({ id }) => id === data.id)
              )
              .map(createFileDataItem)
          );

      return {
        dataItems: nextDataItems,
        fileDataItems: nextFileDataItems,
      };
    }
    case 'REMOVE_LOCATION_ITEM': {
      const { id } = event;

      const dataItems = prevState.dataItems?.filter((item) => item.id !== id);
      const fileDataItems = prevState.fileDataItems?.filter(
        (item) => item.id !== id
      );

      if (
        dataItems?.length === prevState.dataItems?.length &&
        fileDataItems?.length === prevState.fileDataItems?.length
      ) {
        return prevState;
      }

      return { dataItems, fileDataItems };
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
