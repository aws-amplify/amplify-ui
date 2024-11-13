import React from 'react';

import { assertLocationData } from '../../validators';
import { useStore } from '../store';

import { useCredentials } from './credentials';
import { GetActionInput } from './types';
import { LocationData } from '../../actions';
import { assertPrefix, assertScope } from '../../validators/assertLocationData';

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
    (location?: LocationData) => {
      // prefer passed in location / prefix over current location in state
      const _location = location ?? current;
      // full S3 prefix is `prefix` in LocationData, but `key` in LocationState
      const _prefix = location?.prefix ?? key;
      assertLocationData(_location, getErrorMessage('locationData'));
      assertPrefix(_prefix, getErrorMessage('prefix'));

      const { bucket, permission, type } = _location;
      // BUCKET/PREFIX grants end with `*`, but object grants do not.
      const scope = `s3://${bucket}/${_prefix}${type === 'OBJECT' ? '' : '*'}`;
      assertScope(scope, getErrorMessage('scope'));

      return {
        accountId,
        bucket,
        credentials: getCredentials({
          scope,
          permission,
        }),
        region,
        customEndpoint,
      };
    },
    [accountId, current, customEndpoint, getCredentials, key, region]
  );
}
