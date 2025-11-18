/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { capitalize } from '@aws-amplify/ui';

import { isDeleteViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS } from './constants';
import type { LocationDataTask } from './types';
import { cancel, folder, getFileDataCellKey, name, size, type } from './utils';

const status = (data: any) => {
  const key = getFileDataCellKey(data);
  const {
    item: { status },
    props: { displayText },
  } = data;
  //@ts-expect-error error
  const statusLabelKey = STATUS_LABELS[status];

  const text = isDeleteViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
};

const progress = (data: any) => {
  const key = getFileDataCellKey(data);
  const { item, props } = data;
  const { folderFileCounts = {}, isCalculatingTotal = false } = props;

  // For folders, show folder-specific file count
  if (item.data.type === 'FOLDER') {
    if (isCalculatingTotal) {
      return { key, type: 'text', content: { text: 'Calculating...' } };
    }

    const fileCount = folderFileCounts[item.data.key] || 0;
    const text = `${fileCount} files`;
    return { key, type: 'text', content: { text } };
  }

  // For files, show simple status
  const text = item.status === 'COMPLETE' ? 'Deleted' : '-';
  return { key, type: 'text', content: { text } };
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

export const DELETE_TABLE_RESOLVERS = {
  //@ts-expect-error error
  getCell: (data: any) => DELETE_CELL_RESOLVERS[data.key](data),
  getHeader: ({ key, props: { displayText } }: any) => {
    const text = displayText[`tableColumn${capitalize(key)}Header`];

    if (key === 'cancel') {
      return { key, type: 'text', content: { text } };
    }

    return { key, type: 'sort', content: { label: text } };
  },
  getRowKey: ({ item }: { item: LocationDataTask }) => item.data.id,
};
