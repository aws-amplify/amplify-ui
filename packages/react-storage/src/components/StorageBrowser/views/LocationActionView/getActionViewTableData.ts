import { humanFileSize } from '@aws-amplify/ui';

import { DataTableProps } from '../../composables/DataTable';
import { Task, TaskStatus } from '../../tasks';

import { isFileItem, isFileDataItem, TaskData } from '../../actions';
import { getActionIcon } from './getActionIcon';
import { getFileTypeDisplayValue } from './getFileTypeDisplayValue';
import { getPercentValue } from '../utils';
import { getDefaultActionViewHeaders } from './getDefaultActionViewHeaders';
import { ActionViewHeaders } from './types';
import { DefaultActionViewDisplayText } from '../../displayText/types';

const getTaskStatusDisplayLabel = ({
  status,
  displayText: {
    statusDisplayInProgressLabel,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
    statusDisplayOverwritePreventedLabel,
  },
}: {
  status: TaskStatus;
  displayText: Omit<
    DefaultActionViewDisplayText,
    'getActionCompleteMessage'
  > & {
    statusDisplayOverwritePreventedLabel?: string;
  };
}) => {
  switch (status) {
    case 'PENDING':
      return statusDisplayInProgressLabel;
    case 'CANCELED':
      return statusDisplayCanceledLabel;
    case 'COMPLETE':
      return statusDisplayCompletedLabel;
    case 'FAILED':
      return statusDisplayFailedLabel;
    case 'QUEUED':
      return statusDisplayQueuedLabel;
    case 'OVERWRITE_PREVENTED':
      return statusDisplayOverwritePreventedLabel;
    default:
      return statusDisplayQueuedLabel;
  }
};

export const getProgressHeader = (label: string): ActionViewHeaders[0] => ({
  key: 'progress',
  type: 'sort',
  content: { label },
});

export const getActionViewTableData = <T extends TaskData = TaskData>({
  tasks,
  displayText,
  isProcessing,
  locationKey,
  shouldDisplayProgress = false,
  onTaskRemove,
}: {
  tasks: Task<T>[];
  isProcessing: boolean;
  locationKey?: string;
  shouldDisplayProgress?: boolean;
  displayText: Omit<
    DefaultActionViewDisplayText,
    'getActionCompleteMessage'
  > & {
    tableStatusOverwritePreventedLabel?: string;
  };
  onTaskRemove?: (task: Task<T>) => void;
}): DataTableProps => {
  const headers = [
    ...getDefaultActionViewHeaders({
      displayText,
    }),
  ];
  if (shouldDisplayProgress) {
    headers.splice(
      -1,
      0,
      getProgressHeader(displayText.tableColumnProgressHeader)
    );
  }

  const rows: DataTableProps['rows'] = tasks.map((task) => {
    const { cancel, data, progress, status } = task;
    const { id } = data;
    const displayKey = isFileDataItem(data)
      ? data.fileKey
      : data.key.split('/').pop() ?? '';

    return {
      key: id,
      content: headers.map(({ key: columnKey }) => {
        const key = `${columnKey}-${id}`;
        switch (columnKey) {
          case 'name': {
            return {
              key,
              type: 'text',
              content: {
                icon: getActionIcon(status),
                text: displayKey,
              },
            };
          }
          case 'folder': {
            if (locationKey) {
              return { key, type: 'text', content: { text: locationKey } };
            }

            if (isFileItem(data)) {
              const { webkitRelativePath } = data.file;
              return {
                key,
                type: 'text',
                content: {
                  text: webkitRelativePath
                    ? webkitRelativePath.slice(
                        0,
                        webkitRelativePath.lastIndexOf('/') + 1
                      )
                    : '-',
                },
              };
            }

            return { key, type: 'text', content: { text: '/' } };
          }
          case 'type': {
            return {
              key,
              type: 'text',
              content: { text: getFileTypeDisplayValue(displayKey) },
            };
          }
          case 'size': {
            const value = isFileItem(data)
              ? data.file.size
              : isFileDataItem(data)
              ? data.size
              : undefined;
            return {
              key,
              type: 'number',
              content: {
                value,
                displayValue: value ? humanFileSize(value, true) : '-',
              },
            };
          }
          case 'status': {
            return {
              key,
              type: 'text',
              content: {
                text: getTaskStatusDisplayLabel({ status, displayText }),
              },
            };
          }
          case 'progress': {
            return {
              key,
              type: 'number',
              content: {
                value: progress,
                displayValue: `${getPercentValue(progress ?? 0)}%`,
              },
            };
          }
          case 'cancel': {
            const isPending = status === 'PENDING';
            const isQueued = status === 'QUEUED';

            const isDisabled =
              (!isPending && !isQueued) || !cancel || progress === 1;

            const ariaLabel = `${
              isProcessing ? 'Cancel' : 'Remove'
            } item: ${displayKey}`;

            return {
              key,
              type: 'button',
              content: {
                isDisabled,
                onClick: () => {
                  if (!isProcessing) {
                    onTaskRemove?.(task);
                  }
                  cancel?.();
                },
                ariaLabel,
                icon: 'cancel',
              },
            };
          }

          default:
            return { key, type: 'text', content: {} };
        }
      }),
    };
  });

  return { headers, rows };
};
