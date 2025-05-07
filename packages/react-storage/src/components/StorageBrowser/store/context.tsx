import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { DEFAULT_STATE } from './constants';
import type { StoreProviderProps, StoreContextType } from './types';
import useStoreReducer from './useStoreReducer';

const DEFAULT_VALUE: StoreContextType = [DEFAULT_STATE, noop];
export const { StoreContext, useStore } = createContextUtilities({
  contextName: 'Store',
  defaultValue: DEFAULT_VALUE,
});

export function StoreProvider({
  children,
  ...props
}: StoreProviderProps): React.JSX.Element {
  const value = useStoreReducer(props);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
