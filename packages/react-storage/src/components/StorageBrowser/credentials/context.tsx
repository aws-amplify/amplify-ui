import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { CredentialsProviderProps, CredentialsStore } from './types';
import { useCredentialsStore } from './useCredentialsStore';

const ERROR_MESSAGE =
  '`useCredentials` must be called from within a `CredentialsProvider`.';

export const { useCredentials, CredentialsContext } =
  createContextUtilities<CredentialsStore>({
    contextName: 'Credentials',
    errorMessage: ERROR_MESSAGE,
  });

export function CredentialsProvider({
  children,
  ...props
}: CredentialsProviderProps): React.JSX.Element {
  const initialValue = React.useContext(CredentialsContext);
  const value = useCredentialsStore({ ...props, initialValue });

  return (
    <CredentialsContext.Provider value={value}>
      {children}
    </CredentialsContext.Provider>
  );
}
