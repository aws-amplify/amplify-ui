import { Permission } from '../../storage-internal';

import {
  ListActionOptions,
  ListActionOutput,
  ListAction,
  LocationType,
} from '../types';

export interface LocationData {
  bucket: string;
  permission: Permission;
  prefix: string;
  type: LocationType;
}

type ExcludeType = Permission | LocationType;

export interface ListLocationsActionOptions
  extends ListActionOptions<ExcludeType | ExcludeType[]> {}

export interface ListLocationsActionInput {
  options?: ListLocationsActionOptions;
}
export interface ListLocationsActionOutput
  extends ListActionOutput<LocationData> {}

export interface ListLocationsAction
  extends ListAction<ListLocationsActionInput, ListLocationsActionOutput> {}

export const listLocationsAction: ListLocationsAction =
  null as unknown as ListLocationsAction;
