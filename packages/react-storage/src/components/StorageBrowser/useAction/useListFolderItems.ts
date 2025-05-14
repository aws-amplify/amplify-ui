import React from 'react';

import { useAsyncReducer } from '@aws-amplify/ui-react-core';

import type {
  FolderData,
  ListLocationItemsHandlerInput,
  ListHandlerOutput,
} from '../actions';

import { USE_LIST_ERROR_MESSAGE } from './constants';
import { useActionHandlers } from './context';
import type {
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';
import { createEnhancedListHandler } from './createEnhancedListHandler';
import type { ListActionState } from './types';
import { useGetActionInput } from '../configuration';

type RemoveConfig<T> = Omit<T, 'config'>;

export type ListFolderItemsAction = (
  input: ListLocationItemsHandlerInput
) => Promise<ListHandlerOutput<FolderData>>;

export interface UseListFolderItemsState
  extends ListActionState<
    EnhancedListHandlerOutput<FolderData>,
    RemoveConfig<
      EnhancedListHandlerInput<ListLocationItemsHandlerInput, FolderData>
    >
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
      createEnhancedListHandler((input) =>
        listLocationItems({ ...input, config: getConfig() })
      ),
    [getConfig, listLocationItems]
  );

  return useAsyncReducer(enhancedHandler, {
    items: [],
    nextToken: undefined,
  });
};
