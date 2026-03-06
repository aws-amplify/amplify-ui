import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { DEFAULT_STATE } from './constants';
import { fileItemsReducer } from './fileItemsReducer';
import type {
  FileItemsContextType,
  FileItemsProviderProps,
  HandleFileItemsAction,
} from './types';
import {
  parseFileSelectParams,
  resolveFiles
} from './utils';

const defaultValue: FileItemsContextType = [DEFAULT_STATE, noop];
export const { FileItemsContext, useFileItems } = createContextUtilities({
  contextName: 'FileItems',
  defaultValue,
});

export function FileItemsProvider({
  children,
  validateFile,
}: FileItemsProviderProps): React.JSX.Element {
  const [state, dispatch] = React.useReducer(fileItemsReducer, DEFAULT_STATE);

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    dispatch({
      type: 'ADD_FILE_ITEMS',
      ...resolveFiles(nextFiles, validateFile),
    });
  });

  const handleFilesAction: HandleFileItemsAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else if (action.type === 'ADD_FILES') {
        dispatch({
          type: 'ADD_FILE_ITEMS',
          ...resolveFiles(action.files, validateFile),
        });
      } else {
        dispatch(action);
      }
    },
    [handleFileSelect, validateFile]
  );

  const value: FileItemsContextType = React.useMemo(
    () => [state, handleFilesAction],
    [state, handleFilesAction]
  );

  return (
    <FileItemsContext.Provider value={value}>
      {fileInput}
      {children}
    </FileItemsContext.Provider>
  );
}
