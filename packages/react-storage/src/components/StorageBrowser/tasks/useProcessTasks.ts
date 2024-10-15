import React from 'react';

import {
  CancelableTaskHandlerOutput,
  TaskHandlerInput,
  TaskHandlerOutput,
} from '../actions';

import {
  HandleProcessTasks,
  ProcessTasksOptions,
  ProcessTasksState,
  Task,
} from './types';
import { hasExistingTask, isCancelableOutput, updateTasks } from './utils';

const QUEUED_TASK_BASE = {
  cancel: undefined,
  message: undefined,
  status: 'QUEUED' as const,
};

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

  const _processTasks: HandleProcessTasks<T, K> = React.useCallback(
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

  const processTasks: HandleProcessTasks<T, K> = (input) => {
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
