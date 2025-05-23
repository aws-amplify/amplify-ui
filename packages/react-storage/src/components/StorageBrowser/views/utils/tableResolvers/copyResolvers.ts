import { capitalize, noop } from '@aws-amplify/ui';

import { isCopyViewDisplayTextKey } from '../../../displayText';

import { STATUS_LABELS } from './constants';
import type { FileDataTaskTableResolvers, GetActionCell } from './types';
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

  const text = isCopyViewDisplayTextKey(statusLabelKey)
    ? displayText[statusLabelKey]
    : '';

  return { key, type: 'text', content: { text } };
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
  progress: noop as GetActionCell,
};

export const COPY_TABLE_RESOLVERS: FileDataTaskTableResolvers = {
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
