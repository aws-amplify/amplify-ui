import React from 'react';

import { isString, isUndefined } from '@aws-amplify/ui';
import { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import { SelectionType } from '../../../actions/configs';

import { FileItems, FilesActionType } from './types';

export const resolveFiles = (
  prevItems: FileItems,
  files: File[] | undefined
): FileItems => {
  if (!files?.length) return prevItems;

  // construct `nextItems` and filter out existing `file` entries
  const nextItems = files.reduce(
    (items: FileItems, file) =>
      prevItems.some(
        ({ item: { name, webkitRelativePath } }) =>
          name === file.name && webkitRelativePath === file.webkitRelativePath
      )
        ? items
        : [...items, { key: file.name, id: crypto.randomUUID(), item: file }],
    []
  );

  if (!nextItems.length) return prevItems;

  if (!prevItems.length) return nextItems;

  return [...prevItems, ...nextItems];
};

export const filesReducer: React.Reducer<FileItems, FilesActionType> = (
  prevItems,
  input
) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      return resolveFiles(prevItems, input.files);
    }
    case 'REMOVE_FILE_ITEM': {
      return prevItems.filter(({ id }) => id !== input.id);
    }
    case 'RESET': {
      return [];
    }
  }
};

export const parseFileSelectParams = (
  value?: SelectionType
): Parameters<HandleFileSelect> => {
  if (isUndefined(value)) return ['FILE', undefined];
  if (isString(value)) return [value, undefined];

  const [selectType, ...rest] = value;
  return [selectType, !rest?.length ? undefined : { accept: rest.join() }];
};
