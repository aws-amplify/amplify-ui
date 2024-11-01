import { renderHook } from '@testing-library/react';
import * as StoreModule from '../../store';
import * as CredentialsModule from '../credentials';

import {
  ERROR_MESSAGE,
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
const permission = 'READ' as const;
const prefix = 'my-prefix/';
const region = 'my-region';
const key = `${prefix}my-path/`;

const location = {
  bucket,
  id: 'id-id-id',
  permission,
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
      useGetActionInputCallback({ accountId, region })
    );

    const getActionInput = result.current;

    const actionInput = getActionInput();

    expect(actionInput).toStrictEqual({
      accountId,
      bucket,
      credentials,
      region,
    });

    expect(getCredentials).toHaveBeenCalledTimes(1);
    expect(getCredentials).toHaveBeenCalledWith({
      bucket,
      permission,
      prefix: key,
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

    expect(() => getActionInput()).toThrow(ERROR_MESSAGE);

    expect(getCredentials).not.toHaveBeenCalled();
  });
});
