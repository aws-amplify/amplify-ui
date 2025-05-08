import { capitalize, noop } from '@aws-amplify/ui';

import { WithKey } from '../../../components/types';
import { isDownloadMultipleViewDisplayTextKey } from '../../../displayText';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import {
  DownloadMultipleActionTask,
  DownloadMultipleTableResolvers,
  DownloadTableKey,
  GetDownloadMultipleCell,
} from './types';
import {
  // TODO: rename the below util
  getCopyOrDeleteCancelCellContent,
  getDownloadCellFolder,
  getFileSize,
  getFileType,
} from './utils';

export const DOWNLOAD_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'cancel',
] as const;

const getDownloadCellKey = ({
  key,
  item,
}: WithKey<{ item: DownloadMultipleActionTask }, DownloadTableKey>) =>
  `${key}-${item.data.id}`;

const name: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};

const folder: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);
  const text = getDownloadCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

const type: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);
  const { fileKey } = data.item.data;

  const text = getFileType(fileKey);

  return { key, type: 'text', content: { text } };
};

const size: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

const status: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;

  const statusLabelKey = STATUS_LABELS[status];

  const text = isDownloadMultipleViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
};

const cancel: GetDownloadMultipleCell = (data) => {
  const key = getDownloadCellKey(data);
  const content = getCopyOrDeleteCancelCellContent(data);

  return { key, type: 'button', content };
};

const DOWNLOAD_CELL_RESOLVERS = {
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
  progress: noop as GetDownloadMultipleCell,
};

export const DOWNLOAD_TABLE_RESOLVERS: DownloadMultipleTableResolvers = {
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
