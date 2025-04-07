import {
  AWSTemporaryCredentials,
  StorageValidationErrorCode,
  validationErrorMap,
} from '../../../storage-internal';

import { fetchNewValue, getCacheValue, initStore } from '../store';
import { LruLocationCredentialsStore } from '../types';

import { createStore, getValue, removeStore } from '../registry';

jest.mock('../store');

const mockedStore = 'MOCKED_STORE' as any as LruLocationCredentialsStore;
const mockGetCacheValue = jest.mocked(getCacheValue);
const mockFetchNewValue = jest.mocked(fetchNewValue);

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.mocked(initStore).mockReturnValue(mockedStore);
});

describe('createStore', () => {
  it('should create a store with given capacity, refresh Handler', () => {
    const refreshHandler = jest.fn();
    createStore(refreshHandler, 20);
    expect(initStore).toHaveBeenCalledWith(refreshHandler, 20);
  });

  it('should return a symbol to refer the store instance', () => {
    const storeReference = createStore(jest.fn(), 20);
    expect(Object.prototype.toString.call(storeReference.value)).toBe(
      '[object Symbol]'
    );
  });
});

describe('getValue', () => {
  const mockCachedValue = 'CACHED_VALUE' as any as AWSTemporaryCredentials;
  let storeSymbol: { value: symbol };
  beforeEach(() => {
    storeSymbol = createStore(jest.fn(), 20);
  });
  afterEach(() => {
    removeStore(storeSymbol);
    jest.clearAllMocks();
  });

  it('should throw if a store instance cannot be found from registry', async () => {
    await expect(
      getValue({
        storeSymbol: { value: Symbol('invalid') },
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: false,
      })
    ).rejects.toThrow(
      validationErrorMap[
        StorageValidationErrorCode.LocationCredentialsStoreDestroyed
      ].message
    );
  });

  it('should look up a cache value for given location and permission', async () => {
    mockGetCacheValue.mockReturnValueOnce(mockCachedValue);
    expect(
      await getValue({
        storeSymbol,
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: false,
      })
    ).toEqual({ credentials: mockCachedValue });
    expect(getCacheValue).toHaveBeenCalledWith(mockedStore, {
      scope: 'abc',
      permissions: ['get', 'list'],
    });
  });

  it('should look up a cache value for given location', async () => {
    mockGetCacheValue.mockReturnValueOnce(mockCachedValue);
    expect(
      await getValue({
        storeSymbol,
        location: { scope: 'abc', permissions: ['get'] },
        forceRefresh: false,
      })
    ).toEqual({ credentials: mockCachedValue });
    expect(getCacheValue).toHaveBeenCalledTimes(1);
    expect(getCacheValue).toHaveBeenNthCalledWith(1, mockedStore, {
      scope: 'abc',
      permissions: ['get'],
    });
  });

  it('should invoke the refresh handler if look up returns null', async () => {
    const mockNewValue = {
      credentials: {
        accessKeyId: 'NEW_ACCESS_KEY_ID',
        secretAccessKey: 'NEW_SECRET_ACCESS_KEY',

        sessionToken: 'NEW_SESSION_TOKEN',
        expiration: new Date('2024-10 -21'),
      },
    };
    mockGetCacheValue.mockReturnValue(null);
    mockFetchNewValue.mockResolvedValue(mockNewValue);
    expect(
      await getValue({
        storeSymbol,
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: false,
      })
    ).toEqual(mockNewValue);
    expect(mockFetchNewValue).toHaveBeenCalledTimes(1);
    expect(mockFetchNewValue).toHaveBeenCalledWith(mockedStore, {
      scope: 'abc',
      permissions: ['get', 'list'],
    });
  });

  it('should invoke the refresh handler regardless of cache if forceRefresh is true', async () => {
    const mockNewValue = {
      credentials: {
        accessKeyId: 'NEW_ACCESS_KEY_ID',
        secretAccessKey: 'NEW_SECRET_ACCESS_KEY',

        sessionToken: 'NEW_SESSION_TOKEN',
        expiration: new Date('2024-10 -21'),
      },
    };
    mockGetCacheValue.mockReturnValue(mockCachedValue);
    mockFetchNewValue.mockResolvedValue(mockNewValue);
    expect(
      await getValue({
        storeSymbol,
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: true,
      })
    ).toEqual(mockNewValue);
    expect(mockFetchNewValue).toHaveBeenCalledTimes(1);
    expect(mockFetchNewValue).toHaveBeenCalledWith(mockedStore, {
      scope: 'abc',
      permissions: ['get', 'list'],
    });
  });

  it('should throw if refresh handler throws', async () => {
    mockFetchNewValue.mockRejectedValueOnce(new Error('Network error'));
    await expect(
      getValue({
        storeSymbol,
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: true,
      })
    ).rejects.toThrow('Network error');
  });
});

describe('removeStore', () => {
  it('should remove the store with given symbol', async () => {
    const storeReference = createStore(jest.fn(), 20);
    removeStore(storeReference);
    await expect(
      getValue({
        storeSymbol: storeReference,
        location: { scope: 'abc', permissions: ['get', 'list'] },
        forceRefresh: false,
      })
    ).rejects.toThrow(
      validationErrorMap[
        StorageValidationErrorCode.LocationCredentialsStoreDestroyed
      ].message
    );
  });

  it('should not throw if store with given symbol does not exist', () => {
    expect(() => {
      removeStore({ value: Symbol('invalid') });
    }).not.toThrow();
  });
});
