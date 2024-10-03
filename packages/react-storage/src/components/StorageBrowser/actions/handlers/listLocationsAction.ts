import { Permission } from '@aws-amplify/storage/internals';

import {
  ActionInputConfig,
  ListActionOptions,
  ListActionInput,
  ListActionOutput,
  ListAction,
  LocationType,
} from '../types';

export interface LocationData<T = Permission, K = LocationType> {
  bucket: string;
  permission: T;
  prefix: string;
  type: K;
}

export interface ListLocationsActionOptions<T = Permission | LocationType>
  extends ListActionOptions {
  exclude?: T | T[];
}
export interface ListLocationsActionInput<T = Permission | LocationType>
  // `ListLocations` does not require `prefix`
  extends Omit<
    ListActionInput<ListLocationsActionOptions<T>>,
    'config' | 'prefix'
  > {
  // `ListLocations` does not require `bucket`
  config: Omit<ActionInputConfig, 'bucket'>;
}
export interface ListLocationsActionOutput<T = Permission | LocationType>
  extends ListActionOutput<LocationData<T>> {}

export interface ListLocationsAction<T = Permission | LocationType>
  extends ListAction<
    ListLocationsActionInput<T>,
    ListLocationsActionOutput<T>
  > {}

export const listLocationsAction: ListLocationsAction =
  null as unknown as ListLocationsAction;
