import React from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import { ActionState } from './actions/createActionStateContext';
import {
  ListLocationsActionInput,
  ListLocationsActionOutput,
  createListLocationsAction,
} from './actions/listLocationsAction';
import { Config, useConfig } from './config';

export interface CreateProviderInput<T, K> {
  config: Config<K>;
  elements?: T;
}

export type LocationsDataState = ActionState<
  ListLocationsActionOutput,
  ListLocationsActionInput
>;

const INITIAL_VALUE = { locations: [], nextToken: undefined };
const ERROR_MESSAGE =
  '`useLocationsData` must be called from with `LocationsDataProvider';

const LocationsDataContext = React.createContext<
  LocationsDataState | undefined
>(undefined);

export function LocationsDataProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const { listLocations } = useConfig();
  const listLocationsAction = React.useRef(
    createListLocationsAction(listLocations)
  ).current;

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
