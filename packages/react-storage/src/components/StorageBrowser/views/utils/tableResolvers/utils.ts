import { humanFileSize } from '@aws-amplify/ui';

import type {
  DataTableButtonDataCell,
  DataTableNumberDataCell,
  WithKey,
} from '../../../components';

import type {
  ActionTableKey,
  CopyActionTask,
  DownloadActionTask,
  FileDataTask,
  GetFileDataCell,
  UploadActionTask,
} from './types';
import { STATUS_ICONS } from './constants';

export const getFileType = (value: string, fallback = ''): string =>
  value.lastIndexOf('.') !== -1
    ? value.slice(value.lastIndexOf('.') + 1)
    : fallback;

export const getCellName = (value: string): string =>
  // `value.split` always returns an array with at least one entry
  // ensuring `.pop()` will always return a string
  value.split('/').pop()!;

export const getUploadCellFolder = (
  {
    data: {
      file: { webkitRelativePath },
    },
  }: UploadActionTask,
  fallback = '-'
): string =>
  webkitRelativePath
    ? webkitRelativePath.slice(0, webkitRelativePath.lastIndexOf('/') + 1)
    : fallback;

const isCopyActionTask = (task: FileDataTask): task is CopyActionTask =>
  'sourceKey' in task.data;

export const getFileDataCellFolder = (task: FileDataTask): string => {
  const targetKey = isCopyActionTask(task)
    ? task.data.sourceKey
    : task.data.key;
  const { fileKey } = task.data;
  return targetKey.slice(0, -fileKey.length);
};

export const getUploadCellProgress = ({
  progress,
  status,
}: UploadActionTask): DataTableNumberDataCell['content'] => {
  // prefer `progress` if available, 1 if status is complete, default 0
  const value = progress ?? (status === 'COMPLETE' ? 1 : 0);
  const displayValue = `${Math.round(value * 100)}%`;
  return { displayValue, value };
};

export const getDownloadCellProgress = ({
  progress,
  status,
}: DownloadActionTask): DataTableNumberDataCell['content'] => {
  // prefer `progress` if available, 1 if status is complete, default 0
  const value = progress ?? (status === 'COMPLETE' ? 1 : 0);
  const displayValue = `${Math.round(value * 100)}%`;
  return { displayValue, value };
};

export const getFileSize = (
  value: number | undefined,
  fallback = '-'
): string => (!value ? fallback : humanFileSize(value, true));

type CellInput = Parameters<GetFileDataCell>[0];

export const getFileDataCancelCellContent = <
  TInput extends CellInput,
  TCallback extends TInput['props']['onTaskRemove'] extends (
    item: infer TItem
  ) => void
    ? (item: TItem) => void
    : never,
>(
  data: TInput
): DataTableButtonDataCell['content'] => {
  const { item, props } = data;
  const { cancel, status } = item;
  const { isProcessing, onTaskRemove } = props;

  const isQueued = status === 'QUEUED';

  // a task is removable prior to processing start. Including `isQueued` ensures
  // that `isRemovable` is `false` on all tasks processing complete
  const isRemovable = isQueued && !isProcessing;

  // a task is cancelable while processing is true, and the task has a cancel handler
  const isCancelable = isProcessing && !!cancel;
  const ariaLabel = `${isRemovable ? 'Remove' : 'Cancel'} item: ${getCellName(
    item.data.fileKey
  )}`;

  const isDisabled = !isRemovable && !isCancelable;
  // resolve to `undefined` if not cancelable or removable
  const onClick =
    !isCancelable && !isRemovable
      ? undefined
      : () => {
          if (isRemovable) {
            (onTaskRemove as TCallback)?.(item);
            // do not run cancel handler on remove
            return;
          }

          if (isCancelable) cancel();
        };

  return { ariaLabel, isDisabled, onClick, icon: 'cancel' as const };
};

/**
 * Generates a unique key for a table cell based on the key and item id
 */
export const getFileDataCellKey = ({
  key,
  item,
}: WithKey<{ item: FileDataTask }, ActionTableKey>): string =>
  `${key}-${item.data.id}`;

export const name: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};

export const folder: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);
  const text = getFileDataCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

export const type: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);
  const { fileKey } = data.item.data;

  const text = getFileType(fileKey);

  return { key, type: 'text', content: { text } };
};

export const size: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

export const cancel: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);
  const content = getFileDataCancelCellContent(data);

  return { key, type: 'button', content };
};
