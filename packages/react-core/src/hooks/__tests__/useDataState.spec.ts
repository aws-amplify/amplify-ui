import { act, renderHook, waitFor } from '@testing-library/react';
import useDataState from '../useDataState';

const asyncAction = jest.fn((_prev: string, next: string) =>
  Promise.resolve(next)
);
const syncAction = jest.fn((_prev: string, next: string) => next);

const errorMessage = 'Unhappy!';
const unhappyAction = jest.fn((_, isUnhappy: boolean) =>
  isUnhappy ? Promise.reject(new Error(errorMessage)) : Promise.resolve()
);

const initData = 'initial-data';
const nextData = 'next-data';

describe('useDataState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    { type: 'async', action: asyncAction },
    { type: 'sync', action: syncAction },
  ])(
    'handles a $type action as expected in the happy path',
    async ({ action }) => {
      const { result } = renderHook(() => useDataState(action, initData));

      // first render
      const [initState, handleAction] = result.current;

      expect(action).not.toHaveBeenCalled();

      expect(initState.data).toBe(initData);
      expect(initState.hasError).toBe(false);
      expect(initState.isLoading).toBe(false);
      expect(initState.message).toBeUndefined();

      // call action
      act(() => {
        handleAction(nextData);
      });

      // loading result
      const [loadingState] = result.current;

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith(initData, nextData);

      expect(loadingState.data).toBe(initData);
      expect(loadingState.hasError).toBe(false);
      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.message).toBeUndefined();

      await waitFor(() => {
        // action complete
        const [nextState] = result.current;

        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith(initData, nextData);

        expect(nextState.data).toBe(nextData);
        expect(nextState.hasError).toBe(false);
        expect(nextState.isLoading).toBe(false);
        expect(nextState.message).toBeUndefined();
      });
    }
  );

  it('calls `onSuccess` callback as expected', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useDataState(asyncAction, initData, { onSuccess })
    );

    // first render
    const [_, handleAction] = result.current;

    // call action
    act(() => {
      handleAction(nextData);
    });

    await waitFor(() => {
      expect(asyncAction).toHaveBeenCalledTimes(1);
      expect(asyncAction).toHaveBeenCalledWith(initData, nextData);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(nextData);
  });

  it('calls `onError` callback as expected', async () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useDataState(unhappyAction, undefined, { onError })
    );

    const [_, handleAction] = result.current;

    act(() => {
      handleAction(true);
    });

    await waitFor(() => {
      const [errorState] = result.current;

      expect(errorState.hasError).toBe(true);
      expect(errorState.isLoading).toBe(false);
      expect(errorState.message).toBe(errorMessage);
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(errorMessage);
  });

  it('handles an error and resets error state on the next call to handleAction', async () => {
    const { result } = renderHook(() => useDataState(unhappyAction, undefined));

    const [initialState, handleAction] = result.current;

    expect(unhappyAction).not.toHaveBeenCalled();

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
      expect(errorState.message).toBe(errorMessage);
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

  it.todo('only returns the value of the last call to handleAction');
});
