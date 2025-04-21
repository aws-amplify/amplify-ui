import { isObject } from '@aws-amplify/ui';

import type { LocationData } from '../actions';

import { DEFAULT_STATE } from './constants';
import type {
  LocationValue,
  StorageBrowserValue,
  StoreProviderProps,
  StoreState,
} from './types';

export const parseLocationType = ({
  prefix,
}: LocationData | LocationValue): LocationData['type'] =>
  prefix?.endsWith('/') ? 'PREFIX' : prefix?.length ? 'OBJECT' : 'BUCKET';

export function getLocationData(
  location?: LocationData | LocationValue
): LocationData | undefined {
  if (location === undefined) return;

  const { bucket, permissions, prefix, id: _id, type: _type } = location;

  const id = _id ?? crypto.randomUUID();
  const type = _type ?? parseLocationType(location);

  return { bucket, permissions, prefix, id, type };
}

export function getState(
  value: StorageBrowserValue | null | undefined
): StoreState {
  if (value === undefined || value === null) return DEFAULT_STATE;

  const current = getLocationData(value.location);

  if (!current) return DEFAULT_STATE;

  const actionType = value?.actionType;
  const path = value?.location?.path ?? '';
  const key = `${current.prefix}${path}`;

  return { actionType, location: { current, key, path } };
}

export function getInitialState(
  defaultValue: StorageBrowserValue | null | undefined,
  legacyProps?: Pick<StoreProviderProps, 'actionType' | 'location' | 'path'>
): StoreState {
  // prefer `defaultValue` if provided
  if (isObject(defaultValue) || defaultValue === null) {
    return getState(defaultValue);
  }

  const legacyValue = legacyProps
    ? {
        actionType: legacyProps.actionType,
        location: legacyProps.location
          ? { ...legacyProps.location, path: legacyProps.path }
          : undefined,
      }
    : undefined;

  return getState(legacyValue);
}
