import React from 'react';

import { DataAction } from '@aws-amplify/ui-react-core';

import { Permission } from '../types';
import { useGetLocationConfig } from '../config';

import {
  ActionState,
  createActionStateContext,
} from './createActionStateContext';
import { downloadAction } from './downloadAction';

import { createFolderAction } from './createFolderAction';
import { listLocationItemsAction } from './listLocationItemsAction';
import { ListLocationsAction } from './listLocationsAction';
import { LocationsDataProvider } from './locationsData';

type ActionsWithConfig = {
  [K in keyof DefaultActions]: WithLocationConfig<DefaultActions[K]>;
};

type DefaultActions = typeof DEFAULT_ACTIONS;
type WithLocationConfig<T> = T extends DataAction<infer K, infer U>
  ? DataAction<K, Omit<U, 'config'>>
  : never;

type UseActionState<T> = T extends DataAction<infer K, infer U>
  ? ActionState<K, U>
  : never;

export const ERROR_MESSAGE =
  '`useAction` must be called from within `StorageBrowser.Provider`';

export const DEFAULT_ACTIONS = {
  CREATE_FOLDER: createFolderAction,
  DOWNLOAD: downloadAction,
  LIST_LOCATION_ITEMS: listLocationItemsAction,
};

export const INITIAL_VALUE = {
  CREATE_FOLDER: { result: undefined },
  LIST_LOCATION_ITEMS: { result: [], nextToken: undefined },
  DOWNLOAD: { key: '' },
};

const [ActionStateProvider, useActionState] = createActionStateContext(
  DEFAULT_ACTIONS,
  ERROR_MESSAGE
);

export const useAction = <T extends keyof ActionsWithConfig>({
  type,
}: {
  type: T;
}): UseActionState<ActionsWithConfig[T]> => {
  const [state, handle] = useActionState({ type });
  const getConfig = useGetLocationConfig();
  const handleAction = React.useCallback(
    (input: Parameters<UseActionState<ActionsWithConfig[T]>[1]>) =>
      handle({ ...input, config: getConfig }),
    [getConfig, handle]
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
