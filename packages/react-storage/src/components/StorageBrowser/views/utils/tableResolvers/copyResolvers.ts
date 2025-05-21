import { capitalize, noop } from '@aws-amplify/ui';

import { isCopyViewDisplayTextKey } from '../../../displayText';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import type { CopyTaskTableResolvers } from './types';
import {
  getActionCellFolder,
  getActionCancelCellContent,
  getFileSize,
  getFileType,
} from './utils';
import { getActionCellKey } from './actionResolvers';

export const COPY_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'cancel',
] as const;

type GetCopyTaskCell = CopyTaskTableResolvers['getCell'];

const name: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};

const folder: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);
  const text = getActionCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

const type: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);
  const { fileKey } = data.item.data;

  const text = getFileType(fileKey);

  return { key, type: 'text', content: { text } };
};

const size: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

const status: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;

  const statusLabelKey = STATUS_LABELS[status];

  const text = isCopyViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
};

const cancel: GetCopyTaskCell = (data) => {
  const key = getActionCellKey(data);
  const content = getActionCancelCellContent(data);

  return { key, type: 'button', content };
};

const COPY_CELL_RESOLVERS = {
  name,
  folder,
  type,
  size,
  status,
  cancel,

  /**
   * @deprecated
   *
   * non-upload view tables do not include "progress" headers but include here to
   * keep TS happy as "progress" headers were included in display text interfaces
   * and cannot be removed from the tables without a breaking change
   */
  progress: noop as GetCopyTaskCell,
};

export const COPY_TABLE_RESOLVERS: CopyTaskTableResolvers = {
  getCell: (data) => COPY_CELL_RESOLVERS[data.key](data),
  getHeader: ({ key, props: { displayText } }) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }) => item.data.id,
};
