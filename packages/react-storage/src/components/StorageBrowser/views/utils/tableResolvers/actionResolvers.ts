import type { WithKey } from '../../../components/types';
import { STATUS_ICONS } from './constants';
import type {
  ActionTableKey,
  ActionTaskTableResolvers,
  GetActionCell,
} from './types';
import {
  getActionCancelCellContent,
  getActionCellFolder,
  getFileSize,
  getFileType,
} from './utils';

/**
 * Generates a unique key for a table cell based on the key and item id
 * @param data Object containing key and item with data.id
 * @returns A string key in the format "key-id"
 */
export const getActionCellKey = <K extends string = ActionTableKey>({
  key,
  item,
}: WithKey<{ item: { data: { id: string } } }, K>): string =>
  `${key}-${item.data.id}`;

export const name: GetActionCell<ActionTaskTableResolvers> = (data) => {
  const key = getActionCellKey(data);

  const { item } = data;
  const text = item.data.fileKey;
  const icon = STATUS_ICONS[item.status];

  return { key, type: 'text', content: { icon, text } };
};

export const folder: GetActionCell<ActionTaskTableResolvers> = (data) => {
  const key = getActionCellKey(data);
  const text = getActionCellFolder(data.item);

  return { key, type: 'text', content: { text } };
};

export const type: GetActionCell<ActionTaskTableResolvers> = (data) => {
  const key = getActionCellKey(data);
  const { fileKey } = data.item.data;

  const text = getFileType(fileKey);

  return { key, type: 'text', content: { text } };
};

export const size: GetActionCell<ActionTaskTableResolvers> = (data) => {
  const key = getActionCellKey(data);
  const { size: value } = data.item.data;
  const displayValue = getFileSize(value);

  return { key, type: 'number', content: { value, displayValue } };
};

export const cancel: GetActionCell<ActionTaskTableResolvers> = (data) => {
  const key = getActionCellKey(data);
  const content = getActionCancelCellContent(data);

  return { key, type: 'button', content };
};
