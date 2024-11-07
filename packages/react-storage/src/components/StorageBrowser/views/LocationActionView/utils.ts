import { humanFileSize, isUndefined } from '@aws-amplify/ui';

import {
  DataTableButtonDataCell,
  DataTableProps,
} from '../../composables/DataTable';
import { DataTableRow } from '../../composables/DataTable/DataTable';
import { IconVariant } from '../../context/elements';
import { WithKey } from '../../components/types';
import { Task, TaskStatus } from '../../tasks';

import {
  DEFAULT_ACTION_VIEW_HEADERS,
  STATUS_DISPLAY_VALUES,
} from './constants';

import {
  FileDataItem,
  FileItem,
  isFileItem,
  isFileDataItem,
} from '../../actions';

export const getActionIconVariant = (status: TaskStatus): IconVariant => {
  switch (status) {
    case 'QUEUED':
      return 'action-queued';
    case 'PENDING':
      return 'action-progress';
    case 'COMPLETE':
    case 'OVERWRITE_PREVENTED':
      return 'action-success';
    case 'FAILED':
      return 'action-error';
    case 'CANCELED':
      return 'action-canceled';
  }
};

export const getFileTypeDisplayValue = (fileName: string): string =>
  fileName.lastIndexOf('.') !== -1
    ? fileName.slice(fileName.lastIndexOf('.') + 1)
    : '';

export const getActionViewTableData = <T extends FileItem | FileDataItem>({
  tasks,
  folder,
  isProcessing,
}: {
  tasks: Task<T>[];
  folder: string;
  isProcessing: boolean;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = tasks.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.data.id,
      content: DEFAULT_ACTION_VIEW_HEADERS.map(({ key: columnKey }) => {
        const key = `${columnKey}-${item.data.id}`;

        const displayKey = isFileDataItem(item.data)
          ? item.data.fileKey
          : item.data.key;

        switch (columnKey) {
          case 'key': {
            return {
              key,
              type: 'text',
              content: {
                icon: getActionIconVariant(item.status),
                text: displayKey,
              },
            };
          }
          case 'folder': {
            return { key, type: 'text', content: { text: folder } };
          }
          case 'type': {
            return {
              key,
              type: 'text',
              content: { text: getFileTypeDisplayValue(displayKey) },
            };
          }
          case 'size': {
            const value = isFileItem(item.data)
              ? item.data.file.size
              : item.data.size;
            return {
              key,
              type: 'number',
              content: { value, displayValue: humanFileSize(value, true) },
            };
          }
          case 'status': {
            return {
              key,
              type: 'text',
              content: { text: STATUS_DISPLAY_VALUES[item.status] },
            };
          }
          case 'action': {
            const isDisabled =
              (isProcessing && isUndefined(item.cancel)) ||
              (item.status !== 'PENDING' && item.status !== 'QUEUED');
            const onClick = isProcessing ? item.cancel : item.remove;
            const ariaLabel = `${
              isProcessing ? 'Cancel' : 'Remove'
            } item: ${displayKey}`;

            const buttonCell: WithKey<DataTableButtonDataCell> = {
              key,
              type: 'button',
              content: { isDisabled, onClick, ariaLabel, icon: 'cancel' },
            };

            return buttonCell;
          }

          default:
            return { key, type: 'text', content: { text: '' } };
        }
      }),
    };
    return row;
  });

  return { headers: DEFAULT_ACTION_VIEW_HEADERS, rows };
};
