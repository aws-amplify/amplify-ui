import React from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import {
  LocationItemType,
  ListLocationItemsHandler,
  LocationItemData,
} from '../actions';
import { useGetActionInput } from '../configuration';

import { USE_LIST_ERROR_MESSAGE } from './constants';
import { useActionHandlers } from './context';
import {
  createEnhancedListHandler,
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';
import { ListActionState } from './types';

type RemoveConfig<T> = Omit<T, 'config'>;

interface EnhancedInput
  extends RemoveConfig<
    EnhancedListHandlerInput<LocationItemData, LocationItemType>
  > {}

export interface UseListLocationItemsState
  extends ListActionState<
    EnhancedListHandlerOutput<LocationItemData>,
    EnhancedInput
  > {}

export const useListLocationItems = (): UseListLocationItemsState => {
  const { handlers } = useActionHandlers({
    errorMessage: USE_LIST_ERROR_MESSAGE,
  });
  const getConfig = useGetActionInput();
  const { listLocationItems } = handlers as {
    listLocationItems: ListLocationItemsHandler;
  };

  const enhancedHandler = React.useMemo(
    () =>
      createEnhancedListHandler((input: EnhancedInput) =>
        listLocationItems({ ...input, config: getConfig() })
      ),
    [getConfig, listLocationItems]
  );

  return useDataState(enhancedHandler, {
    items: [],
    nextToken: undefined,
  });
};
