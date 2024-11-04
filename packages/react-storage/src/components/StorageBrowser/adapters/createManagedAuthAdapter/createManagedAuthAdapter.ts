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
  credentialsProvider,
  region,
  accountId,
  registerAuthListener,
}: CreateManagedAuthAdapterInput): StorageBrowserAuthAdapter => {
  const listLocations = createListLocationsHandler({
    credentialsProvider,
    accountId,
    region,
  });

  const getLocationCredentials = createLocationCredentialsHandler({
    credentialsProvider,
    accountId,
    region,
  });

  return {
    listLocations,
    getLocationCredentials,
    region,
    registerAuthListener,
  };
};
