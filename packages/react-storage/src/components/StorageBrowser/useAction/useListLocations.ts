import React from 'react';

import { useAsyncReducer } from '@aws-amplify/ui-react-core';

import {
  LocationData,
  ListLocationsExcludeOptions,
  ListLocations,
} from '../actions';

import { USE_LIST_ERROR_MESSAGE } from './constants';
import { useActionHandlers } from './context';
import {
  createEnhancedListHandler,
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';
import { ListActionState } from './types';

// Utility type functioning as a shim to allow for the outputted
// enhanced `ListLocations` handler to not require `config` and `prefix`
// in usage, which are required by the signature of `createEnhancedListHandler`
type RemoveConfigAndPrefix<T> = Omit<T, 'prefix' | 'config'>;

export interface UseListLocationsState
  extends ListActionState<
    EnhancedListHandlerOutput<LocationData>,
    RemoveConfigAndPrefix<
      EnhancedListHandlerInput<LocationData, ListLocationsExcludeOptions>
    >
  > {}

export const useListLocations = (): UseListLocationsState => {
  const { handlers } = useActionHandlers({
    errorMessage: USE_LIST_ERROR_MESSAGE,
  });
  const { listLocations } = handlers;
  const enhancedHandler = React.useMemo(
    () => createEnhancedListHandler(listLocations as ListLocations),
    [listLocations]
  );

  return useAsyncReducer(enhancedHandler, {
    items: [],
    nextToken: undefined,
  }) as UseListLocationsState;
};
