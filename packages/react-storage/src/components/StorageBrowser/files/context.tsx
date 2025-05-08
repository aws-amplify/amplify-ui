import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { filesReducer } from './filesReducer';
import type {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
} from './types';
import { DEFAULT_STATE, parseFileSelectParams, validateFiles } from './utils';

const defaultValue: FilesContextType = [DEFAULT_STATE, noop];
export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

export function FilesProvider({
  children,
}: FilesProviderProps): React.JSX.Element {
  const [items, dispatch] = React.useReducer(filesReducer, DEFAULT_STATE);

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    const { validFiles, invalidFiles } = validateFiles(nextFiles);
    dispatch({
      type: 'ADD_FILE_ITEMS',
      files: validFiles,
      invalidFiles,
    });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else if (action.type === 'ADD_FILE_ITEMS') {
        const { validFiles, invalidFiles } = validateFiles(action.files);
        dispatch({
          type: 'ADD_FILE_ITEMS',
          files: validFiles,
          invalidFiles,
        });
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
