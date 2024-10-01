import { act, renderHook } from '@testing-library/react';
import * as StorageBrowserModule from '@aws-amplify/storage/internals';

import { useGetCredentialsProvider } from '../useGetCredentialsProvider';

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

const handler = jest.fn();

describe('useGetCredentialsProvider', () => {
  beforeEach(() => {
    createLocationCredentialsStoreSpy.mockClear();
    handler.mockClear();
  });

  it('returns `getProvider` in the happy path', () => {
    const { registerAuthListener } = new Subscription();
    const { result } = renderHook(() =>
      useGetCredentialsProvider(handler, registerAuthListener)
    );

    const { current: getProvider } = result;
    expect(typeof getProvider).toBe('function');
  });

  it('`getProvider` function maintains a stable reference between renders', () => {
    const { registerAuthListener } = new Subscription();
    const { rerender, result } = renderHook(() =>
      useGetCredentialsProvider(handler, registerAuthListener)
    );

    const { current: initial } = result;

    rerender();

    const { current: next } = result;

    expect(next).toBe(initial);
  });

  it('calls `destroy` and returns new `getProvider` when callback provided to `registerAuthListener` runs', () => {
    // intentionally avoid destructuring to avoid stale reference of `onStateChange`
    const subscriber = new Subscription();
    const { result } = renderHook(() =>
      useGetCredentialsProvider(handler, subscriber.registerAuthListener)
    );

    const { current: initial } = result;

    act(() => {
      subscriber.onStateChange();
    });

    const { current: next } = result;

    expect(next).not.toBe(initial);
  });
});
