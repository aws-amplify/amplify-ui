import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { DEFAULT_STATE } from './constants';
import { filesReducer } from './filesReducer';
import { resolveFiles } from './resolveFiles';
import type {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
} from './types';
import { parseFileSelectParams } from './utils';

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
    const { valid: files, invalid: invalidFiles } = resolveFiles(nextFiles);
    dispatch({ type: 'ADD_FILE_ITEMS', files, invalidFiles });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else if (action.type === 'ADD_FILE_ITEMS') {
        const { valid: files, invalid: invalidFiles } = resolveFiles(
          action.files
        );
        dispatch({ type: 'ADD_FILE_ITEMS', files, invalidFiles });
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
