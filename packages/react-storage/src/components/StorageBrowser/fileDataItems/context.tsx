import React from 'react';

import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { noop } from '@aws-amplify/ui';

import type { FileData, FileDataItem } from '../actions';
import { createFileDataItem } from '../actions';

export const DEFAULT_STATE: FileDataItemsState = {
  fileDataItems: undefined,
};

export type FileDataItemsAction =
  | { type: 'SELECT_FILE_DATA_ITEMS'; items?: FileData[] }
  | { type: 'UNSELECT_FILE_DATA_ITEM'; id: string }
  | { type: 'CLEAR_FILE_DATA_ITEMS' };

export interface FileDataItemsState {
  fileDataItems: FileDataItem[] | undefined;
}

export type HandleFileDataItemsAction = (event: FileDataItemsAction) => void;

export type FileDataItemsStateContext = [
  FileDataItemsState,
  HandleFileDataItemsAction,
];

export interface FileDataItemsProviderProps {
  children?: React.ReactNode;
}

const FileDataItemsReducer = (
  prevState: FileDataItemsState,
  event: FileDataItemsAction
): FileDataItemsState => {
  switch (event.type) {
    case 'SELECT_FILE_DATA_ITEMS': {
      const { items } = event;
      if (!items?.length) return prevState;

      if (!prevState.fileDataItems?.length) {
        return { fileDataItems: items.map(createFileDataItem) };
      }

      const nextFileDataItems: FileDataItem[] = items?.reduce(
        (fileDataItems: FileDataItem[], data) =>
          prevState.fileDataItems?.some(({ id }) => id === data.id)
            ? fileDataItems
            : fileDataItems.concat(createFileDataItem(data)),
        []
      );

      if (!nextFileDataItems?.length) return prevState;

      return {
        fileDataItems: prevState.fileDataItems.concat(nextFileDataItems),
      };
    }
    case 'UNSELECT_FILE_DATA_ITEM': {
      const { id } = event;

      if (!prevState.fileDataItems) return prevState;

      const fileDataItems = prevState.fileDataItems.filter(
        (item) => item.id !== id
      );

      if (fileDataItems.length === prevState.fileDataItems.length) {
        return prevState;
      }

      return { fileDataItems };
    }
    case 'CLEAR_FILE_DATA_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};

const defaultValue: FileDataItemsStateContext = [DEFAULT_STATE, noop];
export const { FileDataItemsContext, useFileDataItems } =
  createContextUtilities({ contextName: 'FileDataItems', defaultValue });

export function FileDataItemsProvider({
  children,
}: FileDataItemsProviderProps): React.JSX.Element {
  const value = React.useReducer(FileDataItemsReducer, DEFAULT_STATE);

  return (
    <FileDataItemsContext.Provider value={value}>
      {children}
    </FileDataItemsContext.Provider>
  );
}
