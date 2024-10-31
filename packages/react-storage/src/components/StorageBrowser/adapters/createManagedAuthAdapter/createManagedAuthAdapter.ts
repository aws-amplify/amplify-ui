// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
    customEndpoint: customEndpoint?.control,
    region,
  });

  const getLocationCredentials = createLocationCredentialsHandler({
    credentialsProvider,
    accountId,
    customEndpoint: customEndpoint?.control,
    region,
  });

  return {
    accountId,
    customEndpoint: customEndpoint?.data,
    listLocations,
    getLocationCredentials,
    region,
    registerAuthListener,
  };
};
