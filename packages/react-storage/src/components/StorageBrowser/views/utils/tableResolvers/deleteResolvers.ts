import { capitalize } from '@aws-amplify/ui';

import { isDeleteViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS, STATUS_ICONS } from './constants';
import type {
  GetDeleteCell,
  DeleteTableResolvers,
  DeleteTableKey,
  DeleteActionTask,
  DeleteTableResolverProps,
} from './types';
import { getFileSize, getFileType, getCellName } from './utils';
import { getFileKey, type DeleteHandlerData } from '../../../actions';
import type { CellData } from '../../hooks/useResolveTableData/types';
import type { DataTableButtonDataCell, WithKey } from '../../../components';
import { getFolderName } from '../../LocationActionView/DeleteView/utils';

const getDeleteCellKey = (data: Parameters<GetDeleteCell>[0]) =>
  `${data.key}-${data.item.data.id}`;

const getCellDataFolder = (data: DeleteHandlerData): string => {
  const { type, key } = data;
  const fileKey = getFileKey(key);
  const targetKey = data.key;

  if (type === 'FOLDER') {
    const pathWithoutTrailingSlash = targetKey.replace(/\/$/, '');
    const lastSlashIndex = pathWithoutTrailingSlash.lastIndexOf('/');
    return lastSlashIndex >= 0
      ? pathWithoutTrailingSlash.slice(0, lastSlashIndex + 1)
      : '';
  }

  return targetKey.slice(0, -fileKey?.length);
};

const name: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const { item } = data;

  let text: string;
  if (item.data.type === 'FOLDER') {
    text = `${getFolderName(item.data.key)}/`;
  } else {
    text = item.data.fileKey ?? getCellName(item.data.key);
  }

  const icon = STATUS_ICONS[item.status];
  return { key, type: 'text', content: { icon, text } };
};

const folder: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const text = getCellDataFolder(data.item.data);

  return { key, type: 'text', content: { text } };
};

const type: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);

  if (data.item.data.type === 'FOLDER') {
    return { key, type: 'text', content: { text: 'Folder' } };
  }

  const text = getFileType(data.item.data.key);

  return { key, type: 'text', content: { text } };
};

const size: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const itemData = data.item.data;

  if (data.item.data.type === 'FOLDER') {
    return { key, type: 'text', content: { text: '-' } };
  }
  const value = 'size' in itemData ? itemData.size : 0;
  const displayValue = getFileSize(value as any as number);

  return { key, type: 'number', content: { value, displayValue } };
};

export const getCancelCellContent = (
  data: WithKey<
    CellData<DeleteTableResolverProps, DeleteActionTask>,
    DeleteTableKey
  >
): DataTableButtonDataCell['content'] => {
  const { item, props } = data;
  const { cancel, status } = item;
  const { isProcessing, onTaskRemove } = props;

  const isQueued = status === 'QUEUED';
  const isRemovable = isQueued && !isProcessing;
  const isCancelable = isProcessing && !!cancel;

  const itemAriaValue = getCellName(item.data.fileKey ?? item.data.key);
  const ariaLabel = `${
    isRemovable ? 'Remove' : 'Cancel'
  } item: ${itemAriaValue}`;

  const isDisabled = !isRemovable && !isCancelable;
  const onClick =
    !isCancelable && !isRemovable
      ? undefined
      : () => {
          if (isRemovable) {
            onTaskRemove?.(item);
            return;
          }

          if (isCancelable) cancel();
        };

  return { ariaLabel, isDisabled, onClick, icon: 'cancel' as const };
};

const cancel: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const content = getCancelCellContent(data);

  return { key, type: 'button', content };
};

const status: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;
  const statusLabelKey = STATUS_LABELS[status];

  const text = isDeleteViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
};

const progress: GetDeleteCell = (data) => {
  const key = getDeleteCellKey(data);
  const { item } = data;
  const itemIsFile = item.data.type === 'FILE';

  if (itemIsFile) {
    const text = item.status === 'COMPLETE' ? 'Deleted' : '-';

    return { key, type: 'text', content: { text } };
  }

  if (
    (item.status === 'PENDING' ||
      item.status === 'FAILED' ||
      item.status === 'CANCELED') &&
    item.data.totalCount !== undefined
  ) {
    const text = `${item.successCount ?? 0}/${item.data.totalCount} files`;

    return { key, type: 'text', content: { text } };
  } else if (item.status === 'COMPLETE') {
    const text = `${item.data.totalCount} files deleted`;

    return { key, type: 'text', content: { text } };
  } else {
    const text =
      item.data.totalCount !== undefined
        ? `${item.data.totalCount} files`
        : 'Calculating...';

    return { key, type: 'text', content: { text } };
  }
};

const DELETE_CELL_RESOLVERS = {
  name,
  folder,
  type,
  size,
  status,
  progress,
  cancel,
};

export const DELETE_TABLE_RESOLVERS: DeleteTableResolvers = {
  getCell: (data) => DELETE_CELL_RESOLVERS[data.key](data),
  getHeader: ({ key, props: { displayText } }) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }) => item.data.id,
};
