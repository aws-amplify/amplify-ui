import { IconVariant } from '../../context/elements';
import { Task, TaskStatus } from '../../tasks';
import { TaskCounts } from '../../controls/types';
import { DataTableProps } from '../../composables/DataTable';
import { WithKey } from '../../components/types';
import { DataTableRow } from '../../composables/DataTable/DataTable';
import { humanFileSize } from '@aws-amplify/ui';
import { STATUS_DISPLAY_VALUES } from './constants';

const DELETE_ACTION_VIEW_HEADERS: DataTableProps['headers'] = [
  { key: 'key', type: 'sort', content: { label: 'Name' } },
  { key: 'folder', type: 'text', content: { text: 'Folder' } },
  { key: 'type', type: 'text', content: { text: 'Type' } },
  { key: 'size', type: 'text', content: { text: 'Size' } },
  { key: 'status', type: 'sort', content: { label: 'Status' } },
  { key: 'action', type: 'text', content: { text: '' } },
];

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

export const getTasksHaveStarted = (taskCounts: TaskCounts): boolean =>
  taskCounts.QUEUED < taskCounts.TOTAL;

export const getActionViewDisabledButtons = (
  taskCounts: TaskCounts
): {
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
} => {
  const hasStarted = getTasksHaveStarted(taskCounts);
  const hasCompleted =
    !!taskCounts.TOTAL &&
    taskCounts.CANCELED + taskCounts.COMPLETE + taskCounts.FAILED ===
      taskCounts.TOTAL;

  const disableCancel = !hasStarted || taskCounts.QUEUED < 1;
  const disableClose = hasStarted && !hasCompleted;
  const disablePrimary =
    taskCounts.QUEUED < 1 || taskCounts.QUEUED < taskCounts.TOTAL;

  return {
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

export const getActionViewTableData = ({
  tasks,
  taskCounts,
  path,
}: {
  tasks: Task[];
  taskCounts: TaskCounts;
  path: string;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = tasks.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.id,
      content: DELETE_ACTION_VIEW_HEADERS.map(({ key: columnKey }) => {
        const key = `${columnKey}-${item.id}`;
        switch (columnKey) {
          case 'key': {
            return {
              key,
              type: 'text',
              content: {
                icon: getActionIconVariant(item.status),
                text: getFilenameWithoutPrefix(item.key),
              },
            };
          }
          case 'folder': {
            return {
              key,
              type: 'text',
              content: {
                text: path,
              },
            };
          }
          case 'type': {
            return {
              key,
              type: 'text',
              content: {
                text: getFileTypeDisplayValue(item.key),
              },
            };
          }
          case 'size':
            return {
              key,
              type: 'text',
              content: {
                text: humanFileSize(
                  parseInt((item as Task & { size: string }).size),
                  true
                ),
              },
            };
          case 'status':
            return {
              key,
              type: 'text',
              content: {
                text: STATUS_DISPLAY_VALUES[item.status],
              },
            };
          case 'action':
            // don't allow removing a single task
            if (taskCounts.TOTAL > 1) {
              return getTasksHaveStarted(taskCounts)
                ? {
                    key,
                    type: 'button',
                    content: {
                      icon: 'cancel',
                      ariaLabel: `Cancel item: ${item.key}`,
                      onClick: () => item.cancel?.(),
                      isDisabled: item.status !== 'QUEUED',
                    },
                  }
                : {
                    key,
                    type: 'button',
                    content: {
                      icon: 'cancel',
                      ariaLabel: `Remove item: ${item.key}`,
                      onClick: () => item.remove(),
                    },
                  };
            } else {
              return {
                key,
                type: 'text',
                content: {
                  text: '',
                },
              };
            }
          default:
            return {
              key,
              type: 'text',
              content: {
                text: '',
              },
            };
        }
      }),
    };
    return row;
  });

  const tableData: DataTableProps = {
    headers: DELETE_ACTION_VIEW_HEADERS,
    rows,
  };
  return tableData;
};
