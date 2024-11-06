import React from 'react';

import {
  TaskHandlerInput,
  TaskData,
  TaskHandlerOutput,
  TaskHandler,
} from '../actions';

import {
  HandleProcessTasks,
  ProcessTasksOptions,
  Task,
  UseProcessTasksState,
} from './types';
import {
  getStatusCounts,
  isProcessingTasks,
  hasCompletedProcessingTasks,
} from './utils';

export type UseProcessTasks = <
  T extends TaskData,
  K,
  D extends T[] | undefined,
>(
  handler: TaskHandler<TaskHandlerInput<T> & K, TaskHandlerOutput>,
  items?: D,
  options?: ProcessTasksOptions<T, D extends T[] ? number : never>
) => UseProcessTasksState<T, K, D>;

const QUEUED_TASK_BASE = {
  cancel: undefined,
  message: undefined,
  progress: undefined,
  status: 'QUEUED' as const,
};

const isTaskHandlerInput = (
  input: TaskHandlerInput | Omit<TaskHandlerInput, 'data'>
): input is TaskHandlerInput => !!(input as TaskHandlerInput).data;

export const useProcessTasks: UseProcessTasks = <
  T extends TaskData,
  // input params not included in `TaskHandlerInput`
  K,
  // infered value of `items` for conditional typing of `concurrency
  D extends T[] | undefined,
>(
  handler: TaskHandler<TaskHandlerInput<T> & K, TaskHandlerOutput>,
  items?: D,
  options?: ProcessTasksOptions<T, D extends T[] ? number : never>
): UseProcessTasksState<T, K, D> => {
  const flush = React.useReducer(() => ({}), {})[1];
  const { concurrency } = options ?? {};

  const tasksRef = React.useRef<Map<string, Task<T>>>(new Map());

  const updateTask = React.useCallback(
    (id: string, next?: Partial<Task<T>>) => {
      const task = tasksRef.current.get(id);

      if (!task) return;

      if (!next) {
        tasksRef.current.delete(id);
      } else {
        tasksRef.current.set(id, { ...task, ...next });
      }

      flush();
    },
    [flush]
  );

  const createTask = React.useCallback(
    (data: T) => {
      function remove() {
        if (tasksRef.current.get(data.id)?.status === 'PENDING') return;
        updateTask(data.id);
      }

      function cancel() {
        if (tasksRef.current.get(data.id)?.status !== 'QUEUED') return;
        updateTask(data.id, { cancel: undefined, status: 'CANCELED' });
      }

      const task = { ...QUEUED_TASK_BASE, cancel, data, remove };
      tasksRef.current.set(data.id, task);
    },
    [updateTask]
  );

  React.useEffect(() => {
    if (!items?.length) return;

    items.forEach((data) => {
      if (tasksRef.current.has(data.id)) return;

      createTask(data);
    });

    flush();
  }, [createTask, flush, items]);

  const processNextTask: HandleProcessTasks<T, K, D> = React.useCallback(
    (_input) => {
      const hasInputData = isTaskHandlerInput(_input);
      if (hasInputData) {
        createTask(_input.data);
        flush();
      }

      const { data } = hasInputData
        ? _input
        : [...tasksRef.current.values()].find(
            ({ status }) => status === 'QUEUED'
          ) ?? {};

      if (!data) return;

      const { options } = _input;

      const onProgress = ({ id }: T, progress?: number) =>
        updateTask(id, { progress });

      const input = { ..._input, data, options: { ...options, onProgress } };
      const { cancel, result } = handler(input as TaskHandlerInput<T> & K);

      result
        .then((output) => {
          updateTask(data.id, output);
        })
        .catch(({ message }: Error) => {
          updateTask(data.id, { message, status: 'FAILED' });
        })
        .finally(() => {
          processNextTask(_input);
        });

      updateTask(data.id, { cancel: () => cancel?.(), status: 'PENDING' });
    },
    [createTask, flush, handler, updateTask]
  );

  const tasks = [...tasksRef.current.values()];
  const statusCounts = getStatusCounts(tasks);
  const isProcessing = isProcessingTasks(statusCounts);
  const isProcessingComplete = hasCompletedProcessingTasks(statusCounts);

  const handleProcessTasks: HandleProcessTasks<T, K, D> = (input) => {
    if (isProcessing) {
      return;
    }

    if (!concurrency) {
      processNextTask(input);
      return;
    }

    let count = 0;
    while (count < concurrency) {
      processNextTask(input);
      count++;
    }
  };

  return [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleProcessTasks,
  ];
};
