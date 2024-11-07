import { humanFileSize, isUndefined } from '@aws-amplify/ui';

import {
  DataTableButtonDataCell,
  DataTableProps,
} from '../../composables/DataTable';
import { DataTableRow } from '../../composables/DataTable/DataTable';
import { IconVariant } from '../../context/elements';
import { WithKey } from '../../components/types';
import { Task, TaskStatus } from '../../tasks';

import { STATUS_DISPLAY_VALUES } from './constants';

import { FileItem, isFileItem } from '../../providers';
import { FileData } from '../../actions/handlers';

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

export const getFilenameWithoutPrefix = (path: string): string => {
  const folder = path.lastIndexOf('/') + 1;
  return path.slice(folder, path.length);
};

export const getActionViewTableData = <T extends FileItem | FileData>({
  tasks,
  path,
  isProcessing,
}: {
  tasks: Task<T>[];
  path: string;
  isProcessing: boolean;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = tasks.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.data.id,
      content: DELETE_ACTION_VIEW_HEADERS.map(({ key: columnKey }) => {
        const key = `${columnKey}-${item.data.id}`;
        switch (columnKey) {
          case 'key': {
            return {
              key,
              type: 'text',
              content: {
                icon: getActionIconVariant(item.status),
                text: getFilenameWithoutPrefix(item.data.key),
              },
            };
          }
          case 'folder': {
            return { key, type: 'text', content: { text: path } };
          }
          case 'type': {
            return {
              key,
              type: 'text',
              content: { text: getFileTypeDisplayValue(item.data.key) },
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
            const ariaLabel = `${isProcessing ? 'Cancel' : 'Remove'} item: ${
              item.data.key
            }`;

            const buttonCell: DataTableButtonDataCell = {
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

  return { headers: DELETE_ACTION_VIEW_HEADERS, rows };
};
