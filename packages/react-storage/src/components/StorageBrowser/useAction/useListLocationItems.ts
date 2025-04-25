import React from 'react';

import { useAsyncReducer } from '@aws-amplify/ui-react-core';

import type {
  LocationItemType,
  ListLocationItemsHandler,
  ListLocationItemsHandlerOptions,
  LocationItemData,
} from '../actions';
import { useGetActionInput } from '../configuration';

import { USE_LIST_ERROR_MESSAGE } from './constants';
import { useActionHandlers } from './context';
import type {
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';
import { createEnhancedListHandler } from './createEnhancedListHandler';
import type { ListActionState } from './types';

type RemoveConfig<T> = Omit<T, 'config'>;

interface BaseInput
  extends RemoveConfig<
    EnhancedListHandlerInput<LocationItemData, LocationItemType>
  > {}

interface EnhancedInput extends Omit<BaseInput, 'options'> {
  options?: BaseInput['options'] & ListLocationItemsHandlerOptions;
}

export interface LocationItemsState
  extends EnhancedListHandlerOutput<LocationItemData> {}

export interface UseListLocationItemsState
  extends ListActionState<LocationItemsState, EnhancedInput> {}

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

  return useAsyncReducer(enhancedHandler, {
    items: [],
    nextToken: undefined,
  });
};
