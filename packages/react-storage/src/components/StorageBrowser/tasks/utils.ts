import { isFunction } from '@aws-amplify/ui';

import { CancelableTaskHandlerOutput, TaskHandlerOutput } from '../actions';

export const updateTasks = <T extends { key: string }>(
  tasks: T[],
  task: Partial<T>
): T[] => {
  const index = tasks.findIndex(({ key }) => key === task.key);

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

export const hasExistingTask = (
  tasks: { key: string }[],
  item: { key: string }
): boolean => tasks.some(({ key }) => key === item.key);
