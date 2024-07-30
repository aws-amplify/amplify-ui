import React from 'react';

import { USE_ACTION_ERROR_MESSAGE } from './constants';
import {
  ActionState,
  createActionStateContext,
} from './createActionStateContext';
import {
  listLocationItemsAction,
  ListLocationItemsActionInput,
  ListLocationItemsActionOutput,
} from './listLocationItemsAction';
import { ListLocationsAction, _ListLocations } from './listLocationsAction';
import { LocationsDataProvider } from './locationsData';
import { Permission } from './types';

export type LocationItemsState = ActionState<
  ListLocationItemsActionOutput,
  ListLocationItemsActionInput
>;

export const DEFAULT_ACTIONS = { LIST_LOCATION_ITEMS: listLocationItemsAction };
export const INITIAL_VALUE = {
  LIST_LOCATION_ITEMS: { items: [], nextToken: undefined },
};

export const [ActionStateProvider, useAction] = createActionStateContext(
  DEFAULT_ACTIONS,
  USE_ACTION_ERROR_MESSAGE
);

export function ActionProvider<T = Permission>({
  children,
  listLocationsAction,
}: {
  children?: React.ReactNode;
  listLocationsAction: ListLocationsAction<T>;
}): React.JSX.Element {
  return (
    <LocationsDataProvider listLocationsAction={listLocationsAction}>
      <ActionStateProvider initialValue={INITIAL_VALUE}>
        {children}
      </ActionStateProvider>
    </LocationsDataProvider>
  );
}
