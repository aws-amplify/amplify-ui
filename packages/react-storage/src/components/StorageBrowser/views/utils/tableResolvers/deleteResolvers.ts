/* eslint-disable no-console */
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
  const { item } = data;

  if (item.data.type === 'FOLDER') {
    if (item.status === 'PENDING' && item.data.totalCount > 0) {
      const text = `${item.data.deletedCount}/${item.data.totalCount} files`;
      return { key, type: 'text', content: { text } };
    } else if (item.status === 'COMPLETE') {
      const text = `${item.data.totalCount} files deleted`;
      return { key, type: 'text', content: { text } };
    } else if (item.status === 'FAILED') {
      const text =
        item.data.totalCount > 0
          ? `${item.data.deletedCount}/${item.data.totalCount} files (failed)`
          : 'Failed';
      return { key, type: 'text', content: { text } };
    } else {
      const text =
        item.data.totalCount > 0
          ? `${item.data.totalCount} files`
          : 'Calculating...';
      return { key, type: 'text', content: { text } };
    }
  }

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
