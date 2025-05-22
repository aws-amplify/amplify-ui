import { capitalize } from '@aws-amplify/ui';

import type { WithKey } from '../../../components/types';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import type {
  GetUploadCell,
  UploadActionTask,
  UploadTableKey,
  UploadTableResolvers,
} from './types';
import {
  getCellName,
  getUploadCellFolder,
  getUploadCellProgress,
  getFileSize,
  getFileType,
} from './utils';

export const UPLOAD_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'progress',
  'cancel',
] as const;

const getUploadCellKey = ({
  key,
  item,
}: WithKey<{ item: UploadActionTask }, UploadTableKey>) =>
  `${key}-${item.data.id}`;

const name: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);

  const { item } = data;
  const icon = STATUS_ICONS[item.status];
  const text = getCellName(item.data.key);

  return { key, type: 'text', content: { icon, text } };
};

const folder: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);

  const text = getUploadCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

const type: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);

  const { item } = data;
  const text = getFileType(getCellName(item.data.key));

  return { key, type: 'text', content: { text } };
};

const size: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);

  const { size: value } = data.item.data.file;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

const status: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;

  const text = displayText[STATUS_LABELS[status]];

  return { key, type: 'text', content: { text } };
};

const progress: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);
  const content = getUploadCellProgress(data.item);

  return { key, type: 'number', content };
};

const cancel: GetUploadCell = (data) => {
  const key = getUploadCellKey(data);

  const { item, props } = data;
  const { cancel, data: taskData, status, progress } = item;
  const { isMultipartUpload, isProcessing, onTaskRemove } = props;

  const isQueued = status === 'QUEUED';
  const isPending = status === 'PENDING';

  // cancelability is dependent on differing conditions for multipart and single part uploads
  let isCancelable: boolean;
  if (isMultipartUpload(taskData.file)) {
    // signals MPU complete has been reached
    const hasUploadedAllBytes = progress === 1;

    // MPU allows cancel when tasks processing has begun and task is queued or
    // pending but not yet reached MPU complete
    isCancelable =
      isProcessing && (isQueued || isPending) && !hasUploadedAllBytes;
  } else {
    // single part upload allows cancel when processing has begun and task is queued
    isCancelable = isProcessing && isQueued;
  }

  // all uploads are removable prior to processing start. Including `isQueued`
  // ensures that `isRemovable` is `false` on all tasks processing complete
  const isRemovable = !isProcessing && isQueued;

  const isDisabled = !isRemovable && !isCancelable;

  const ariaLabel = `${isRemovable ? 'Remove' : 'Cancel'} item: ${getCellName(
    item.data.key
  )}`;

  // resolve to `undefined` if not cancelable or removable
  const onClick =
    !isCancelable && !isRemovable
      ? undefined
      : () => {
          if (isRemovable) {
            onTaskRemove?.(item);
            // do not run cancel handler on remove
            return;
          }

          if (!!cancel && isCancelable) cancel();
        };

  const content = { ariaLabel, isDisabled, onClick, icon: 'cancel' as const };

  return { key, type: 'button', content };
};

const UPLOAD_CELL_RESOLVERS = {
  cancel,
  folder,
  name,
  progress,
  size,
  status,
  type,
};

export const UPLOAD_TABLE_RESOLVERS: UploadTableResolvers = {
  getCell: (data) => UPLOAD_CELL_RESOLVERS[data.key](data),
  getHeader: ({ key, props: { displayText } }) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }) => item.data.id,
};
