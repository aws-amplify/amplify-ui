import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { GetActionInputProviderProps, GetActionInput } from './types';
import { LocationData as _LocationData } from '../../actions';
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
  region,
}: GetActionInputProviderProps): React.JSX.Element {
  const value = useGetActionInputCallback({
    accountId,
    region,
  });

  return (
    <GetActionInputContext.Provider value={value}>
      {children}
    </GetActionInputContext.Provider>
  );
}
