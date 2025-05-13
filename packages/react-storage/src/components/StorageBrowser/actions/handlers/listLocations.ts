import { listCallerAccessGrants } from '../../storage-internal';
import { assertAccountId } from '../../validators';

import type {
  ListHandlerOptions,
  ListHandler,
  ListLocationsExcludeOptions,
  LocationData,
  ActionInputConfig,
} from './types';
import { getFilteredLocations } from './utils';

const DEFAULT_PAGE_SIZE = 1000;

export interface ListLocationsOptions extends ListLocationsHandlerOptions {}

export interface ListLocationsInput {
  options?: ListLocationsOptions;
}

export interface ListLocationsOutput {
  items: LocationData[];
  nextToken: string | undefined;
}

// `ListLocations` and its associated input/output types are the types
// used `Config` option of `CreateStorageBrowser` that do not require
// `config` values as they are provided through higher-order functions
// defined in the default and managed auth adapters
export interface ListLocations
  extends ListHandler<ListLocationsInput, ListLocationsOutput> {}

export interface ListLocationsHandlerOptions
  extends ListHandlerOptions<ListLocationsExcludeOptions> {}

export interface ListLocationsHandlerInput {
  options?: ListLocationsHandlerOptions;
  config: Omit<ActionInputConfig, 'bucket'>;
}

export interface ListLocationsHandlerOutput extends ListLocationsOutput {}

export interface ListLocationsHandler
  extends ListHandler<ListLocationsHandlerInput, ListLocationsHandlerOutput> {}

export const listLocationsHandler: ListLocationsHandler = async (input) => {
  const { config, options } = input;
  const { accountId, credentials, customEndpoint, region } = config;
  const { exclude, nextToken, pageSize = DEFAULT_PAGE_SIZE } = options ?? {};

  const fetchLocations = async (
    accumulatedItems: LocationData[],
    locationsNextToken: ListLocationsOutput['nextToken']
  ): Promise<ListLocationsHandlerOutput> => {
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

    const parsedOutput = getFilteredLocations(output.locations, exclude);

    const items = [...accumulatedItems, ...parsedOutput];

    if (output.nextToken && items.length < pageSize) {
      return fetchLocations(items, output.nextToken);
    }

    return { items, nextToken: output.nextToken };
  };

  return fetchLocations([], nextToken);
};
