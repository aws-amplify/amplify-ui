import { isObject, isString } from '@aws-amplify/ui';

import type { LocationData, LocationPermissions } from '../actions';

function assertLocationPermissions(
  value: unknown,
  message: string
): asserts value is LocationPermissions {
  if (
    !Array.isArray(value) ||
    value.some(
      (inputPermissionEntry) =>
        typeof inputPermissionEntry !== 'string' ||
        !['list', 'get', 'write', 'delete'].includes(inputPermissionEntry)
    )
  ) {
    throw new Error(message);
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
