import { act, renderHook, waitFor } from '@testing-library/react';

import {
  ActionInputConfig,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from '../../actions';
import { FileItem } from '../../providers';

import { useProcessTasks } from '../../tasks/useProcessTasks';

const config: ActionInputConfig = {
  accountId: 'accountId',
  bucket: 'bucket',
  credentials: jest.fn(),
  region: 'region',
};

const prefix = 'prefix';

const items: FileItem[] = [
  { key: '0', id: '0', file: new File([], '0') },
  { key: '1', id: '1', file: new File([], '1') },
  { key: '2', id: '2', file: new File([], '2') },
];

const action = jest.fn(
  ({
    data,
    options,
  }: TaskHandlerInput<
    FileItem,
    TaskHandlerOptions & { extraOption?: boolean }
  > & { prefix: string }): TaskHandlerOutput => {
    const { key } = data;
    // initial progress
    options?.onProgress?.(data, 0.5);

    if (key === '0' || key === '2') {
      // success progress
      options?.onProgress?.(data, 1);
      return {
        cancel: undefined,
        result: Promise.resolve({ status: 'COMPLETE' as const }),
      };
    }

    if (key === '1') {
      return {
        cancel: undefined,
        result: Promise.reject({ status: 'FAILED' as const }),
      };
    }

    throw new Error();
  }
);

const sleep = <T>(
  ms: number,
  resolvedValue: T,
  shouldReject = false
): Promise<{ status: T }> =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldReject ? reject : resolve)({ status: resolvedValue }),
      ms
    )
  );

const createTimedAction =
  ({
    cancel,
    ms = 1000,
    resolvedStatus = 'COMPLETE',
    shouldReject,
  }: {
    cancel?: () => void;
    ms?: number;
    resolvedStatus?: 'COMPLETE' | 'FAILED' | 'CANCELED' | 'OVERWRITE_PREVENTED';
    shouldReject?: boolean;
  }): ((input: TaskHandlerInput & { prefix: string }) => TaskHandlerOutput) =>
  () => ({
    cancel,
    pause: undefined,
    resume: undefined,
    result: sleep(ms, resolvedStatus, shouldReject),
  });

const onTaskCancel = jest.fn();
const onTaskComplete = jest.fn();
const onTaskError = jest.fn();
const onTaskProgress = jest.fn();
const onTaskRemove = jest.fn();
const onTaskSuccess = jest.fn();

describe('useProcessTasks', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('handles concurrent tasks as expected', async () => {
    const { result } = renderHook(() =>
      useProcessTasks(action, items, { concurrency: 2, onTaskProgress })
    );

    const processTasks = result.current[1];

    expect(result.current[0].tasks[0].status).toBe('QUEUED');
    expect(result.current[0].tasks[1].status).toBe('QUEUED');
    expect(result.current[0].tasks[2].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix });
    });

    expect(action).toHaveBeenCalledTimes(2);
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[0].key, id: items[0].id, file: items[0].file },
      options: { onProgress: expect.any(Function) },
      prefix,
    });
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[1].key, id: items[1].id, file: items[1].file },
      options: { onProgress: expect.any(Function) },
      prefix,
    });

    expect(result.current[0].tasks[0].status).toBe('PENDING');
    expect(result.current[0].tasks[1].status).toBe('PENDING');
    expect(result.current[0].tasks[2].status).toBe('QUEUED');

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(3);
    });

    expect(onTaskProgress).toHaveBeenCalledTimes(5);

    expect(result.current[0].tasks[0].status).toBe('COMPLETE');
    expect(result.current[0].tasks[1].status).toBe('FAILED');
    expect(result.current[0].tasks[2].status).toBe('COMPLETE');
  });

  it('cancels an inflight task as expected', async () => {
    jest.useFakeTimers();

    const cancel = jest.fn();
    const cancelableAction = createTimedAction({
      cancel,
      resolvedStatus: 'CANCELED',
    });

    const { result } = renderHook(() =>
      useProcessTasks(cancelableAction, items, { onTaskCancel })
    );

    const processTasks = result.current[1];

    expect(result.current[0].tasks[0].cancel).toBeDefined();
    expect(result.current[0].tasks[0].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix });
    });

    expect(result.current[0].tasks[0].cancel).toBeDefined();
    expect(result.current[0].tasks[0].status).toBe('PENDING');

    act(() => {
      result.current[0].tasks[0].cancel?.();
    });

    jest.advanceTimersToNextTimer();

    expect(cancel).toHaveBeenCalledTimes(1);

    expect(onTaskCancel).toHaveBeenCalledTimes(1);

    expect(onTaskCancel).toHaveBeenCalledWith({
      cancel: expect.any(Function),
      data: items[0],
      message: undefined,
      progress: undefined,
      status: 'PENDING',
    });

    await waitFor(() => {
      expect(result.current[0].tasks[0].status).toBe('CANCELED');
    });
  });

  it('cancels a QUEUED task as expected', () => {
    const cancelableAction = createTimedAction({});

    const { result } = renderHook(() =>
      useProcessTasks(cancelableAction, items)
    );

    expect(result.current[0].tasks[0].cancel).toBeDefined();
    expect(result.current[0].tasks[0].status).toBe('QUEUED');

    act(() => {
      result.current[0].tasks[0].cancel();
    });

    expect(result.current[0].tasks[0].status).toBe('CANCELED');
  });

  it.each(['COMPLETE' as const, 'FAILED' as const])(
    'does not cancel a %s task',
    async (resolvedStatus) => {
      jest.useFakeTimers();

      const cancel = jest.fn();

      const cancelableAction = createTimedAction({
        cancel,
        resolvedStatus,
        shouldReject: resolvedStatus === 'FAILED',
      });

      const { result } = renderHook(() =>
        useProcessTasks(cancelableAction, items)
      );

      const processTasks = result.current[1];

      expect(result.current[0].tasks[0].status).toBe('QUEUED');

      act(() => {
        processTasks({ config, prefix });
      });

      expect(result.current[0].tasks[0].status).toBe('PENDING');

      jest.advanceTimersToNextTimer();

      await waitFor(() => {
        expect(result.current[0].tasks[0].status).toBe(resolvedStatus);
      });

      act(() => {
        result.current[0].tasks[0].cancel?.();
      });

      expect(result.current[0].tasks[0].status).toBe(resolvedStatus);
    }
  );

  it('behaves as expected in the happy path', async () => {
    const { result } = renderHook(() =>
      useProcessTasks(action, items, {
        onTaskError,
        onTaskComplete,
        onTaskSuccess,
      })
    );

    const processTasks = result.current[1];

    expect(result.current[0].tasks[0].status).toBe('QUEUED');
    expect(result.current[0].tasks[1].status).toBe('QUEUED');
    expect(result.current[0].tasks[2].status).toBe('QUEUED');

    act(() => {
      processTasks({ config, prefix, options: { extraOption: true } });
    });

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      config,
      data: { key: items[0].key, id: items[0].id, file: items[0].file },
      options: { extraOption: true, onProgress: expect.any(Function) },
      prefix,
    });

    expect(result.current[0].tasks[0].status).toBe('PENDING');
    expect(result.current[0].tasks[1].status).toBe('QUEUED');
    expect(result.current[0].tasks[2].status).toBe('QUEUED');

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(3);
    });

    expect(result.current[0].tasks[0].status).toBe('COMPLETE');
    expect(result.current[0].tasks[1].status).toBe('FAILED');
    expect(result.current[0].tasks[2].status).toBe('COMPLETE');

    expect(onTaskComplete).toHaveBeenCalledTimes(3);
    expect(onTaskSuccess).toHaveBeenCalledTimes(2);
    expect(onTaskError).toHaveBeenCalledTimes(1);
  });

  it('removes a task as expected', () => {
    const { result, rerender } = renderHook(
      (dataItems) => useProcessTasks(action, dataItems, { onTaskRemove }),
      { initialProps: items }
    );

    const [initState] = result.current;
    expect(initState.tasks.length).toBe(3);

    const nextItems = [items[0], items[2]];

    rerender(nextItems);

    const [nextState] = result.current;
    expect(nextState.tasks.length).toBe(2);
    expect(onTaskRemove).toHaveBeenCalledTimes(1);
  });

  it('does not remove an inflight task', async () => {
    const { result, rerender } = renderHook(
      (dataItems) => useProcessTasks(action, dataItems, { onTaskRemove }),
      { initialProps: items }
    );

    const [initState, handleProcess] = result.current;
    expect(initState.tasks.length).toBe(3);

    act(() => {
      handleProcess({ config, prefix });
    });

    const nextItems = [items[1], items[2]];
    rerender(nextItems);
    await waitFor(() => {});

    expect(onTaskRemove).not.toHaveBeenCalled();
  });

  it('excludes adding an item with an existing task', () => {
    const { rerender, result } = renderHook((_items: FileItem[] = items) =>
      useProcessTasks(action, _items)
    );

    const initTasks = result.current[0].tasks;
    expect(initTasks.length).toBe(3);

    const nextItems = [...items];

    act(() => {
      rerender(nextItems);
    });

    const nextTasks = result.current[0].tasks;
    expect(nextTasks.length).toBe(3);
  });

  it('returns the expected values for `isProcessing` and `isProcessingComplete`', async () => {
    const { result } = renderHook(() => useProcessTasks(action, items));

    const [initState, handleProcess] = result.current;

    expect(initState.isProcessing).toBe(false);
    expect(initState.isProcessingComplete).toBe(false);

    act(() => {
      handleProcess({ config, prefix });
    });

    const [processingState] = result.current;

    expect(processingState.isProcessing).toBe(true);
    expect(processingState.isProcessingComplete).toBe(false);

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(3);
    });

    const [completedState] = result.current;

    expect(completedState.isProcessing).toBe(false);
    expect(completedState.isProcessingComplete).toBe(true);
  });

  it.todo('ignores calls to handle processing when isProcessing is true');
  it.todo('handles data provided through input as expected');
  it.todo('does not run event callbacks when task lookups fails');
});
