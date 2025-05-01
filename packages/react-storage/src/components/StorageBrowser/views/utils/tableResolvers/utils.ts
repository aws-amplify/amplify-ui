import { humanFileSize } from '@aws-amplify/ui';

import type {
  DataTableButtonDataCell,
  DataTableNumberDataCell,
} from '../../../components';

import type {
  CopyActionTask,
  DeleteActionTask,
  GetCopyCell,
  GetDeleteCell,
  UploadActionTask,
} from './types';

export const getFileType = (value: string, fallback = ''): string =>
  value.lastIndexOf('.') !== -1
    ? value.slice(value.lastIndexOf('.') + 1)
    : fallback;

export const getCellName = (value: string): string =>
  // `value.split` always returns an array with at least one entry
  // ensruing `.pop()` will always return a string
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

export const getCopyCellFolder = ({
  data: { fileKey, sourceKey },
}: CopyActionTask): string => sourceKey.slice(0, -fileKey.length);

export const getDeleteCellFolder = ({
  data: { fileKey, key },
}: DeleteActionTask): string => key.slice(0, -fileKey.length);

export const getUploadCellProgress = ({
  progress,
  status,
}: UploadActionTask): DataTableNumberDataCell['content'] => {
  // prefer `progress` if available, 1 if status is complete, default 0
  const value = progress ?? (status === 'COMPLETE' ? 1 : 0);
  const displayValue = `${Math.round(value * 100)}%`;
  return { displayValue, value };
};

export const getFileSize = (
  value: number | undefined,
  fallback = '-'
): string => (!value ? fallback : humanFileSize(value, true));

type CellInput = Parameters<GetCopyCell>[0] | Parameters<GetDeleteCell>[0];

export const getCopyOrDeleteCancelCellContent = <
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
