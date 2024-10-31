import { isObject, isString } from '@aws-amplify/ui';
import { LocationData } from '../actions';

export const LocationDataKey = [
  'bucket',
  'id',
  'permission',
  'prefix',
  'type',
] as const;

export function assertLocationData(
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
