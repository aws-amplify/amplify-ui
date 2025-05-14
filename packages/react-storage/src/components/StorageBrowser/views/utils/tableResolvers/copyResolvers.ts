import { capitalize, noop } from '@aws-amplify/ui';

import type { WithKey } from '../../../components/types';
import { isCopyViewDisplayTextKey } from '../../../displayText';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import type {
  CopyActionTask,
  CopyTableKey,
  CopyTaskTableResolvers,
} from './types';
import {
  getCopyCellFolder,
  getCopyOrDeleteCancelCellContent,
  getFileSize,
  getFileType,
} from './utils';

export const COPY_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'cancel',
] as const;

type GetCopyTaskCell = CopyTaskTableResolvers['getCell'];

const getCopyCellKey = ({
  key,
  item,
}: WithKey<{ item: CopyActionTask }, CopyTableKey>) => `${key}-${item.data.id}`;

const name: GetCopyTaskCell = (data) => {
  const key = getCopyCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};

const folder: GetCopyTaskCell = (data) => {
  const key = getCopyCellKey(data);
  const text = getCopyCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

const type: GetCopyTaskCell = (data) => {
  const key = getCopyCellKey(data);
  const { fileKey } = data.item.data;

  const text = getFileType(fileKey);

  return { key, type: 'text', content: { text } };
};

const size: GetCopyTaskCell = (data) => {
  const key = getCopyCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

const status: GetCopyTaskCell = (data) => {
  const key = getCopyCellKey(data);
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
  const key = getCopyCellKey(data);
  const content = getCopyOrDeleteCancelCellContent(data);

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
