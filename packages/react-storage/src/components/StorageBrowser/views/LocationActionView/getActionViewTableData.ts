import { humanFileSize } from '@aws-amplify/ui';

import { DataTableProps } from '../../composables/DataTable';
import { Task } from '../../tasks';

import {
  DEFAULT_ACTION_VIEW_HEADERS,
  PROGRESS_HEADER,
  STATUS_DISPLAY_VALUES,
} from './constants';

import { isFileItem, isFileDataItem } from '../../actions';
import { getActionIcon } from './getActionIcon';
import { getFileTypeDisplayValue } from './getFileTypeDisplayValue';
import { getPercentValue } from '../utils';

export const getActionViewTableData = ({
  tasks,
  locationKey,
  isProcessing,
  shouldDisplayProgress = false,
  onTaskCancel,
}: {
  tasks: Task[];
  locationKey?: string;
  isProcessing: boolean;
  shouldDisplayProgress?: boolean;
  onTaskCancel: (task: Task) => void;
}): DataTableProps => {
  const headers = [...DEFAULT_ACTION_VIEW_HEADERS];
  if (shouldDisplayProgress) {
    headers.splice(-1, 0, PROGRESS_HEADER);
  }

  const rows: DataTableProps['rows'] = tasks.map((task) => {
    const { data, progress, status } = task;
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
              content: { text: STATUS_DISPLAY_VALUES[status] },
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
            const isDisabled =
              (isProcessing && !task.cancel) ||
              (status !== 'PENDING' && status !== 'QUEUED');
            const ariaLabel = `${
              isProcessing ? 'Cancel' : 'Remove'
            } item: ${displayKey}`;

            return {
              key,
              type: 'button',
              content: {
                isDisabled,
                onClick: () => {
                  onTaskCancel(task);
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
