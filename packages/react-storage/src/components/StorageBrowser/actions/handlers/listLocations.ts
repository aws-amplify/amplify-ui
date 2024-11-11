import {
  ListLocationsOutput,
  listCallerAccessGrants,
} from '../../storage-internal';
import { assertAccountId } from '../../validators';

import {
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
  ListHandler,
} from './types';

import { LocationData } from './types';
import { parseAccessGrantLocations, ExcludeType } from './utils';

const DEFAULT_PAGE_SIZE = 1000;

export interface ListLocationsHandlerOptions
  extends ListHandlerOptions<ExcludeType> {}

export interface ListLocationsHandlerInput
  extends ListHandlerInput<ListLocationsHandlerOptions> {}

export interface ListLocationsHandlerOutput
  extends ListHandlerOutput<LocationData> {}

export interface ListLocationsHandler
  extends ListHandler<ListLocationsHandlerInput, ListLocationsHandlerOutput> {}

export const listLocationsHandler: ListLocationsHandler = async (input) => {
  const { config, options } = input;
  const { accountId, credentials, customEndpoint, region } = config;
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
      customEndpoint,
      nextToken: locationsNextToken,
      pageSize: remainingPageSize,
      region,
    });

    const parsedOutput = parseAccessGrantLocations(output.locations, exclude);

    const items = [...accumulatedItems, ...parsedOutput];

    if (output.nextToken && items.length < pageSize) {
      return fetchLocations(items, output.nextToken);
    }

    return { items: items, nextToken: output.nextToken };
  };

  return fetchLocations([], nextToken);
};
