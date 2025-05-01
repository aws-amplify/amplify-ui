import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { CreateFolderHandlerData } from '../../../actions';
import { useAction } from '../../../useAction';
import { useStore } from '../../../store';

import type {
  CreateFolderViewState,
  UseCreateFolderViewOptions,
} from './types';

export const useCreateFolderView = (
  options?: UseCreateFolderViewOptions
): CreateFolderViewState => {
  const { onExit } = options ?? {};
  const [folderName, setFolderName] = React.useState('');
  const folderNameId = React.useRef(crypto.randomUUID()).current;

  const [{ location }, dispatchStoreAction] = useStore();
  const { current, key } = location;

  const data: CreateFolderHandlerData[] = React.useMemo(
    () => [
      {
        // generate new `id` on each `folderName` change to refresh task
        // data provided to `useAction`
        id: crypto.randomUUID(),
        key: `${key}${folderName}/`,
        preventOverwrite: true,
      },
    ],
    [key, folderName]
  );

  const [
    { tasks, isProcessing, isProcessingComplete, statusCounts },
    handleCreateFolder,
  ] = useAction('createFolder', { items: data });

  return {
    folderName,
    folderNameId,
    isProcessing,
    isProcessingComplete,
    location,
    onActionStart: () => {
      handleCreateFolder();
    },
    onActionExit: () => {
      if (isFunction(onExit)) onExit(current);
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    },
    onFolderNameChange: (value) => {
      setFolderName(value.trim());
    },
    statusCounts,
    tasks,
  };
};
