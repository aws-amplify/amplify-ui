import { LocationPermissions } from '../../../actions';
import {
  StorageValidationErrorCode,
  validationErrorMap,
} from '../../../storage-internal';

import { CredentialsLocation } from '../types';
import { fetchNewValue, getCacheValue, initStore } from '../store';

const mockCredentials = {
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  sessionToken: 'sessionToken',
  expiration: new Date(Date.now() + 60 * 60_1000),
};

describe('initStore', () => {
  it('should create a store with given capacity, refresh Handler and values', () => {
    const refreshHandler = jest.fn();
    const store = initStore(refreshHandler, 20);
    expect(store).toEqual({
      capacity: 20,
      refreshHandler,
      values: expect.any(Map),
    });
  });

  it('should create a store with default capacity if not provided', () => {
    const store = initStore(jest.fn());
    expect(store).toMatchObject({
      capacity: 10,
    });
  });

  it('should throw if capacity is not > 0', () => {
    expect(() => initStore(jest.fn(), 0)).toThrow(
      validationErrorMap[
        StorageValidationErrorCode.InvalidLocationCredentialsCacheSize
      ].message
    );
  });
});

describe('getCacheValue', () => {
  it('should return a cache value for given location and permission', () => {
    const cachedValue = {
      credentials: mockCredentials,
      scope: 'abc',
      permissions: ['list', 'get'] as LocationPermissions, // In reverse order intentionally to test handling of this case.
    };
    const store = initStore(jest.fn());
    store.values.set('abc_get_list', cachedValue);
    expect(
      getCacheValue(store, {
        scope: 'abc',
        permissions: ['get', 'list'],
      })
    ).toEqual(cachedValue.credentials);
  });

  it('should return null if cache value is not found', () => {
    expect(
      getCacheValue(initStore(jest.fn()), {
        scope: 'abc',
        permissions: ['list'],
      })
    ).toBeNull();
  });

  it('should return null if cache value is expired', () => {
    const expiredValue = {
      credentials: {
        ...mockCredentials,
        expiration: new Date('1970-01-01'),
      },
      scope: 'abc',
      permissions: ['get', 'list'] as LocationPermissions,
    };
    const store = initStore(jest.fn());
    store.values.set('abc_get_list', expiredValue);
    expect(
      getCacheValue(store, {
        scope: 'abc',
        permissions: ['get', 'list'],
      })
    ).toBeNull();
    expect(store.values.size).toBe(0);
  });

  it('should return null if cache value is expiring soon', () => {
    const expiringValue = {
      credentials: {
        ...mockCredentials,
        expiration: new Date(Date.now() + 1000 * 20), // 20 seconds
      },
      scope: 'abc',
      permissions: ['get', 'list'] as LocationPermissions,
    };
    const store = initStore(jest.fn());
    store.values.set('abc_get_list', expiringValue);
    expect(
      getCacheValue(store, {
        scope: 'abc',
        permissions: ['get', 'list'],
      })
    ).toBeNull();
    expect(store.values.size).toBe(0);
  });
});

describe('fetchNewValue', () => {
  const mockCacheLocation = {
    scope: 'abc',
    permissions: ['list', 'get'],
  } as CredentialsLocation;
  const createCacheKey = (location: CredentialsLocation) =>
    `${location.scope}_${location.permissions.sort().join('_')}` as const;

  it('should fetch new value from remote source', async () => {
    const refreshHandler = jest.fn().mockResolvedValue({
      credentials: mockCredentials,
    });
    const store = initStore(refreshHandler);
    const newCredentials = await fetchNewValue(store, mockCacheLocation);
    expect(refreshHandler).toHaveBeenCalledWith({
      scope: 'abc',
      // The store sorts the permissions in-place when look up for cached credentials
      // so the order is changed and repeatable.
      permissions: ['get', 'list'],
    });
    expect(newCredentials).toEqual({
      credentials: mockCredentials,
    });
  });

  it('should throw errors when fetching new value', async () => {
    const refreshHandler = jest
      .fn()
      .mockRejectedValue(new Error('Network error'));
    const store = initStore(refreshHandler);
    await expect(fetchNewValue(store, mockCacheLocation)).rejects.toThrow(
      'Network error'
    );
    expect(store.values.size).toBe(0);
  });

  it('should update cache with new value', async () => {
    const refreshHandler = jest.fn().mockResolvedValue({
      credentials: mockCredentials,
    });
    const store = initStore(refreshHandler);
    await fetchNewValue(store, mockCacheLocation);
    expect(store.values.get(createCacheKey(mockCacheLocation))).toEqual({
      credentials: mockCredentials,
      inflightCredentials: undefined,
      scope: 'abc',
      permissions: ['get', 'list'],
    });
  });

  it('should invoke refresh handler only once if multiple fetches for same location is called', async () => {
    const refreshHandler = jest.fn().mockResolvedValue({
      credentials: mockCredentials,
    });
    const store = initStore(refreshHandler);
    await Promise.all([
      fetchNewValue(store, mockCacheLocation),
      fetchNewValue(store, mockCacheLocation),
      fetchNewValue(store, mockCacheLocation),
    ]);
    expect(refreshHandler).toHaveBeenCalledTimes(1);
  });

  it('should invoke the refresh handler if the refresh handler previously fails', async () => {
    const refreshHandler = jest
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        credentials: mockCredentials,
      });
    const store = initStore(refreshHandler);

    await expect(() =>
      Promise.all([
        fetchNewValue(store, mockCacheLocation),
        fetchNewValue(store, mockCacheLocation),
        fetchNewValue(store, mockCacheLocation),
      ])
    ).rejects.toThrow('Network error');

    expect(store.values.size).toBe(0);

    const { credentials } = await fetchNewValue(store, mockCacheLocation);
    expect(credentials).toEqual(mockCredentials);
    expect(store.values.size).toBe(1);
  });

  it('should call refresh handler for new cache entry if the cache is full', async () => {
    const refreshHandler = jest.fn().mockResolvedValue({
      credentials: mockCredentials,
    });
    const store = initStore(refreshHandler, 1);
    const cacheLocation1: CredentialsLocation = {
      scope: 'abc',
      permissions: ['list'],
    };
    const cacheLocation2: CredentialsLocation = {
      scope: 'def',
      permissions: ['list'],
    };
    await fetchNewValue(store, cacheLocation1);
    await fetchNewValue(store, cacheLocation2);
    expect(refreshHandler).toHaveBeenCalledTimes(2);
    expect(store.values.size).toBe(1);
    expect(store.values.get(createCacheKey(cacheLocation2))).toBeDefined();
    expect(store.values.get(createCacheKey(cacheLocation1))).toBeUndefined();
  });
});
