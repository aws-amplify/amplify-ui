import React from 'react';

import { noop } from '@aws-amplify/ui';
import {
  createContextUtilities,
  useDropZone,
} from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
  SelectionType,
} from './types';
import { DEFAULT_STATE, filesReducer, parseFileSelectParams } from './utils';

const defaultValue: FilesContextType = [DEFAULT_STATE, noop];

export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

export function FilesProvider({
  acceptedFileTypes,
  children,
}: FilesProviderProps): React.JSX.Element {
  const [items, dispatch] = React.useReducer(filesReducer, DEFAULT_STATE);

  const [fileInput, handleFileSelect] = useFileSelect((files) => {
    dispatch({ type: 'ADD_FILE_ITEMS', files });
  });

  const handleFilesAction: HandleFilesAction = React.useCallback(
    (action) => {
      if (action.type === 'SELECT_FILES') {
        handleFileSelect(
          ...parseFileSelectParams(action.selectionType, acceptedFileTypes)
        );
      } else {
        dispatch(action);
      }
    },
    [handleFileSelect, acceptedFileTypes]
  );

  const things = useDropZone({
    acceptedFileTypes,
    onDropComplete: ({ acceptedFiles: files, rejectedFiles: invalidFiles }) => {
      dispatch({ type: 'ADD_FILE_ITEMS', files, invalidFiles });
    },
  });

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
