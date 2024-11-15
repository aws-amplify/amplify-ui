import {
  AWSTemporaryCredentials,
  StorageValidationErrorCode,
  assertValidationError,
} from '../../storage-internal';
import { GetLocationCredentials, CredentialsLocation } from '../types';

import {
  LruLocationCredentialsStore,
  fetchNewValue,
  getCacheValue,
  initStore,
} from './store';

interface StoreRegistrySymbol {
  readonly value: symbol;
}

/**
 * Keep all cache records for all instances of credentials store in a singleton
 * so we can reliably de-reference from the memory when we destroy a store
 * instance.
 */
const storeRegistry = new WeakMap<
  StoreRegistrySymbol,
  LruLocationCredentialsStore
>();

/**
 * @internal
 */
export const createStore = (
  refreshHandler: GetLocationCredentials,
  size?: number
): StoreRegistrySymbol => {
  const storeSymbol = { value: Symbol('LocationCredentialsStore') };
  storeRegistry.set(storeSymbol, initStore(refreshHandler, size));

  return storeSymbol;
};

const getCredentialsStore = (storeSymbol: StoreRegistrySymbol) => {
  assertValidationError(
    storeRegistry.has(storeSymbol),
    StorageValidationErrorCode.LocationCredentialsStoreDestroyed
  );

  return storeRegistry.get(storeSymbol)!;
};

/**
 * @internal
 */
export const getValue = async (input: {
  storeSymbol: StoreRegistrySymbol;
  location: CredentialsLocation;
  forceRefresh: boolean;
}): Promise<{ credentials: AWSTemporaryCredentials }> => {
  const { storeSymbol: storeReference, location, forceRefresh } = input;
  const store = getCredentialsStore(storeReference);
  if (!forceRefresh) {
    const credentials = getCacheValue(store, location);
      if (credentials !== null) {
        return { credentials };
      }
  }

  return fetchNewValue(store, location);
};

export const removeStore = (storeSymbol: StoreRegistrySymbol): void => {
  storeRegistry.delete(storeSymbol);
};
