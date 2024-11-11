import { LocationPermissions } from '../../credentials/types';
import {
  AWSTemporaryCredentials,
  StorageValidationErrorCode,
  assertValidationError,
} from '../../storage-internal';
import { GetLocationCredentials } from '../types';

import {
  CREDENTIALS_REFRESH_WINDOW_MS,
  CREDENTIALS_STORE_DEFAULT_SIZE,
} from './constants';

interface CredentialsLocation {
  scope: string;
  permissions: LocationPermissions;
}

interface StoreValue extends CredentialsLocation {
  credentials?: AWSTemporaryCredentials;
  inflightCredentials?: Promise<{ credentials: AWSTemporaryCredentials }>;
}

type S3Uri = string;

type SerializedPermissions = string;

type CacheKey = `${S3Uri}_${SerializedPermissions}`;

const serializedPermissions = (
  permissions: LocationPermissions
): SerializedPermissions => permissions.sort().join('_');

const createCacheKey = (location: CredentialsLocation): CacheKey =>
  `${location.scope}_${serializedPermissions(location.permissions)}`;

/**
 * LRU implementation for Location Credentials Store
 * O(n) for get and set for simplicity.
 *
 * @internal
 */
export interface LruLocationCredentialsStore {
  capacity: number;
  refreshHandler: GetLocationCredentials;
  values: Map<CacheKey, StoreValue>;
}

const pastTTL = (credentials: AWSTemporaryCredentials) => {
  const { expiration } = credentials;

  return expiration.getTime() - CREDENTIALS_REFRESH_WINDOW_MS <= Date.now();
};

const setCacheRecord = (
  store: LruLocationCredentialsStore,
  key: CacheKey,
  value: StoreValue
): void => {
  if (store.capacity === store.values.size) {
    // Pop least used entry. The Map's key are in insertion order.
    // So first key is the last recently inserted.
    const [oldestKey] = store.values.keys();
    store.values.delete(oldestKey);
    // TODO(@AllanZhengYP): Add log info when record is evicted.
  }
  // Add latest used value to the cache.
  store.values.set(key, value);
};

const dispatchRefresh = (
  refreshHandler: GetLocationCredentials,
  value: StoreValue,
  onRefreshFailure: () => void
) => {
  if (value.inflightCredentials) {
    return value.inflightCredentials;
  }

  value.inflightCredentials = (async () => {
    try {
      const { credentials } = await refreshHandler({
        scope: value.scope,
        permissions: value.permissions,
      });
      value.credentials = credentials;

      return { credentials };
    } catch (e) {
      onRefreshFailure();
      throw e;
    } finally {
      value.inflightCredentials = undefined;
    }
  })();

  return value.inflightCredentials;
};

/**
 * @internal
 */
export const initStore = (
  refreshHandler: GetLocationCredentials,
  size = CREDENTIALS_STORE_DEFAULT_SIZE
): LruLocationCredentialsStore => {
  assertValidationError(
    size > 0,
    StorageValidationErrorCode.InvalidLocationCredentialsCacheSize
  );

  return {
    capacity: size,
    refreshHandler,
    values: new Map<CacheKey, StoreValue>(),
  };
};

export const getCacheValue = (
  store: LruLocationCredentialsStore,
  location: CredentialsLocation
): AWSTemporaryCredentials | null => {
  const cacheKey = createCacheKey(location);
  const cachedValue = store.values.get(cacheKey);
  const cachedCredentials = cachedValue?.credentials;
  if (!cachedCredentials) {
    return null;
  }

  // Delete and re-insert to key to map to indicate a latest reference in LRU.
  store.values.delete(cacheKey);
  if (!pastTTL(cachedCredentials)) {
    // TODO(@AllanZhengYP): If the credential is still valid but will expire
    // soon, we should return credentials AND dispatch a refresh.
    store.values.set(cacheKey, cachedValue);

    return cachedCredentials;
  }

  return null;
};

/**
 * Fetch new credentials value with refresh handler and cache the result in
 * LRU cache.
 * @internal
 */
export const fetchNewValue = async (
  store: LruLocationCredentialsStore,
  location: CredentialsLocation
): Promise<{ credentials: AWSTemporaryCredentials }> => {
  const storeValues = store.values;
  const key = createCacheKey(location);
  if (!storeValues.has(key)) {
    const newStoreValue: StoreValue = {
      scope: location.scope,
      permissions: location.permissions,
    };
    setCacheRecord(store, key, newStoreValue);
  }
  const storeValue = storeValues.get(key)!;

  return dispatchRefresh(store.refreshHandler, storeValue, () => {
    store.values.delete(key);
  });
};
