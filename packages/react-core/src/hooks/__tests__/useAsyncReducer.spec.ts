import { act, renderHook, waitFor } from '@testing-library/react';

import useAsyncReducer from '../useAsyncReducer';

const asyncReducer = jest.fn((_prev: string, next: string) =>
  Promise.resolve(next)
);

const sleepyReducer = jest.fn(
  (
    _: string,
    { timeout, fail }: { fail?: boolean; timeout: number }
  ): Promise<string> =>
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          fail
            ? reject(new Error(timeout.toString()))
            : resolve(timeout.toString()),
        timeout
      )
    )
);

const error = new Error('Unhappy!');
const unhappyReducer = jest.fn((_, isUnhappy: boolean) =>
  isUnhappy ? Promise.reject(error) : Promise.resolve()
);

const initValue = 'initial-data';
const nextData = 'next-data';

describe('useAsyncReducer', () => {
  beforeAll(() => {
    let id = 0;
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => ++id },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles an async reducer as expected', async () => {
    const { result } = renderHook(() =>
      useAsyncReducer(asyncReducer, initValue)
    );

    // first render
    const [initState, handleAction] = result.current;

    expect(asyncReducer).not.toHaveBeenCalled();

    expect(initState.value).toBe(initValue);
    expect(initState.hasError).toBe(false);
    expect(initState.isLoading).toBe(false);
    expect(initState.message).toBeUndefined();

    // call action
    act(() => {
      handleAction(nextData);
    });

    // loading result
    const [loadingState] = result.current;

    expect(asyncReducer).toHaveBeenCalledTimes(1);
    expect(asyncReducer).toHaveBeenCalledWith(initValue, nextData);

    expect(loadingState.value).toBe(initValue);
    expect(loadingState.hasError).toBe(false);
    expect(loadingState.isLoading).toBe(true);
    expect(loadingState.message).toBeUndefined();

    await waitFor(() => {
      // action complete
      const [nextState] = result.current;

      expect(asyncReducer).toHaveBeenCalledTimes(1);
      expect(asyncReducer).toHaveBeenCalledWith(initValue, nextData);

      expect(nextState.value).toBe(nextData);
      expect(nextState.hasError).toBe(false);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.message).toBeUndefined();
    });
  });

  it('calls `onSuccess` callback as expected', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useAsyncReducer(asyncReducer, initValue, { onSuccess })
    );

    // first render
    const [_, handleAction] = result.current;

    // call action
    act(() => {
      handleAction(nextData);
    });

    await waitFor(() => {
      expect(asyncReducer).toHaveBeenCalledTimes(1);
      expect(asyncReducer).toHaveBeenCalledWith(initValue, nextData);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(nextData);
  });

  it('calls `onError` callback as expected', async () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useAsyncReducer(unhappyReducer, undefined, { onError })
    );

    const [_, handleAction] = result.current;

    act(() => {
      handleAction(true);
    });

    await waitFor(() => {
      const [errorState] = result.current;

      expect(errorState.hasError).toBe(true);
      expect(errorState.isLoading).toBe(false);
      expect(errorState.message).toBe(error.message);
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('handles an error and resets error state on the next call to handleAction', async () => {
    const { result } = renderHook(() =>
      useAsyncReducer(unhappyReducer, undefined)
    );

    const [initialState, handleAction] = result.current;

    expect(unhappyReducer).not.toHaveBeenCalled();

    expect(initialState.hasError).toBe(false);
    expect(initialState.isLoading).toBe(false);
    expect(initialState.message).toBeUndefined();

    act(() => {
      handleAction(true);
    });

    const [loadingState] = result.current;

    expect(loadingState.hasError).toBe(false);
    expect(loadingState.isLoading).toBe(true);
    expect(loadingState.message).toBeUndefined();

    await waitFor(() => {
      const [errorState] = result.current;

      expect(errorState.hasError).toBe(true);
      expect(errorState.isLoading).toBe(false);
      expect(errorState.message).toBe(error.message);
    });

    act(() => {
      handleAction(false);
    });

    await waitFor(() => {
      const [nextLoadingState] = result.current;

      expect(nextLoadingState.hasError).toBe(false);
      expect(nextLoadingState.isLoading).toBe(true);
      expect(nextLoadingState.message).toBeUndefined();
    });
  });

  it('only returns the value of the last dispatch in the happy path', async () => {
    jest.useFakeTimers();

    const defaultValue = '';
    const timeoutOne = 2000;
    const timeoutTwo = 1000;
    const expectedResult = timeoutTwo.toString();

    const { result } = renderHook(() =>
      useAsyncReducer(sleepyReducer, defaultValue)
    );

    const [initState, dispatch] = result.current;

    act(() => {
      dispatch({ timeout: timeoutOne });
    });

    expect(initState.value).toBe(defaultValue);

    expect(sleepyReducer).toHaveBeenCalledTimes(1);

    act(() => {
      dispatch({ timeout: timeoutTwo });
    });

    expect(sleepyReducer).toHaveBeenCalledTimes(2);

    jest.runAllTimers();

    await waitFor(() => {
      const [resolvedState] = result.current;

      // assert both calls have completed
      expect(sleepyReducer.mock.results.length).toBe(2);

      expect(resolvedState.value).toBe(expectedResult);
      expect(resolvedState.isLoading).toBe(false);
      expect(resolvedState.hasError).toBe(false);
    });
  });

  it('only returns the value of the last dispatch in the unhappy path', async () => {
    jest.useFakeTimers();

    const defaultValue = '';
    const timeoutOne = 2000;
    const timeoutTwo = 1000;
    const expectedResult = timeoutTwo.toString();

    const { result } = renderHook(() =>
      useAsyncReducer(sleepyReducer, defaultValue)
    );

    const [initState, dispatch] = result.current;

    act(() => {
      dispatch({ timeout: timeoutOne, fail: true });
    });

    expect(initState.value).toBe(defaultValue);

    expect(sleepyReducer).toHaveBeenCalledTimes(1);

    act(() => {
      dispatch({ timeout: timeoutTwo, fail: true });
    });

    jest.runAllTimers();

    await waitFor(() => {
      const [resolvedState] = result.current;

      // assert both calls have completed
      expect(sleepyReducer.mock.results.length).toBe(2);

      expect(resolvedState.value).toBe(defaultValue);
      expect(resolvedState.message).toBe(expectedResult);
      expect(resolvedState.hasError).toBe(true);
      expect(resolvedState.isLoading).toBe(false);
    });
  });
});
