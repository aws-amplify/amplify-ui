import React from 'react';

import { assertIsLocationData } from '../../validators';
import { useStore } from '../store';

import { useCredentials } from './credentials';
import { GetActionInput } from './types';

export const ERROR_MESSAGE =
  'Unable to resolve credentials due to invalid `location`.';

export function useGetActionInputCallback({
  accountId,
  region,
}: {
  accountId?: string;
  region: string;
}): GetActionInput {
  const { getCredentials } = useCredentials();
  const [{ history }] = useStore();
  const { current } = history;

  return React.useCallback(() => {
    assertIsLocationData(current, ERROR_MESSAGE);

    const { bucket, permission, prefix } = current;

    return {
      accountId,
      bucket,
      credentials: getCredentials({ bucket, permission, prefix }),
      region,
    };
  }, [accountId, current, getCredentials, region]);
}
