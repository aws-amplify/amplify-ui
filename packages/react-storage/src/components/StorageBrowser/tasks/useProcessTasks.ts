import React from 'react';

import { isFunction } from '@aws-amplify/ui';

import {
  CancelableTaskHandlerOutput,
  TaskHandlerInput,
  TaskHandlerOutput,
} from '../actions';

const QUEUED_TASK_BASE = {
  cancel: undefined,
  message: undefined,
  progress: undefined,
  status: 'QUEUED' as const,
};

export function updateTasks<T extends { key: string }>(
  tasks: T[],
  task: Partial<T>
): T[] {
  const index = tasks.findIndex(({ key }) => key === task.key);
  const updatedTask = { ...tasks[index], ...task };

  if (index === 0) {
    return [updatedTask, ...tasks.slice(1)];
  }

  if (index === tasks.length) {
    return [...tasks.slice(-1), updatedTask];
  }

  return [...tasks.slice(0, index), updatedTask, ...tasks.slice(index + 1)];
}

export type TaskStatus =
  | 'CANCELED'
  | 'FAILED'
  | 'COMPLETE'
  | 'QUEUED'
  | 'PENDING';

interface ProcessTasksOptions {
  concurrency?: number;
  isCancelable?: boolean;
}

export type TaskHandler<T = any, K = any> = (
  input: TaskHandlerInput<T, K>
) => TaskHandlerOutput;

export type ProcessTasks<T, K> = (
  input: Omit<TaskHandlerInput<T, K>, 'data'>
) => void;

export interface Task<T = any> {
  cancel: undefined | (() => void);
  item: T;
  key: string;
  message: string | undefined;
  progress: number | undefined;
  remove: () => void;
  status: TaskStatus;
}

const isCancelableOutput = (
  output: TaskHandlerOutput | CancelableTaskHandlerOutput
): output is CancelableTaskHandlerOutput =>
  isFunction((output as CancelableTaskHandlerOutput).cancel);

type HandleProcess<T, K> = (
  ...input: Omit<TaskHandlerInput<T, K>, 'data'>[]
) => void;
export type ProcessTasksState<T = any, K = any> = [
  tasks: Task<T>[],
  handleProcess: HandleProcess<T, K>,
];

const hasExistingTask = (tasks: Task[], item: { key: string }) =>
  tasks.some(({ key }) => key === item.key);

export const useProcessTasks = <T, K>(
  handler: (
    input: TaskHandlerInput<T, K>
  ) => TaskHandlerOutput | CancelableTaskHandlerOutput,
  items: { key: string; item: T }[] | undefined,
  options?: ProcessTasksOptions
): ProcessTasksState<T, K> => {
  const { concurrency } = options ?? {};

  const [tasks, setTasks] = React.useState<Task<T>[]>(() => []);

  const inflight = React.useRef(new Map());

  React.useEffect(() => {
    if (!items?.length) return;

    setTasks((prevTasks) => {
      const nextTasks: Task<T>[] = items.reduce((tasks, item) => {
        const remove = () => {
          if (inflight.current.has(item.key)) return;

          setTasks((prevTasks) =>
            prevTasks.filter(({ key }) => key !== item.key)
          );
        };
        return hasExistingTask(prevTasks, item)
          ? tasks
          : [...tasks, { ...item, ...QUEUED_TASK_BASE, remove }];
      }, [] as Task<T>[]);

      return [...prevTasks, ...nextTasks];
    });
  }, [items]);

  const _processTasks: ProcessTasks<T, K> = React.useCallback(
    (input) => {
      setTasks((prevTasks) => {
        const nextTask = prevTasks.find(
          ({ key: _key, status }) => status === 'QUEUED'
        );

        if (!nextTask || inflight.current.has(nextTask.key)) {
          return prevTasks;
        }

        const { item, key } = nextTask;

        inflight.current.set(key, item);

        const output = handler({ ...input, data: { key, payload: item } });

        const isCancelable = isCancelableOutput(output);

        const cancel = !isCancelable
          ? undefined
          : () => {
              output.cancel?.();
              setTasks((prev) =>
                updateTasks(prev, { key, status: 'CANCELED' })
              );
            };

        const { result } = output;

        result
          .then((status) => {
            setTasks((prev) =>
              updateTasks(prev, { key, cancel: undefined, status })
            );
          })
          .catch(({ message }: Error) => {
            setTasks((prev) =>
              updateTasks(prev, {
                key,
                cancel: undefined,
                message,
                status: 'FAILED',
              })
            );
          })
          .finally(() => {
            inflight.current.delete(key);
            _processTasks(input);
          });

        return updateTasks(prevTasks, { key, cancel, status: 'PENDING' });
      });
    },
    [handler]
  );

  const processTasks: HandleProcess<T, K> = (input) => {
    if (!concurrency) {
      _processTasks(input);
      return;
    }

    let count = 0;
    while (count < concurrency) {
      _processTasks(input);
      count++;
    }
  };

  return [tasks, processTasks];
};
