import { capitalize, noop } from '@aws-amplify/ui';

import { isDownloadViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS } from './constants';
import type {
  ActionTaskTableResolvers,
  DownloadTableResolvers,
  GetActionCell,
} from './types';
import {
  cancel,
  folder,
  getActionCellKey,
  name,
  size,
  type,
} from './actionResolvers';

export const DOWNLOAD_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'cancel',
] as const;

// const name: GetActionCell<DownloadTableResolvers> = (data) => {
//   const key = getActionCellKey(data);

//   const { item } = data;
//   const text = item.data.fileKey;
//   const icon = STATUS_ICONS[item.status];

//   return { key, type: 'text', content: { icon, text } };
// };

// const folder: GetActionCell<DownloadTableResolvers> = (data) => {
//   const key = getActionCellKey(data);
//   const text = getActionCellFolder(data.item);

//   return { key, type: 'text', content: { text } };
// };

// const type: GetActionCell<DownloadTableResolvers> = (data) => {
//   const key = getActionCellKey(data);
//   const { fileKey } = data.item.data;

//   const text = getFileType(fileKey);

//   return { key, type: 'text', content: { text } };
// };

// const size: GetActionCell<DownloadTableResolvers> = (data) => {
//   const key = getActionCellKey(data);
//   const { size: value } = data.item.data;
//   const displayValue = getFileSize(value);

//   return { key, type: 'number', content: { value, displayValue } };
// };

const status: GetActionCell<DownloadTableResolvers> = (data) => {
  const key = getActionCellKey(data);
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

// const cancel: GetActionCell<DownloadTableResolvers> = (data) => {
//   const key = getActionCellKey(data);
//   const content = getActionCancelCellContent(data);

//   return { key, type: 'button', content };
// };

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
  progress: noop as GetActionCell<ActionTaskTableResolvers>,
};

export const DOWNLOAD_TABLE_RESOLVERS: DownloadTableResolvers = {
  getCell: (data) => {
    const isValidKey = (
      key: string
    ): key is keyof typeof DOWNLOAD_CELL_RESOLVERS => {
      return key in DOWNLOAD_CELL_RESOLVERS;
    };

    if (isValidKey(data.key)) {
      return DOWNLOAD_CELL_RESOLVERS[data.key](data);
    }

    throw new Error(`Unexpected key for download resolvers: ${data.key}`);
  },
  getHeader: ({ key, props: { displayText } }) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }) => item.data.id,
};
