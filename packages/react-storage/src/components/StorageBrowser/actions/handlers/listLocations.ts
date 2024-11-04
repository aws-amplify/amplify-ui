import {
  ListLocationsOutput,
  Permission,
  listCallerAccessGrants,
} from '../../storage-internal';
import { assertAccountId } from '../../validators';

import {
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
  ListHandler,
} from '../types';

import { LocationData, LocationType } from './types';
import { parseLocations } from './utils';

const DEFAULT_PAGE_SIZE = 1000;

type ExcludeType = Permission | LocationType;

export interface ListLocationsHandlerOptions
  extends ListHandlerOptions<ExcludeType | ExcludeType[]> {}

export interface ListLocationsHandlerInput
  extends ListHandlerInput<ListLocationsHandlerOptions> {}

export interface ListLocationsHandlerOutput
  extends ListHandlerOutput<LocationData> {}

export interface ListLocationsHandler
  extends ListHandler<ListLocationsHandlerInput, ListLocationsHandlerOutput> {}

const shouldExclude = (
  permission: Permission,
  type: LocationType,
  exclude?: ExcludeType | ExcludeType[]
) =>
  !exclude
    ? false
    : typeof exclude === 'string'
    ? exclude === permission || exclude === type
    : exclude.includes(permission) || exclude.includes(type);

export const listLocationsHandler: ListLocationsHandler = async (input) => {
  const { config, options } = input;
  const { accountId, credentials, region } = config;
  const { exclude, nextToken, pageSize = DEFAULT_PAGE_SIZE } = options ?? {};

  const fetchLocations = async (
    accumulatedItems: LocationData[],
    locationsNextToken: ListLocationsOutput['nextToken']
  ): Promise<{
    items: LocationData[];
    nextToken: ListLocationsOutput['nextToken'];
  }> => {
    const remainingPageSize = pageSize - accumulatedItems.length;

    assertAccountId(accountId);

    const output = await listCallerAccessGrants({
      accountId,
      credentialsProvider: credentials,
      nextToken: locationsNextToken,
      pageSize: remainingPageSize,
      region,
    });

    const parsedOutput = parseLocations(output.locations).filter(
      ({ permission, type }) => shouldExclude(permission, type, exclude)
    );

    const items = [...accumulatedItems, ...parsedOutput];

    if (output.nextToken && items.length < pageSize) {
      return fetchLocations(items, output.nextToken);
    }

    return { items: items, nextToken: output.nextToken };
  };

  return fetchLocations([], nextToken);
};
