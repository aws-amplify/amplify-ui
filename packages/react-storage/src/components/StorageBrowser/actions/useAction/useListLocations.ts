import React from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import { useActionConfig } from '../configs';
import {
  ListLocations,
  LocationData,
  ListLocationsExcludeOptions,
} from '../handlers';
import { ActionState } from '../types';

import {
  createEnhancedListHandler,
  EnhancedListHandlerInput,
  EnhancedListHandlerOutput,
} from './createEnhancedListHandler';

// Utility type functioning as a shim to allow for the outputted
// enhanced `ListLocations` handler to not require `config` and `prefix`
// in usage, which are required by the signature of `createEnhancedListHandler`
type RemoveConfigAndPrefix<T> = Omit<T, 'prefix' | 'config'>;

export interface UseListLocationsState
  extends ActionState<
    EnhancedListHandlerOutput<LocationData>,
    RemoveConfigAndPrefix<
      EnhancedListHandlerInput<LocationData, ListLocationsExcludeOptions>
    >
  > {}

export const useListLocations = (): UseListLocationsState => {
  const { handler } = useActionConfig('listLocations');
  const enhancedHandler = React.useMemo(
    () => createEnhancedListHandler(handler as ListLocations),
    [handler]
  );

  return useDataState(enhancedHandler, {
    items: [],
    nextToken: undefined,
  }) as UseListLocationsState;
};
