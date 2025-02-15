import React from 'react';

import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import {
  FileItem,
  FileItems,
  FileItemsState,
  FilesActionType,
  SelectionType,
} from './types';

export const DEFAULT_STATE: FileItemsState = {
  items: undefined,
  invalidFiles: undefined,
};

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

export const resolveFiles = (
  prevItems: FileItems = [],
  files: File[] | undefined
): FileItems => {
  if (!files?.length) return prevItems;

  // construct `nextItems` and filter out existing `file` entries
  const nextItems = files.reduce((items: FileItems, file) => {
    const { name, webkitRelativePath } = file;

    return prevItems.some(
      ({ file: existing }) =>
        existing.name === name &&
        existing.webkitRelativePath === webkitRelativePath
    )
      ? items
      : items.concat({
          key: isEmpty(webkitRelativePath) ? name : webkitRelativePath,
          id: crypto.randomUUID(),
          file,
        });
  }, []);

  if (!nextItems.length) return prevItems;

  if (!prevItems?.length) {
    return nextItems.sort(compareFileItems);
  }

  return prevItems?.concat(nextItems).sort(compareFileItems);
};

export const filesReducer: React.Reducer<
  FileItemsState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = ({ items: prevItems, invalidFiles }, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      const items = resolveFiles(prevItems, input.files);
      return { items, invalidFiles };
    }
    case 'REMOVE_FILE_ITEM': {
      const filteredItems = prevItems?.filter(({ id }) => id !== input.id);
      const items =
        filteredItems?.length === prevItems?.length ? prevItems : filteredItems;

      return { items, invalidFiles };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};

export const parseFileSelectParams = (
  value?: SelectionType,
  acceptedFileTypes?: string[]
): Parameters<HandleFileSelect> => {
  const accept = acceptedFileTypes ? acceptedFileTypes.join() : '';
  if (isUndefined(value)) return ['FILE', { accept }];
  if (isString(value)) return [value, { accept }];

  const [selectType, ..._rest] = value;
  return [selectType, { accept }];
};
