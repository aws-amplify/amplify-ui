import React from 'react';

import { isObject, isString } from '@aws-amplify/ui';

import { LocationData as _LocationData } from '../../actions';
import { useHistory } from '../store';

import { useCredentials } from './credentials';
import { GetActionInput } from './types';

export const ERROR_MESSAGE =
  'Unable to resolve credentials due to invalid `location`.';

// temp: LocationData will be extended to include id during integration
interface LocationData extends _LocationData {
  id: string;
}

export const LocationDataKey = [
  'bucket',
  'id',
  'permission',
  'prefix',
  'type',
] as const;

// temp: move util to live with listLocations handler during integration
function assertIsLocationData(
  value: LocationData | undefined,
  message?: string
): asserts value is LocationData {
  if (
    !isObject(value) ||
    LocationDataKey.some((key) => !isString(value[key]))
  ) {
    throw new Error(message ?? 'Invalid value provided as `location`.');
  }
}

export function useGetActionInputCallback({
  accountId,
  region,
}: {
  accountId?: string;
  region: string;
}): GetActionInput {
  const { getCredentials } = useCredentials();
  const [{ current }] = useHistory();

  return React.useCallback(() => {
    assertIsLocationData(
      current,
      'Unable to resolve credentials due to invalid `location`.'
    );

    const { bucket, permission, prefix } = current;

    return {
      accountId,
      bucket,
      credentials: getCredentials({ bucket, permission, prefix }),
      region,
    };
  }, [accountId, current, getCredentials, region]);
}
