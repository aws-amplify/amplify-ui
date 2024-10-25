import { IconVariant } from '../../../context/elements';
import { TaskStatus } from '../../../tasks';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { TaskCounts } from '../../../controls/types';

export interface GetActionViewTaskStatuses {
  hasStarted: boolean;
  taskCounts: ReturnType<typeof getTaskCounts>;
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
}

export const getActionIconVariant = (status: TaskStatus): IconVariant => {
  switch (status) {
    case 'QUEUED':
      return 'action-queued';
    case 'PENDING':
      return 'action-progress';
    case 'COMPLETE':
      return 'action-success';
    case 'FAILED':
      return 'action-error';
    case 'CANCELED':
      return 'action-canceled';
  }
};

export const getActionViewTaskStatuses = (
  taskCounts: TaskCounts
): GetActionViewTaskStatuses => {
  const hasStarted = taskCounts.QUEUED < taskCounts.TOTAL;
  const hasCompleted =
    !!taskCounts.TOTAL &&
    taskCounts.CANCELED + taskCounts.COMPLETE + taskCounts.FAILED ===
      taskCounts.TOTAL;

  const disableCancel = !hasStarted || taskCounts.QUEUED < 1;
  const disableClose = hasStarted && !hasCompleted;
  const disablePrimary =
    taskCounts.QUEUED < 1 || taskCounts.QUEUED < taskCounts.TOTAL;

  return {
    hasStarted,
    taskCounts,
    disableCancel,
    disableClose,
    disablePrimary,
  };
};

export const getFileTypeDisplayValue = (fileName: string): string =>
  fileName.lastIndexOf('.') !== -1
    ? fileName.slice(fileName.lastIndexOf('.') + 1)
    : '';

export const getFilenameWithoutPrefix = (path: string): string => {
  const folder = path.lastIndexOf('/') + 1;
  return path.slice(folder, path.length);
};
