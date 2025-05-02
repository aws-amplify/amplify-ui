import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { isFileValid } from '../validators';
import { filesReducer } from './filesReducer';
import type {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
} from './types';
import { handleFileValidation, parseFileSelectParams } from './utils';

const defaultValue: FilesContextType = [
  { items: undefined, invalidFiles: undefined },
  noop,
];
export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

export function FilesProvider({
  children,
  onFileValidation,
}: FilesProviderProps): React.JSX.Element {
  const [items, dispatch] = React.useReducer(filesReducer, {
    items: [],
    invalidFiles: [],
  });

  const [fileInput, handleFileSelect] = useFileSelect((nextFiles) => {
    const { validFiles, invalidFiles } = handleFileValidation(
      nextFiles,
      onFileValidation ?? isFileValid
    );
    dispatch({
      type: 'ADD_FILE_ITEMS',
      files: validFiles,
      invalidFiles: invalidFiles,
    });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(...parseFileSelectParams(action.selectionType));
      } else if (action.type === 'ADD_FILE_ITEMS') {
        const { validFiles, invalidFiles } = handleFileValidation(
          action.files,
          onFileValidation ?? isFileValid
        );
        dispatch({
          type: 'ADD_FILE_ITEMS',
          files: validFiles,
          invalidFiles: invalidFiles,
        });
      } else {
        dispatch(action);
      }
    },
    [handleFileSelect, onFileValidation]
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
