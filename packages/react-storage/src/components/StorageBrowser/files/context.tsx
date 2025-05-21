import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { DEFAULT_STATE } from './constants';
import { filesReducer } from './filesReducer';
import type {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
} from './types';
import {
  defaultFileSizeValidator,
  parseFileSelectParams,
  resolveFiles,
} from './utils';

const defaultValue: FilesContextType = [DEFAULT_STATE, noop];
export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

export function FilesProvider({
  children,
}: FilesProviderProps): React.JSX.Element {
  const [state, dispatch] = React.useReducer(filesReducer, DEFAULT_STATE);

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    dispatch({
      type: 'ADD_FILE_ITEMS',
      ...resolveFiles(nextFiles, defaultFileSizeValidator),
    });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else if (action.type === 'ADD_FILES') {
        dispatch({
          type: 'ADD_FILE_ITEMS',
          ...resolveFiles(action.files, defaultFileSizeValidator),
        });
      } else {
        dispatch(action);
      }
    },
    [handleFileSelect]
  );

  const value: FilesContextType = React.useMemo(
    () => [state, handleFilesAction],
    [state, handleFilesAction]
  );

  return (
    <FilesContext.Provider value={value}>
      {fileInput}
      {children}
    </FilesContext.Provider>
  );
}
