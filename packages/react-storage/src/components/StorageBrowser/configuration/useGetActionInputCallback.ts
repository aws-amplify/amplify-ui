import React from 'react';

import type { LocationData } from '../actions';
import { useCredentials } from '../credentials';
import { useStore } from '../store';
import { assertLocationData, assertPrefix } from '../validators';

import type { GetActionInput } from './types';

export const getErrorMessage = (propertyName: string): string =>
  `Unable to resolve credentials due to invalid value of '${propertyName}'`;

export function useGetActionInputCallback({
  accountId,
  customEndpoint,
  region,
}: {
  accountId?: string;
  customEndpoint?: string;
  region: string;
}): GetActionInput {
  const { getCredentials } = useCredentials();
  const [{ location }] = useStore();
  const { current, key } = location;

  return React.useCallback(
    (_location?: LocationData) => {
      // prefer passed in location / prefix over current location in state
      const location = _location ?? current;
      // when `location` has been provided as a param, resolve `_prefix` to `location.prefix`.
      // in the default scenario where `current` is the target `location` use the fully qualified `key`
      // that includes the default `prefix` and any additional prefixes from navigation
      const prefix = _location ? _location.prefix : key;

      assertLocationData(location, getErrorMessage('locationData'));

      assertPrefix(prefix, getErrorMessage('prefix'));

      const { bucket, permissions, type } = location;
      // BUCKET/PREFIX grants end with `*`, but object grants do not.
      const scope = `s3://${bucket}/${prefix}${type === 'OBJECT' ? '' : '*'}`;

      return {
        accountId,
        bucket,
        credentials: getCredentials({
          permissions,
          scope,
        }),
        region,
        customEndpoint,
      };
    },
    [accountId, current, customEndpoint, getCredentials, key, region]
  );
}
