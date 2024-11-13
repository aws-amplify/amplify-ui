import { act, renderHook } from '@testing-library/react';

import { useCredentialsStore } from '../useCredentialsStore';
import { createLocationCredentialsStore } from '../../../../credentials/store';

jest.mock('../../../../credentials/store');

class Subscription {
  // intialize as noop
  onStateChange = () => {};

  registerAuthListener = (cb: () => void) => {
    this.onStateChange = cb;
  };
}

const createLocationCredentialsStoreSpy = jest.mocked(
  createLocationCredentialsStore
);

const getLocationCredentials = jest.fn();
const onDestroy = jest.fn();

describe('useCredentialsStore', () => {
  const mockGetProvider = jest.fn();
  beforeEach(() => {
    createLocationCredentialsStoreSpy.mockReturnValue({
      destroy: jest.fn(),
      getProvider: mockGetProvider,
    });
  });

  afterEach(() => {
    mockGetProvider.mockClear();
    createLocationCredentialsStoreSpy.mockClear();
    getLocationCredentials.mockClear();
    onDestroy.mockClear();
  });

  it('returns the expected values of `CredentialsStore` in the happy path', () => {
    const { registerAuthListener } = new Subscription();

    const { result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { destroy, getCredentials } = result.current;
    expect(typeof getCredentials).toBe('function');
    expect(typeof destroy).toBe('function');
  });

  it('`CredentialsStore` function maintains a stable reference between renders', () => {
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
    const { registerAuthListener } = new Subscription();

    const { result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { current: store } = result;

    const bucket = 'my-bucket';
    const permission = 'READWRITE';
    const prefix = 'my-prefix/nested-prefix/';
    const type = 'PREFIX';

    act(() => {
      store.getCredentials({ bucket, permission, prefix, type });
    });

    const scope = `s3://${bucket}/${prefix}*`;

    expect(mockGetProvider).toHaveBeenCalledTimes(1);
    expect(mockGetProvider).toHaveBeenCalledWith({ permission, scope });
  });

  it('`locationCredentialsStore.getProvider` correctly handles object grant scopes', () => {
    const { registerAuthListener } = new Subscription();

    const { result } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    const { current: store } = result;

    const bucket = 'my-bucket';
    const permission = 'READWRITE';
    const prefix = 'my-prefix/my.pdf';
    const type = 'OBJECT';

    act(() => {
      store.getCredentials({ bucket, permission, prefix, type });
    });

    const scope = `s3://${bucket}/${prefix}`;

    expect(mockGetProvider).toHaveBeenCalledTimes(1);
    expect(mockGetProvider).toHaveBeenCalledWith({ permission, scope });
  });

  it('does not initialize a new `CredentialsStore ` when provided a valid `initialValue`', () => {
    const { registerAuthListener } = new Subscription();

    const { result: initialResult } = renderHook(() =>
      useCredentialsStore({ getLocationCredentials, registerAuthListener })
    );

    expect(createLocationCredentialsStoreSpy).toHaveBeenCalledTimes(1);

    const initialValue = initialResult.current;

    const { result: nextResult } = renderHook(() =>
      useCredentialsStore({
        getLocationCredentials,
        registerAuthListener,
        initialValue,
      })
    );

    expect(createLocationCredentialsStoreSpy).toHaveBeenCalledTimes(1);

    const nextValue = nextResult.current;

    expect(nextValue).toBe(initialValue);
  });
});
