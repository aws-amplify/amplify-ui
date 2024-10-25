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
import { isCancelableOutput, updateTasks } from './utils';

const QUEUED_TASK_BASE = {
  cancel: undefined,
  message: undefined,
  status: 'QUEUED' as const,
};

export const useProcessTasks = <T, K>(
  handler: (
    input: TaskHandlerInput<T, K>
  ) => TaskHandlerOutput | CancelableTaskHandlerOutput,
  items: { key: string; id: string; item: T }[] | undefined,
  options?: ProcessTasksOptions
): ProcessTasksState<T, K> => {
  const { concurrency } = options ?? {};

  const [tasks, setTasks] = React.useState<Task<T>[]>(() => []);

  const inflight = React.useRef(new Map());

  React.useEffect(() => {
    if (!items?.length) return;

    const createRemove = (targetId: string) =>
      function remove() {
        if (inflight.current.has(targetId)) return;

        setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== targetId));
      };

    setTasks((prevTasks) => {
      const nextTasks: Task<T>[] = items.reduce(
        (tasks: Task<T>[], item) =>
          prevTasks.some(({ id }) => id === item.id)
            ? tasks
            : [
                ...tasks,
                { ...item, ...QUEUED_TASK_BASE, remove: createRemove(item.id) },
              ],
        []
      );

      if (!nextTasks.length) return prevTasks;

      return prevTasks.concat(nextTasks);
    });
  }, [items]);

  const _processTasks: HandleProcessTasks<T, K> = React.useCallback(
    (input) => {
      setTasks((prevTasks) => {
        const nextTask = prevTasks.find(({ status }) => status === 'QUEUED');

        if (!nextTask || inflight.current.has(nextTask.id)) {
          return prevTasks;
        }

        const { id, item: payload, key } = nextTask;

        inflight.current.set(id, payload);

        const output = handler({
          ...input,
          key,
          data: { id, payload },
        });

        const isCancelable = isCancelableOutput(output);

        const cancel = !isCancelable
          ? undefined
          : () => {
              output.cancel?.();
              setTasks((prev) => updateTasks(prev, { id, status: 'CANCELED' }));
            };

        const { result } = output;

        result
          .then((status) => {
            setTasks((prev) =>
              updateTasks(prev, { id, cancel: undefined, status })
            );
          })
          .catch(({ message }: Error) => {
            setTasks((prev) =>
              updateTasks(prev, {
                cancel: undefined,
                id,
                message,
                status: 'FAILED',
              })
            );
          })
          .finally(() => {
            inflight.current.delete(id);
            _processTasks(input);
          });

        return updateTasks(prevTasks, { cancel, id, status: 'PENDING' });
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
