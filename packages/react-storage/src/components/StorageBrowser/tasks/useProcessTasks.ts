import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { ActionHandler, TaskData } from '../actions';

import type {
  HandleBatchTasksInput,
  HandleProcessTasks,
  HandleSingleTaskInput,
  InferHandleTasksInput,
  Task,
  ProcessTasksOptions,
  UseProcessTasksState,
} from './types';
import {
  getStatusCounts,
  isProcessingTasks,
  hasCompletedProcessingTasks,
} from './utils';

const QUEUED_TASK_BASE = {
  cancel: undefined,
  message: undefined,
  progress: undefined,
  status: 'QUEUED' as const,
};

const isSingleTaskInput = <TData extends TaskData>(
  input: HandleSingleTaskInput<TData> | HandleBatchTasksInput<TData>
): input is HandleSingleTaskInput<TData> =>
  !!(input as HandleSingleTaskInput<TData>).data;

export function useProcessTasks<
  TData,
  TValue,
  TTask extends Task<TData, TValue>,
  TInput extends InferHandleTasksInput<TItems, TTask['data']>,
  // infered value of provided `items`
  TItems extends TTask['data'][] | undefined = undefined,
>(
  handler: ActionHandler<TData, TValue>,
  options?: ProcessTasksOptions<TTask, TItems>
): UseProcessTasksState<TTask, TInput> {
  const { items, ...callbacks } = options ?? {};

  const callbacksRef = React.useRef(callbacks);

  if (callbacks) {
    callbacksRef.current = callbacks;
  }

  const tasksRef = React.useRef<Map<string, TTask>>(new Map());

  const flush = React.useReducer(() => ({}), {})[1];

  const refreshTaskData = React.useCallback(
    (id: string, data: TTask['data']) => {
      const task = tasksRef.current.get(id);

      if (!task || task.data.id !== data.id) return;

      tasksRef.current.set(id, { ...task, data });
    },
    []
  );

  const updateTask = React.useCallback(
    <T extends Task>(id: string, next?: Partial<T>): TTask | undefined => {
      const { onTaskRemove } = callbacksRef.current;
      const task = tasksRef.current.get(id);

      if (!task) return;

      if (!next) {
        onTaskRemove?.(task);
        tasksRef.current.delete(id);
      } else {
        tasksRef.current.set(id, { ...task, ...next });
      }

      flush();

      return !next ? undefined : tasksRef.current.get(id);
    },
    [flush]
  );

  const createTask = React.useCallback(
    (data: TTask['data']) => {
      const getTask = () => tasksRef.current.get(data.id);
      const { onTaskCancel } = callbacksRef.current;

      function cancel() {
        const task = getTask();
        if (!task || task?.status !== 'QUEUED') return;
        const canceledTask = updateTask(data.id, {
          cancel: undefined,
          status: 'CANCELED',
        });

        if (canceledTask && isFunction(onTaskCancel))
          onTaskCancel(canceledTask);
      }

      const task = { ...QUEUED_TASK_BASE, cancel, data } as TTask;
      tasksRef.current.set(data.id, task);
    },
    [updateTask]
  );

  React.useEffect(() => {
    // Sync tasks with items by first creating a lookup of current tasks
    const taskLookup: Record<string, boolean> = {};
    tasksRef.current.forEach(({ data }) => {
      taskLookup[data.id] = true;
    });

    items?.forEach((item: TTask['data']) => {
      if (!taskLookup[item.id]) {
        // If an item doesn't yet have a task created for it, create one
        createTask(item);
      } else {
        refreshTaskData(item.id, item);
      }
      // Remove the item from the lookup to mark it as "synced"
      delete taskLookup[item.id];
    });

    // Remaining tasks are items which have been removed from state but not yet from tasks, so they should be removed
    Object.keys(taskLookup).forEach((taskId) => {
      // This should not happen, but if the task is pending then it cannot be removed
      if (tasksRef.current.get(taskId)?.status === 'PENDING') return;
      updateTask(taskId);
    });

    flush();
  }, [createTask, flush, updateTask, items, refreshTaskData]);

  const processTask = (_input: TInput) => {
    const isSingleTask = isSingleTaskInput(_input);
    if (isSingleTask) {
      createTask(_input.data);
      flush();
    }

    const { data } = isSingleTask
      ? _input
      : [...tasksRef.current.values()].find(
          ({ status }) => status === 'QUEUED'
        ) ?? {};

    if (!data) return;

    const {
      onTaskCancel,
      onTaskComplete,
      onTaskError,
      onTaskProgress,
      onTaskSuccess,
    } = callbacksRef.current;

    const getTask = () => tasksRef.current.get(data.id);

    const { options } = _input;

    const { onProgress: _onProgress } = options ?? {};

    const onProgress = ({ id }: TTask['data'], progress?: number) => {
      const task = updateTask(id, { progress });

      if (task && isFunction(onTaskProgress)) {
        onTaskProgress(task, progress);
      }

      if (task && isFunction(_onProgress)) {
        _onProgress(data, progress);
      }
    };

    const input = { ..._input, data, options: { ...options, onProgress } };

    const { cancel: _cancel, result } = handler(input);

    const cancel = !_cancel
      ? undefined
      : () => {
          const task = getTask();
          if (task && isFunction(onTaskCancel)) onTaskCancel(task);
          _cancel();
        };

    result
      .then((output) => {
        const task = updateTask(data.id, output);
        const { value } = output;

        if (task && isFunction(onTaskSuccess)) onTaskSuccess(task, value);
      })
      .catch((error: Error) => {
        const { message } = error;
        const task = updateTask(data.id, { message, status: 'FAILED' });

        if (task && isFunction(onTaskError)) onTaskError(task, error);
      })
      .finally(() => {
        const task = getTask();
        if (task && isFunction(onTaskComplete)) onTaskComplete(task);

        // ignore process next task for single task
        if (isSingleTask) return;

        processTask(_input);
      });

    updateTask(data.id, { cancel, status: 'PENDING' });
  };

  const tasks = [...tasksRef.current.values()];
  const statusCounts = getStatusCounts(tasks);
  const isProcessing = isProcessingTasks(statusCounts);
  const isProcessingComplete = hasCompletedProcessingTasks(statusCounts);

  const handleProcessTasks: HandleProcessTasks<TInput> = (input) => {
    if (isProcessing) {
      return;
    }

    // if single task, run `processTask` once
    if (isSingleTaskInput(input)) {
      processTask(input);
      return;
    }

    const { concurrency, ...options } = input.options ?? {};

    // reconstruct `input` without `concurrency`
    const _input = { ...input, options };

    // for batch tasks, if no `concurrency` process tasks individually
    if (!concurrency) {
      processTask(_input);
      return;
    }

    let count = 0;
    while (count < concurrency) {
      processTask(_input);
      count++;
    }
  };

  const reset = () => {
    tasks.forEach(({ data }) => updateTask(data.id));
  };

  return [
    { isProcessing, isProcessingComplete, reset, statusCounts, tasks },
    handleProcessTasks,
  ];
}
