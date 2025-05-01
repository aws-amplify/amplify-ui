import type { LocationCredentialsProvider } from '../../storage-internal';
import {
  StorageValidationErrorCode,
  assertValidationError,
} from '../../storage-internal';

import { createStore, getValue, removeStore } from './registry';
import type {
  CreateLocationCredentialsStoreInput,
  CredentialsLocation,
  LocationCredentialsStore,
} from './types';

const validateS3Uri = (uri: string): void => {
  const s3UrlSchemaRegex = /^s3:\/\/[^/]+/;
  assertValidationError(
    s3UrlSchemaRegex.test(uri),
    StorageValidationErrorCode.InvalidS3Uri
  );
};

export const createLocationCredentialsStore = (
  input: CreateLocationCredentialsStoreInput
): LocationCredentialsStore => {
  const storeSymbol = createStore(input.handler);

  const store = {
    getProvider(providerLocation: CredentialsLocation) {
      const locationCredentialsProvider = async ({
        forceRefresh = false,
      }: Parameters<LocationCredentialsProvider>[0] = {}) => {
        validateS3Uri(providerLocation.scope);

        // TODO(@AllanZhengYP): validate the action bucket and paths matches provider scope.
        return getValue({
          storeSymbol,
          location: { ...providerLocation },
          forceRefresh,
        });
      };

      return locationCredentialsProvider;
    },

    destroy() {
      removeStore(storeSymbol);
    },
  };

  return store;
};
