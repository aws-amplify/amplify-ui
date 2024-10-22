import { act, renderHook } from '@testing-library/react';
import * as StorageBrowserModule from '../../../../storage-internal';

import { useCredentialsStore } from '../useCredentialsStore';

class Subscription {
  // intialize as noop
  onStateChange = () => {};

  registerAuthListener = (cb: () => void) => {
    this.onStateChange = cb;
  };
}

const createLocationCredentialsStoreSpy = jest.spyOn(
  StorageBrowserModule,
  'createLocationCredentialsStore'
);

const getLocationCredentials = jest.fn();
const onDestroy = jest.fn();

describe('useCredentialsStore', () => {
  beforeEach(() => {
    createLocationCredentialsStoreSpy.mockClear();
    getLocationCredentials.mockClear();
    onDestroy.mockClear();
  });

  it.skip('returns `getCredentials` in the happy path', () => {
    const { registerAuthListener } = new Subscription();

    const { result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { current: getCredentials } = result;
    expect(typeof getCredentials).toBe('function');
  });

  it('`getCredentials` function maintains a stable reference between renders', () => {
    const { registerAuthListener } = new Subscription();
    const { rerender, result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { current: initial } = result;

    rerender();

    const { current: next } = result;

    expect(next).toBe(initial);
  });

  it('calls `destroy` and returns new `getCredentials` when callback provided to `registerAuthListener` runs', () => {
    // intentionally avoid destructuring to avoid stale reference of `onStateChange`
    const subscriber = new Subscription();
    const { result } = renderHook(() =>
      useCredentialsStore({
        getLocationCredentials,
        registerAuthListener: subscriber.registerAuthListener,
        onDestroy,
      })
    );

    const { current: initial } = result;

    act(() => {
      subscriber.onStateChange();
    });

    const { current: next } = result;

    expect(onDestroy).toHaveBeenCalledTimes(1);

    expect(next).not.toBe(initial);
  });

  it('`locationCredentialsStore.getProvider` receives the expected values', () => {
    const mockGetProvider = jest.fn();
    createLocationCredentialsStoreSpy.mockReturnValueOnce({
      destroy: jest.fn(),
      getProvider: mockGetProvider,
    });

    const { registerAuthListener } = new Subscription();

    const { result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { current: store } = result;

    const bucket = 'my-bucket';
    const permission = 'READWRITE';
    const prefix = 'my-prefix/nested-prefix/';

    act(() => {
      store.getCredentials({ bucket, permission, prefix });
    });

    const scope = `s3://${bucket}/${prefix}*`;

    expect(mockGetProvider).toHaveBeenCalledTimes(1);
    expect(mockGetProvider).toHaveBeenCalledWith({ permission, scope });
  });
});
