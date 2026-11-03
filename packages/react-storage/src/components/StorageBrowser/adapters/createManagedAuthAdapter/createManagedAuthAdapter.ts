import { createLocationCredentialsHandler } from './createLocationCredentialsHandler';
import type {
  StorageBrowserAuthAdapter,
  CreateManagedAuthAdapterInput,
} from '../types';
import type { ListLocationsInput } from '../../actions';
import { listLocationsHandler } from '../../actions';

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
  instanceScope,
}: CreateManagedAuthAdapterInput): StorageBrowserAuthAdapter => {
  const config = {
    accountId,
    credentials: credentialsProvider,
    customEndpoint,
    region,
    instanceScope,
  };

  const listLocations = ({ options }: ListLocationsInput = {}) =>
    listLocationsHandler({ config, options });

  const getLocationCredentials = createLocationCredentialsHandler({
    credentialsProvider,
    accountId,
    customEndpoint,
    region,
    instanceScope,
  });

  return {
    accountId,
    listLocations,
    getLocationCredentials,
    region,
    registerAuthListener,
  };
};
