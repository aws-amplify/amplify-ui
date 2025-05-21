import { capitalize, noop } from '@aws-amplify/ui';

import { isDeleteViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS } from './constants';
import type { DeleteTableResolvers, GetActionCell } from './types';
import {
  cancel,
  folder,
  getActionCellKey,
  name,
  size,
  type,
} from './actionResolvers';

const status: GetActionCell = (data) => {
  const key = getActionCellKey(data);
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

const DELETE_CELL_RESOLVERS = {
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
  progress: noop as GetActionCell,
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
