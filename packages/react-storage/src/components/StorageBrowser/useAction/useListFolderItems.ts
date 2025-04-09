import React from 'react';

import { useAsyncReducer } from '@aws-amplify/ui-react-core';

import {
  LocationItemType,
  FolderData,
  ListLocationItemsHandlerInput,
  ListHandlerOutput,
} from '../actions';

import { USE_LIST_ERROR_MESSAGE } from './constants';
import { useActionHandlers } from './context';
import {
  createEnhancedListHandler,
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';
import { ListActionState } from './types';
import { useGetActionInput } from '../configuration';

type RemoveConfig<T> = Omit<T, 'config'>;
interface EnhancedInput
  extends RemoveConfig<
    EnhancedListHandlerInput<FolderData, LocationItemType>
  > {}

export interface UseListLocationItemsState
  extends ListActionState<
    EnhancedListHandlerOutput<FolderData>,
    EnhancedInput
  > {}

export type ListFolderItemsAction = (
  input: ListLocationItemsHandlerInput
) => Promise<ListHandlerOutput<FolderData>>;

export interface UseListFolderItemsState
  extends ListActionState<
    EnhancedListHandlerOutput<FolderData>,
    EnhancedListHandlerInput<FolderData, LocationItemType>
  > {}

export const useListFolderItems = (): UseListFolderItemsState => {
  const { handlers } = useActionHandlers({
    errorMessage: USE_LIST_ERROR_MESSAGE,
  });
  const getConfig = useGetActionInput();
  const { listLocationItems } = handlers as {
    listLocationItems: ListFolderItemsAction;
  };

  const enhancedHandler = React.useMemo(
    () =>
      createEnhancedListHandler((input: EnhancedInput) =>
        listLocationItems({ ...input, config: getConfig() })
      ),
    [getConfig, listLocationItems]
  );

  return useAsyncReducer(enhancedHandler, {
    items: [],
    nextToken: undefined,
  });
};
