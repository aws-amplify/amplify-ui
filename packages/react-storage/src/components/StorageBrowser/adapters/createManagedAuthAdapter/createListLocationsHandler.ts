import { ListLocations } from '../types';
import {
  listCallerAccessGrants,
  CredentialsProvider,
} from '../../storage-internal';
import { parseAccessGrantPermission } from '../permissionParsers';

interface CreateListLocationsHandlerInput {
  accountId: string;
  credentialsProvider: CredentialsProvider;
  region: string;
  customEndpoint?: string;
}

export const createListLocationsHandler = (
  handlerInput: CreateListLocationsHandlerInput
): ListLocations => {
  return async function listLocations(input = {}) {
    const { locations, nextToken } = await listCallerAccessGrants({
      ...input,
      ...handlerInput,
    });

    return {
      nextToken,
      locations: locations.map((location) => ({
        ...location,
        permissions: parseAccessGrantPermission(location.permission),
      })),
    };
  };
};
