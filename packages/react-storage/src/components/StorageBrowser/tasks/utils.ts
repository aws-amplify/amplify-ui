import { INITIAL_STATUS_COUNTS } from './constants';
import type { StatusCounts, Task } from './types';

export const getStatusCounts = (tasks: Task[] = []): StatusCounts =>
  tasks.reduce(
    (counts, { status }) => ({ ...counts, [status]: counts[status] + 1 }),
    { ...INITIAL_STATUS_COUNTS, TOTAL: tasks.length }
  );

export const isProcessingTasks = (statusCounts: StatusCounts): boolean => {
  if (statusCounts.TOTAL === 0 || statusCounts.TOTAL === statusCounts.QUEUED) {
    return false;
  }

  return !(statusCounts.QUEUED === 0 && statusCounts.PENDING === 0);
};

export const hasCompletedProcessingTasks = (
  statusCounts: StatusCounts
): boolean => {
  if (statusCounts.TOTAL === 0 || isProcessingTasks(statusCounts)) return false;

  return statusCounts.QUEUED === 0 && statusCounts.PENDING === 0;
};
