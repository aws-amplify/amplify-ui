import React from 'react';

import { isString, isUndefined, noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import {
  HandleFileSelect,
  useFileSelect,
} from '@aws-amplify/ui-react/internal';

import { SelectionType } from '../../../actions/configs';

type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'RESET' };

type HandleFilesAction = (
  input:
    | FilesActionType
    | { type: 'SELECT_FILES'; selectionType?: SelectionType }
) => void;

export interface FileItem {
  id: string;
  key: string;
  item: File;
}

type FileItems = FileItem[];

export type FilesContextType = [FileItems | undefined, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}

const defaultValue: FilesContextType = [undefined, noop];
export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

const exclude = (items: FileItems, target: FileItem) =>
  items.some(({ id }) => id === target.id);

const resolveFiles = (
  prevItems: FileItems,
  files: File[] | undefined
): FileItems => {
  if (!files?.length) return prevItems;

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

  return [...prevItems, ...nextItems].reduce(
    (items: FileItems, next) =>
      exclude(items, next) ? items : [...items, next],
    []
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
      return prevItems.filter(({ id }) => id !== input.id);
    }
    case 'RESET': {
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
}: FilesProviderProps): React.JSX.Element {
  const [items, dispatch] = React.useReducer(filesReducer, []);

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    dispatch({ type: 'ADD_FILE_ITEMS', files: nextFiles });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else {
        dispatch(action);
      }
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
