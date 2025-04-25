// import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { UseListLocationItemsState } from '../useAction/useListLocationItems';
// import { useListLocationItems } from '../useAction/useListLocationItems';
import { noop } from '@aws-amplify/ui';

interface LocationItemsState extends UseListLocationItemsState {}

export const DEFAULT_STATE: LocationItemsState = [
  {
    hasError: false,
    isLoading: false,
    message: undefined,
    value: { nextToken: undefined, items: [] },
  },
  noop,
];

export const { LocationItemsProvider, useLocationItems } =
  createContextUtilities({
    contextName: 'LocationItems',
    defaultValue: DEFAULT_STATE,
  });
