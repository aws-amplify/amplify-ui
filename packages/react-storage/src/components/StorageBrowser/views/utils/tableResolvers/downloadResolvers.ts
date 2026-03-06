import { capitalize } from '@aws-amplify/ui';

import { isDownloadViewDisplayTextKey } from '../../../displayText';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import type {
  DownloadActionTask,
  DownloadTableKey,
  DownloadTableResolvers,
  GetDownloadCell,
} from './types';
import {
  getCellName,
  getDownloadCellProgress,
  getFileDataCellFolder,
  getFileSize,
  getFileType,
} from './utils';
import type { WithKey } from '../../../components';

export const DOWNLOAD_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'progress',
  'cancel',
] as const;

const getDownloadCellKey = ({
  key,
  item,
}: WithKey<{ item: DownloadActionTask }, DownloadTableKey>) =>
  `${key}-${item.data.id}`;

const name: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};
const folder: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);
  const text = getFileDataCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};
const type: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);

  const { item } = data;
  const text = getFileType(getCellName(item.data.key));

  return { key, type: 'text', content: { text } };
};
const size: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};
const status: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;

  const statusLabelKey = STATUS_LABELS[status];

  const text = isDownloadViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
};
const progress: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);
  const content = getDownloadCellProgress(data.item);
  return { key, type: 'number', content };
};

const cancel: GetDownloadCell = (data) => {
  const key = getDownloadCellKey(data);

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
            onTaskRemove?.(item);
            // do not run cancel handler on remove
            return;
          }

          if (isCancelable) cancel();
        };

  const content = { ariaLabel, isDisabled, onClick, icon: 'cancel' as const };

  return { key, type: 'button', content };
};

const DOWNLOAD_CELL_RESOLVERS = {
  name,
  folder,
  type,
  size,
  status,
  progress,
  cancel,
};

export const DOWNLOAD_TABLE_RESOLVERS: DownloadTableResolvers = {
  getCell: (data) => DOWNLOAD_CELL_RESOLVERS[data.key](data),
  getHeader: ({ key, props: { displayText } }) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }) => item.data.id,
};
