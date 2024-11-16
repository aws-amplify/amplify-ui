import React from 'react';

import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import { SelectionType } from '../../../actions/configs';
// FIXME move to closer constant file.
import { UPLOAD_FILE_SIZE_LIMIT } from '../../../views/LocationActionView/constants';

import { FileItem, FileItemsState, FilesActionType } from './types';

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

const isValidFile = (file: File) => file.size <= UPLOAD_FILE_SIZE_LIMIT;

const isSameFiles = (prev: File, next: File) =>
  prev.name === next.name &&
  prev.webkitRelativePath === next.webkitRelativePath;

const generateFileItem = (file: File): FileItem => ({
  key: isEmpty(file.webkitRelativePath) ? file.name : file.webkitRelativePath,
  id: crypto.randomUUID(),
  file,
});

export const resolveFiles = (
  prevItems: FileItemsState,
  files: File[] | undefined
): FileItemsState => {
  if (!files?.length) return prevItems;

  const { validFiles: prevValidFiles, invalidFiles: prevInvalidFiles } =
    prevItems;

  const nextValidFiles = files
    .filter(isValidFile)
    .filter(
      (file) =>
        !prevValidFiles.some(({ file: existing }) =>
          isSameFiles(existing, file)
        )
    )
    .map(generateFileItem);

  const nextInvalidFiles = files
    .filter((file) => !isValidFile(file))
    .filter(
      (file) =>
        !prevInvalidFiles.some(({ file: existing }) =>
          isSameFiles(existing, file)
        )
    )
    .map(generateFileItem);

  if (!prevValidFiles.length) {
    nextValidFiles.sort(compareFileItems);
  }

  if (!prevInvalidFiles.length) {
    nextInvalidFiles.sort(compareFileItems);
  }

  return {
    validFiles: nextValidFiles.length
      ? prevValidFiles.concat(nextValidFiles).sort(compareFileItems)
      : prevValidFiles,
    invalidFiles: nextInvalidFiles.length
      ? prevInvalidFiles.concat(nextInvalidFiles).sort(compareFileItems)
      : prevInvalidFiles,
  };
};

export const filesReducer: React.Reducer<
  FileItemsState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = (prevItems, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      return resolveFiles(prevItems, input.files);
    }
    case 'REMOVE_FILE_ITEM': {
      const filteredValidFiles = prevItems.validFiles.filter(
        ({ id }) => id !== input.id
      );

      return filteredValidFiles.length === prevItems.validFiles.length
        ? prevItems
        : {
            validFiles: filteredValidFiles,
            invalidFiles: prevItems.invalidFiles,
          };
    }
    case 'RESET_FILE_ITEMS': {
      return { validFiles: [], invalidFiles: [] };
    }
    case 'RESET_INVALID_FILE_ITEMS': {
      return { ...prevItems, invalidFiles: [] };
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
