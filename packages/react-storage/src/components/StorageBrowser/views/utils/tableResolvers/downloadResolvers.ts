import { capitalize } from '@aws-amplify/ui';

import { isDownloadViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS } from './constants';
import type { FileDataTaskTableResolvers, GetFileDataCell } from './types';
import { cancel, folder, getFileDataCellKey, name, size, type } from './utils';

const status: GetFileDataCell = (data) => {
  const key = getFileDataCellKey(data);
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

const DOWNLOAD_CELL_RESOLVERS = {
  name,
  folder,
  type,
  size,
  status,
  cancel,
};

export const DOWNLOAD_TABLE_RESOLVERS: FileDataTaskTableResolvers = {
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
