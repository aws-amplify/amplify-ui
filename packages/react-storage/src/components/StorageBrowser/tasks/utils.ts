import { isFunction } from '@aws-amplify/ui';

import { CancelableTaskHandlerOutput, TaskHandlerOutput } from '../actions';

export const updateTasks = <T extends { id: string }>(
  tasks: T[],
  task: Partial<T> & { id: string }
): T[] => {
  const index = tasks.findIndex(({ id }) => id === task.id);

  if (index === -1) return tasks;

  const nextTask = { ...tasks[index], ...task };

  if (index === 0) return [nextTask, ...tasks.slice(1)];

  if (index === tasks.length - 1) return [...tasks.slice(0, -1), nextTask];

  return [...tasks.slice(0, index), nextTask, ...tasks.slice(index + 1)];
};

export const isCancelableOutput = (
  output: TaskHandlerOutput | CancelableTaskHandlerOutput
): output is CancelableTaskHandlerOutput =>
  isFunction((output as CancelableTaskHandlerOutput).cancel);
