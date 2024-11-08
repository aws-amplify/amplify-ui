import { createListLocationsHandler } from './createListLocationsHandler';
import { createLocationCredentialsHandler } from './createLocationCredentialsHandler';
import {
  StorageBrowserAuthAdapter,
  CreateManagedAuthAdapterInput,
} from '../types';

/**
 * Create configuration including handlers to call S3 Access Grant APIs to list and get
 * credentials for different locations.
 *
 * @param options - Configuration options for the adapter.
 * @returns - An object containing the handlers to call S3 Access Grant APIs and region
 */
export const createManagedAuthAdapter = ({
  accountId,
  credentialsProvider,
  customEndpoint,
  region,
  registerAuthListener,
}: CreateManagedAuthAdapterInput): StorageBrowserAuthAdapter => {
  const listLocations = createListLocationsHandler({
    credentialsProvider,
    accountId,
    customEndpoint,
    region,
  });

  const getLocationCredentials = createLocationCredentialsHandler({
    credentialsProvider,
    accountId,
    customEndpoint,
    region,
  });

  return {
    accountId,
    listLocations,
    getLocationCredentials,
    region,
    registerAuthListener,
  };
};
