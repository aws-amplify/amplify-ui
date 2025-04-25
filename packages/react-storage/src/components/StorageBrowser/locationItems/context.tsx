import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import { useStore } from '../store';
import type { LocationItemsContextType } from './useLocationItemsReducer';
import useLocationItemsReducer from './useLocationItemsReducer';

export const DEFAULT_STATE: LocationItemsContextType = [
  {
    hasError: false,
    isLoading: false,
    message: undefined,
    hasExhaustedSearch: false,
    hasNextPage: false,
    highestPageVisited: 1,
    page: 1,
    pageItems: [],
  },
  noop,
];

export const { LocationItemsContext, useLocationItems } =
  createContextUtilities({
    contextName: 'LocationItems',
    defaultValue: DEFAULT_STATE,
  });

interface LocationItemsProviderProps {
  children?: React.ReactNode;
  // page?: number;
  // startAfter?: string;
}

export function LocationItemsProvider({
  children,
}: LocationItemsProviderProps): JSX.Element {
  const [{ location }] = useStore();
  const value = useLocationItemsReducer(location, {
    delimiter: '/',
    pageSize: 100,
  });
  return (
    <LocationItemsContext.Provider value={value}>
      {children}
    </LocationItemsContext.Provider>
  );
}
