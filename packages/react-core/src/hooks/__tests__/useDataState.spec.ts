import { act, renderHook } from '@testing-library/react-hooks';
import useDataState from '../useDataState';

const asyncAction = jest.fn((_prev: string, next: string) =>
  Promise.resolve(next)
);
const syncAction = jest.fn((_prev: string, next: string) => next);

describe('useDataState', () => {
  it.each([
    { type: 'async', action: asyncAction },
    { type: 'sync', action: syncAction },
  ])(
    'handles a $type action as expected in the happy path',
    async ({ action }) => {
      const initData = 'initial-data';
      const nextData = 'next-data';

      const { result, waitForNextUpdate } = renderHook(() =>
        useDataState(action, 'initial-data')
      );

      // first render
      const [initState, handleAction] = result.current;

      expect(action).not.toHaveBeenCalled();

      expect(initState.data).toBe(initData);
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
      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.message).toBeUndefined();

      await waitForNextUpdate();

      // action complete
      const [nextState] = result.current;

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith(initData, nextData);

      expect(nextState.data).toBe(nextData);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.message).toBeUndefined();
    }
  );

  it.todo('only returns the values of the last call to handleAction');
  it.todo('handles exceptions thrown from provided action');
});
