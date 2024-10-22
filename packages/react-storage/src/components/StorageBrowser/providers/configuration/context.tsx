import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { GetCredentials, useCredentials } from './credentials';
import { useHistory } from '../store/history';
import { ConfigurationProviderProps, GetActionInput } from './types';

const ERROR_MESSAGE =
  '`useGetActionInput` must be called from within a `ConfigurationProvider`.';

export const { useGetActionInput, GetActionInputContext } =
  createContextUtilities<GetActionInput>({
    contextName: 'GetActionInput',
    errorMessage: ERROR_MESSAGE,
  });

export function useGetActionInputCallback({
  accountId,
  getCredentials,
  region,
}: {
  accountId?: string;
  getCredentials: GetCredentials;
  region: string;
}): GetActionInput {
  const [{ current }] = useHistory();

  return React.useCallback(() => {
    if (!current || !getCredentials) {
      // @todo: split in to multiple validations
      throw new Error('Unable to resolve credentials.');
    }

    const { bucket, permission, prefix } = current;

    return {
      accountId,
      bucket,
      credentials: getCredentials({ bucket, permission, prefix }),
      region,
    };
  }, [accountId, current, getCredentials, region]);
}

export function ConfigurationProvider({
  accountId,
  children,
  region,
}: ConfigurationProviderProps): React.JSX.Element {
  const { getCredentials } = useCredentials();
  const value = useGetActionInputCallback({
    accountId,
    getCredentials,
    region,
  });

  return (
    <GetActionInputContext.Provider value={value}>
      {children}
    </GetActionInputContext.Provider>
  );
}
