import { renderHook } from '@testing-library/react';
import * as StoreModule from '../../store';

import * as CredentialsModule from '../../credentials';
import {
  getErrorMessage,
  useGetActionInputCallback,
} from '../useGetActionInputCallback';

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');
const useCredentialsSpy = jest.spyOn(CredentialsModule, 'useCredentials');

const credentials = jest.fn();
const getCredentials: CredentialsModule.GetCredentials = jest.fn(
  () => credentials
);

const accountId = 'my-account-id';
const bucket = 'my-bucket';
const customEndpoint = 'mock-endpoint';
const permissions = ['delete', 'get', 'list', 'write'];
const prefix = 'my-prefix/';
const region = 'my-region';
const key = `${prefix}my-path/`;

const location = {
  bucket,
  id: 'id-id-id',
  permissions,
  prefix,
  type: 'PREFIX' as const,
};

describe('useGetActionInputCallback', () => {
  afterEach(jest.clearAllMocks);

  it('behaves as expected value in the happy path', () => {
    useCredentialsSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getCredentials,
    });

    useStoreSpy.mockReturnValueOnce([
      // @ts-expect-error mocking out the entire store is unnecessary
      { location: { current: location, key } },
      jest.fn(),
    ]);

    const { result } = renderHook(() =>
      useGetActionInputCallback({ accountId, customEndpoint, region })
    );

    const getActionInput = result.current;

    const actionInput = getActionInput();

    expect(actionInput).toStrictEqual({
      accountId,
      customEndpoint,
      bucket,
      credentials,
      region,
    });

    expect(getCredentials).toHaveBeenCalledTimes(1);
    expect(getCredentials).toHaveBeenCalledWith({
      permissions,
      scope: 's3://my-bucket/my-prefix/my-path/*',
    });
  });

  it('callback will use passed location param over current location', () => {
    useCredentialsSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getCredentials,
    });

    useStoreSpy.mockReturnValueOnce([
      // @ts-expect-error mocking out the entire store is unnecessary
      { location: { current: undefined, key } },
      jest.fn(),
    ]);

    const { result } = renderHook(() =>
      useGetActionInputCallback({ accountId, customEndpoint, region })
    );

    const getActionInput = result.current;

    const prefixActionInput = getActionInput({
      bucket: 'myBucket',
      id: 'id',
      permissions: ['list'],
      prefix: 'myPrefix/',
      type: 'PREFIX',
    });

    expect(prefixActionInput).toStrictEqual({
      accountId,
      customEndpoint,
      bucket: 'myBucket',
      credentials,
      region,
    });

    expect(getCredentials).toHaveBeenCalledTimes(1);
    expect(getCredentials).toHaveBeenCalledWith({
      permissions: ['list'],
      scope: 's3://myBucket/myPrefix/*',
    });
  });

  it('callback will generate correct scope for OBJECT grant types', () => {
    useCredentialsSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getCredentials,
    });

    useStoreSpy.mockReturnValueOnce([
      // @ts-expect-error mocking out the entire store is unnecessary
      { location: { current: undefined, key } },
      jest.fn(),
    ]);

    const { result } = renderHook(() =>
      useGetActionInputCallback({ accountId, customEndpoint, region })
    );

    const getActionInput = result.current;

    const objectActionInput = getActionInput({
      bucket: 'myBucket',
      id: 'id',
      permissions: ['get'],
      prefix: 'myPrefix/my.jpg',
      type: 'OBJECT',
    });

    expect(objectActionInput).toStrictEqual({
      accountId,
      customEndpoint,
      bucket: 'myBucket',
      credentials,
      region,
    });

    expect(getCredentials).toHaveBeenCalledTimes(1);
    expect(getCredentials).toHaveBeenCalledWith({
      permissions: ['get'],
      scope: 's3://myBucket/myPrefix/my.jpg',
    });
  });

  it('throws on call to `getActionInput` when current `location` is invalid', () => {
    useCredentialsSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getCredentials,
    });

    const { result } = renderHook(() =>
      useGetActionInputCallback({ accountId, region })
    );

    const getActionInput = result.current;

    expect(() => getActionInput()).toThrow(getErrorMessage('locationData'));

    expect(getCredentials).not.toHaveBeenCalled();
  });

  it('throws on call to `getActionInput` when `location` param is invalid', () => {
    useCredentialsSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getCredentials,
    });

    const { result } = renderHook(() =>
      useGetActionInputCallback({ accountId, region })
    );

    const getActionInput = result.current;

    // @ts-expect-error test invalid location
    expect(() => getActionInput({})).toThrow(getErrorMessage('locationData'));
    expect(getCredentials).not.toHaveBeenCalled();
  });
});
