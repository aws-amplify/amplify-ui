import React from 'react';

import { AsyncDataAction, DataAction } from '@aws-amplify/ui-react-core';

import { Permission } from '../types';
import { useGetLocationConfig } from '../config';

import {
  ActionState,
  InitialValue,
  createActionStateContext,
} from './createActionStateContext';

import { createFolderAction } from './createFolderAction';
import { listLocationItemsAction } from './listLocationItemsAction';
import { ListLocationsAction } from './listLocationsAction';
import { LocationsDataProvider } from './locationsData';

export type ActionsWithConfig = {
  [K in keyof DefaultActions]: WithLocationConfig<DefaultActions[K]>;
};

export type DefaultActions = typeof DEFAULT_ACTIONS;
export type WithLocationConfig<T> = T extends AsyncDataAction<infer K, infer U>
  ? AsyncDataAction<K, Omit<U, 'config'>>
  : T extends DataAction<infer K, infer U>
  ? DataAction<K, Omit<U, 'config'>>
  : never;

export type UseActionState<T> = T extends
  | AsyncDataAction<infer K, infer U>
  | DataAction<infer K, infer U>
  ? ActionState<K, U>
  : never;

export const ERROR_MESSAGE =
  '`useAction` must be called from within `StorageBrowser.Provider`';

export const DEFAULT_ACTIONS = {
  CREATE_FOLDER: createFolderAction,
  LIST_LOCATION_ITEMS: listLocationItemsAction,
};

export const INITIAL_VALUE: InitialValue<ActionsWithConfig> = {
  CREATE_FOLDER: { result: undefined },
  LIST_LOCATION_ITEMS: { result: [], nextToken: undefined },
};

const [ActionStateProvider, useActionState] = createActionStateContext(
  DEFAULT_ACTIONS,
  ERROR_MESSAGE
);

export const useAction = <T extends keyof ActionsWithConfig>(
  type: T
): UseActionState<ActionsWithConfig[T]> => {
  const [state, handle] = useActionState({ type });
  const config = useGetLocationConfig();

  const handleAction = React.useCallback(
    (input: Parameters<UseActionState<ActionsWithConfig[T]>[1]>) =>
      handle({ ...input, config }),
    [config, handle]
  );

  return [state, handleAction] as UseActionState<ActionsWithConfig[T]>;
};

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
