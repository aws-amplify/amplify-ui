import React from 'react';

import { isString, isUndefined } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import {
  HandleFileSelect,
  useFileSelect,
} from '@aws-amplify/ui-react/internal';

import { SelectionType } from '../actions/configs';

// @todo add actual error message
const ERROR_MESSAGE = 'Insert meaningful error message here';

type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; key: string }
  | { type: 'RESET_FILE_ITEMS' };

type HandleFilesAction = (
  input:
    | FilesActionType
    | { type: 'SELECT_FILES'; selectionType?: SelectionType }
) => void;

export type FileItem = { key: string; item: File };
type FileItems = FileItem[];

export type FilesContextType = [
  files: FileItems,
  handleFileSelect: HandleFilesAction,
];

export const { FilesContext, useFiles } = createContextUtilities<
  FilesContextType,
  'Files'
>({ contextName: 'Files', errorMessage: ERROR_MESSAGE });

const exclude = (items: FileItems, target: FileItem) =>
  items.some(({ key }) => key === target.key);

const resolveFiles = (
  prevItems: FileItems,
  files: File[] | undefined
): FileItems => {
  if (!files?.length) return prevItems;

  const incomingItems = files.map((file) => ({ key: file.name, item: file }));

  if (!prevItems.length) return incomingItems;

  return [...prevItems, ...incomingItems].reduce(
    (output, next) => (exclude(output, next) ? output : [...output, next]),
    [] as FileItems
  );
};

const filesReducer: React.Reducer<FileItems, FilesActionType> = (
  prevItems,
  input
) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      return resolveFiles(prevItems, input.files);
    }
    case 'REMOVE_FILE_ITEM': {
      return prevItems.filter(({ key }) => key !== input.key);
    }
    case 'RESET_FILE_ITEMS': {
      return [];
    }
  }
};

const parseFileSelectParams = (
  value?: SelectionType
): Parameters<HandleFileSelect> => {
  if (isUndefined(value)) return ['FILE', undefined];
  if (isString(value)) return [value, undefined];

  const [selectType, ...rest] = value;
  return [selectType, isUndefined(rest) ? rest : { accept: rest.join() }];
};

export function FilesProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const [items, dispatch] = React.useReducer(filesReducer, []);

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    dispatch({ type: 'ADD_FILE_ITEMS', files: nextFiles });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
        return;
      }
      return dispatch(action);
    },
    [handleFileSelect]
  );

  const value: FilesContextType = React.useMemo(
    () => [items, handleFilesAction],
    [items, handleFilesAction]
  );

  return (
    <FilesContext.Provider value={value}>
      {fileInput}
      {children}
    </FilesContext.Provider>
  );
}
