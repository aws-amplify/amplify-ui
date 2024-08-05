import React from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import { ActionState } from './createActionStateContext';
import {
  ListLocationsAction,
  ListLocationsActionInput,
  ListLocationsActionOutput,
} from './listLocationsAction';
import { Permission } from './types';

export type LocationsDataState = ActionState<
  ListLocationsActionOutput,
  ListLocationsActionInput
>;

const INITIAL_VALUE = { result: [], nextToken: undefined };
const ERROR_MESSAGE =
  '`useLocationsData` must be called from with `LocationsDataProvider';

const LocationsDataContext = React.createContext<
  LocationsDataState | undefined
>(undefined);

export function LocationsDataProvider<T = Permission>({
  children,
  listLocationsAction,
}: {
  children?: React.ReactNode;
  listLocationsAction: ListLocationsAction<T>;
}): React.JSX.Element {
  const value = useDataState(listLocationsAction, INITIAL_VALUE);

  return (
    <LocationsDataContext.Provider value={value}>
      {children}
    </LocationsDataContext.Provider>
  );
}

export function useLocationsData(): LocationsDataState {
  const context = React.useContext(LocationsDataContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE);
  }

  return context;
}
