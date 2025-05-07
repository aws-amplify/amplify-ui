import React from 'react';

import { noop } from '@aws-amplify/ui';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import type {
  FilesContextType,
  FilesProviderProps,
  HandleFilesAction,
} from './types';
import { filesReducer, parseFileSelectParams } from './utils';

const defaultValue: FilesContextType = [undefined, noop];
export const { FilesContext, useFiles } = createContextUtilities({
  contextName: 'Files',
  defaultValue,
});

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
