import type React from 'react';

import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import type { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import type { FileItem } from '../actions';

import { isFileTooBig } from '../validators';
import type {
  FileItems,
  FileItemsData,
  FilesActionType,
  SelectionType,
} from './types';

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

export const validateFiles = (
  files: File[] | undefined,
  maxUploadFileSize?: number
): { validFiles: File[]; invalidFiles: File[] } =>
  (files ?? []).reduce(
    (curr: { validFiles: File[]; invalidFiles: File[] }, file) => {
      if (isFileTooBig(file, maxUploadFileSize)) {
        curr.invalidFiles = isUndefined(curr.invalidFiles)
          ? [file]
          : curr.invalidFiles.concat(file);
      } else {
        curr.validFiles = isUndefined(curr.validFiles)
          ? [file]
          : curr.validFiles.concat(file);
      }
      return curr;
    },
    { validFiles: [], invalidFiles: [] }
  );

export const resolveFiles = (
  prevItems: FileItems,
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

  if (!prevItems.length) {
    return nextItems.sort(compareFileItems);
  }

  return prevItems.concat(nextItems).sort(compareFileItems);
};

export const filesReducer: React.Reducer<
  FileItemsData,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = (prevItems, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      const nextItems = resolveFiles(prevItems.items, input.files);
      const nextInvalidFiles = resolveFiles(
        prevItems.invalidFiles,
        input.invalidFiles
      );
      return {
        ...prevItems,
        items: nextItems,
        invalidFiles: nextInvalidFiles,
      };
    }
    case 'REMOVE_FILE_ITEM': {
      const filteredItems = prevItems.items.filter(({ id }) => id !== input.id);

      return filteredItems.length === prevItems.items.length
        ? prevItems
        : { ...prevItems, items: filteredItems };
    }
    case 'RESET_FILE_ITEMS': {
      return { items: [], invalidFiles: [] };
    }
    // TODO: clear message
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
