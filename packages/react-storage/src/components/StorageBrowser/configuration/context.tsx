import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { GetActionInputProviderProps, GetActionInput } from './types';
import { useGetActionInputCallback } from './useGetActionInputCallback';

const ERROR_MESSAGE =
  '`useGetActionInput` must be called from within a `ConfigurationProvider`.';

export const { useGetActionInput, GetActionInputContext } =
  createContextUtilities<GetActionInput>({
    contextName: 'GetActionInput',
    errorMessage: ERROR_MESSAGE,
  });

export function GetActionInputProvider({
  accountId,
  children,
  customEndpoint,
  region,
}: GetActionInputProviderProps): React.JSX.Element {
  const value = useGetActionInputCallback({
    accountId,
    customEndpoint,
    region,
  });

  return (
    <GetActionInputContext.Provider value={value}>
      {children}
    </GetActionInputContext.Provider>
  );
}
