import { isObject, isString } from '@aws-amplify/ui';
import isArray from 'lodash/isArray.js';

import { LocationData } from '../actions';
import { LocationPermissions } from '../credentials/types';

function assertLocationPermissions(
  value: unknown,
  message?: string
): asserts value is LocationPermissions {
  if (
    !isArray(value) ||
    value.some(
      (inputPermissionEntry) =>
        typeof inputPermissionEntry !== 'string' ||
        !['list', 'get', 'write', 'delete'].includes(inputPermissionEntry)
    )
  ) {
    throw new Error(message ?? 'Invalid value provided as `permissions`.');
  }
}

export function assertLocationData(
  value: LocationData | undefined,
  message: string = 'Invalid value provided as `location`.'
): asserts value is LocationData {
  const locationStringDataKeys = ['bucket', 'id', 'prefix', 'type'] as const;
  if (
    !isObject(value) ||
    locationStringDataKeys.some((key) => !isString(value[key]))
  ) {
    throw new Error(message);
  }
  assertLocationPermissions(value?.permissions, message);
}

export function assertPrefix(
  value: string | undefined,
  message?: string
): asserts value is string {
  if (!isString(value)) {
    throw new Error(message ?? 'Invalid value provided as `prefix`.');
  }
}
