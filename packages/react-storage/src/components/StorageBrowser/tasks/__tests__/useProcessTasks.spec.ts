import { act, renderHook, waitFor } from '@testing-library/react';

import {
  ActionInputConfig,
  CancelableTaskHandlerOutput,
  TaskHandlerInput,
} from '../../actions';

import { useProcessTasks } from '../../tasks/useProcessTasks';

const config: ActionInputConfig = {
  accountId: 'accountId',
  bucket: 'bucket',
  credentials: jest.fn(),
  region: 'region',
};

const prefix = 'prefix';

const items: { key: string; item: File }[] = [
  { key: '0', item: new File([], '0') },
  { key: '1', item: new File([], '1') },
  { key: '2', item: new File([], '2') },
];

const action = jest.fn(
  ({
    data,
  }: TaskHandlerInput<
    File | { destinationPrefix: string },
    { extraOption?: boolean }
  >) => {
    const { key } = data;
    if (key === '0') {
      return {
        key: '0',
        cancel: undefined,
        result: Promise.resolve('COMPLETE' as const),
      };
    }

    if (key === '1') {
      return {
        key: '1',
        cancel: undefined,
        result: Promise.reject('FAILED' as const),
      };
    }

    if (key === '2') {
      return {
        key: '2',
        cancel: undefined,
        result: Promise.resolve('COMPLETE' as const),
      };
    }
    throw new Error();
  }
);

const sleep = <T>(
  ms: number,
  resolvedValue: T,
  shouldReject = false
): Promise<T> =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject : resolve)(resolvedValue), ms)
  );

const createTimedAction =
  ({
    cancel,
    key,
    ms = 1000,
    resolvedStatus = 'COMPLETE',
    shouldReject,
  }: {
    cancel?: () => void;
    key: string;
    ms?: number;
    resolvedStatus?: 'COMPLETE' | 'FAILED' | 'CANCELED';
    shouldReject?: boolean;
  }): (() => CancelableTaskHandlerOutput) =>
  () => ({
    key,
    cancel,
    pause: undefined,
    resume: undefined,
    result: sleep(ms, resolvedStatus, shouldReject),
  });

describe('useProcessTasks', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    action.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('handles concurrent tasks as expected', async () => {
    const { result } = renderHook(() =>
      useProcessTasks(action, items, { concurrency: 2 })
    );

    const processTasks = result.current[1];

    expect(result.current[0][0].status).toBe('QUEUED');
    expect(result.current[0][1].status).toBe('QUEUED');
    expect(result.current[0][2].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix });
    });

    expect(action).toHaveBeenCalledTimes(2);
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[0].key, payload: items[0].item },
      prefix,
    });
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[1].key, payload: items[1].item },
      prefix,
    });

    expect(result.current[0][0].status).toBe('PENDING');
    expect(result.current[0][1].status).toBe('PENDING');
    expect(result.current[0][2].status).toBe('QUEUED');

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(3);
    });

    expect(result.current[0][0].status).toBe('COMPLETE');
    expect(result.current[0][1].status).toBe('FAILED');
    expect(result.current[0][2].status).toBe('COMPLETE');
  });

  it('cancels a task as expected', () => {
    const cancel = jest.fn();
    const { key } = items[0];
    const cancelableAction = createTimedAction({ cancel, key });

    const { result } = renderHook(() =>
      useProcessTasks(cancelableAction, items)
    );

    const processTasks = result.current[1];

    expect(result.current[0][0].key).toBe(key);
    expect(result.current[0][0].cancel).toBeUndefined();
    expect(result.current[0][0].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix });
    });

    expect(result.current[0][0].key).toBe(key);
    expect(result.current[0][0].cancel).toBeDefined();
    expect(result.current[0][0].status).toBe('PENDING');

    act(() => {
      result.current[0][0].cancel?.();
    });

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(result.current[0][0].status).toBe('CANCELED');
  });

  it.each(['COMPLETE' as const, 'FAILED' as const])(
    'does not cancel a %s task',
    async (resolvedStatus) => {
      const cancel = jest.fn();
      const { key } = items[0];
      const cancelableAction = createTimedAction({
        cancel,
        key,
        resolvedStatus,
        shouldReject: resolvedStatus === 'FAILED',
      });

      const { result } = renderHook(() =>
        useProcessTasks(cancelableAction, items)
      );

      const processTasks = result.current[1];

      expect(result.current[0][0].status).toBe('QUEUED');

      act(() => {
        processTasks({ config, prefix });
      });

      expect(result.current[0][0].status).toBe('PENDING');

      jest.advanceTimersToNextTimer();

      await waitFor(() => {
        expect(result.current[0][0].status).toBe(resolvedStatus);
      });

      act(() => {
        result.current[0][0].cancel?.();
      });

      expect(result.current[0][0].status).toBe(resolvedStatus);
    }
  );

  it('behaves as expected in the happy path', async () => {
    const { result } = renderHook(() => useProcessTasks(action, items));

    const processTasks = result.current[1];

    expect(result.current[0][0].status).toBe('QUEUED');
    expect(result.current[0][1].status).toBe('QUEUED');
    expect(result.current[0][2].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix, options: { extraOption: true } });
    });

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[0].key, payload: items[0].item },
      options: { extraOption: true },
      prefix,
    });

    expect(result.current[0][0].status).toBe('PENDING');
    expect(result.current[0][1].status).toBe('QUEUED');
    expect(result.current[0][2].status).toBe('QUEUED');

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(3);
    });

    expect(result.current[0][0].status).toBe('COMPLETE');
    expect(result.current[0][1].status).toBe('FAILED');
    expect(result.current[0][2].status).toBe('COMPLETE');
  });

  it('removes a task as expected', () => {
    const { result } = renderHook(() => useProcessTasks(action, items));

    const initTasks = result.current[0];
    const [task] = initTasks;

    expect(initTasks.length).toBe(3);
    expect(task.key).toBe(items[0].key);

    act(() => {
      task.remove();
    });

    const nextTasks = result.current[0];
    expect(nextTasks.length).toBe(2);
  });

  it('does not remove an inflight task', async () => {
    const { result } = renderHook(() => useProcessTasks(action, items));

    const [initTasks, handleProcess] = result.current;
    const [task] = initTasks;

    expect(initTasks.length).toBe(3);
    expect(task.key).toBe(items[0].key);

    act(() => {
      handleProcess();
    });

    act(() => {
      task.remove();
    });

    await waitFor(() => {
      const nextTasks = result.current[0];
      expect(nextTasks.length).toBe(3);
    });
  });

  it('excludes adding an item with an existing task', () => {
    const { rerender, result } = renderHook(
      (_items: { key: string; item: File }[] = items) =>
        useProcessTasks(action, _items)
    );

    const initTasks = result.current[0];
    expect(initTasks.length).toBe(3);

    const nextItems = [...items];

    act(() => {
      rerender(nextItems);
    });

    const nextTasks = result.current[0];
    expect(nextTasks.length).toBe(3);
  });

  it('can update the items of an existing task', () => {
    const copyItems: { key: string; item: { destinationPrefix: string } }[] = [
      { key: '0', item: { destinationPrefix: 'destination0/' } },
      { key: '1', item: { destinationPrefix: 'destination1/' } },
      { key: '2', item: { destinationPrefix: 'destination2/' } },
    ];

    const { rerender, result } = renderHook(
      (
        _items: {
          key: string;
          item: { destinationPrefix: string };
        }[] = copyItems
      ) => useProcessTasks(action, _items)
    );
    act(() => {
      const initTasks = result.current[0];
      expect(initTasks.length).toBe(3);
    });

    const nextItems = [...copyItems];
    nextItems[0].item = { destinationPrefix: 'destination3/' };

    act(() => {
      rerender(nextItems);
    });

    const nextTasks = result.current[0];
    expect(nextTasks.length).toBe(3);
    expect(nextTasks[0].item).toStrictEqual(nextItems[0].item);
  });

  it('only updates existing task if still queued', () => {
    const copyItems: { key: string; item: { destinationPrefix: string } }[] = [
      { key: '0', item: { destinationPrefix: 'destination0/' } },
      { key: '1', item: { destinationPrefix: 'destination1/' } },
      { key: '2', item: { destinationPrefix: 'destination2/' } },
    ];

    const { rerender, result } = renderHook(
      (
        _items: {
          key: string;
          item: { destinationPrefix: string };
        }[] = copyItems
      ) => useProcessTasks(action, _items, { concurrency: 1 })
    );

    const processTasks = result.current[1];

    expect(result.current[0][0].status).toBe('QUEUED');
    expect(result.current[0][1].status).toBe('QUEUED');
    expect(result.current[0][2].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix });
    });

    expect(result.current[0][0].status).toBe('PENDING');
    expect(result.current[0][1].status).toBe('QUEUED');
    expect(result.current[0][2].status).toBe('QUEUED');

    const nextItems = [...copyItems];
    nextItems[0].item = { destinationPrefix: 'wontchange/' };
    nextItems[1].item = { destinationPrefix: 'willchange/' };
    nextItems[2].item = { destinationPrefix: 'willchange/' };

    act(() => {
      rerender(nextItems);
    });

    const nextTasks = result.current[0];
    expect(nextTasks.length).toBe(3);
    expect(nextTasks[0].item).not.toEqual(nextItems[0].item);
    expect(nextTasks[1].item).toEqual(nextItems[1].item);
    expect(nextTasks[2].item).toEqual(nextItems[2].item);
  });

  it('returns the existing tasks when new items are empty', () => {
    const { rerender, result } = renderHook(
      (_items: { key: string; item: File }[] = items) =>
        useProcessTasks(action, _items)
    );

    const initTasks = result.current[0];
    expect(initTasks.length).toBe(3);

    const nextItems: { key: string; item: File }[] = [];

    act(() => {
      rerender(nextItems);
    });

    const nextTasks = result.current[0];
    expect(nextTasks.length).toBe(3);

    expect(nextTasks).toBe(initTasks);
  });
});
