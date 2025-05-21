import { capitalize, noop } from '@aws-amplify/ui';

import { STATUS_ICONS, STATUS_LABELS } from './constants';
import type {
  ActionTableKey,
  ActionTask,
  ActionTaskTableResolvers,
  GetActionCell,
} from './types';
import {
  CopyViewDisplayText,
  DeleteViewDisplayText,
} from '../../../displayText';
import {
  getActionCancelCellContent,
  getActionCellFolder,
  getFileSize,
  getFileType,
} from './utils';
import { WithKey } from '../../../components';

/**
 * Generates a unique key for a table cell based on the key and item id
 */
export const getActionCellKey = ({
  key,
  item,
}: WithKey<{ item: ActionTask }, ActionTableKey>): string =>
  `${key}-${item.data.id}`;

/**
 * Creates table resolvers for action tasks (copy, delete, etc.)
 *
 * @param actionType - The type of action ('copy' or 'delete')
 * @param isActionDisplayTextKey - Function to check if a key is valid for the display text
 * @returns ActionTaskTableResolvers for the specified action type
 */
export const createActionResolvers = (
  actionType: 'copy' | 'delete',
  isActionDisplayTextKey: (
    value: string
  ) => value is keyof CopyViewDisplayText | keyof DeleteViewDisplayText
): ActionTaskTableResolvers => {
  const name: GetActionCell = (data) => {
    const key = getActionCellKey(data);

    const { item } = data;
    const text = item.data.fileKey;
    const icon = STATUS_ICONS[item.status];

    return { key, type: 'text', content: { icon, text } };
  };

  const folder: GetActionCell = (data) => {
    const key = getActionCellKey(data);
    const text = getActionCellFolder(data.item);

    return { key, type: 'text', content: { text } };
  };

  const type: GetActionCell = (data) => {
    const key = getActionCellKey(data);
    const { fileKey } = data.item.data;

    const text = getFileType(fileKey);

    return { key, type: 'text', content: { text } };
  };

  const size: GetActionCell = (data) => {
    const key = getActionCellKey(data);
    const { size: value } = data.item.data;
    const displayValue = getFileSize(value);

    return { key, type: 'number', content: { value, displayValue } };
  };

  const cancel: GetActionCell = (data) => {
    const key = getActionCellKey(data);
    const content = getActionCancelCellContent(data);

    return { key, type: 'button', content };
  };

  const status: GetActionCell = (data) => {
    const key = getActionCellKey(data);
    const {
      item: { status },
      props: { displayText },
    } = data;

    const statusLabelKey = STATUS_LABELS[status];

    const text = isActionDisplayTextKey(statusLabelKey)
      ? displayText[statusLabelKey]
      : '';

    return { key, type: 'text', content: { text } };
  };

  const CELL_RESOLVERS = {
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

  return {
    getCell: (data) => {
      const isValidKey = (key: string): key is keyof typeof CELL_RESOLVERS => {
        return key in CELL_RESOLVERS;
      };

      if (isValidKey(data.key)) {
        return CELL_RESOLVERS[data.key](data);
      }

      throw new Error(
        `Unexpected key for ${actionType} resolvers: ${data.key}`
      );
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
};
