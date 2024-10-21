import { Permission } from '../../storage-internal';

import { ListHandlerOptions, ListHandlerOutput, ListHandler } from '../types';
import { LocationData, LocationType } from './types';

type ExcludeType = Permission | LocationType;

export interface ListLocationsHandlerOptions
  extends ListHandlerOptions<ExcludeType | ExcludeType[]> {}

export interface ListLocationsHandlerInput {
  options?: ListLocationsHandlerOptions;
}
export interface ListLocationsHandlerOutput
  extends ListHandlerOutput<LocationData> {}

export interface ListLocationsHandler
  extends ListHandler<ListLocationsHandlerInput, ListLocationsHandlerOutput> {}

export const listLocationsHandler: ListLocationsHandler =
  null as unknown as ListLocationsHandler;
