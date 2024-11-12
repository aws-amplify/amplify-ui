import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { LocationData } from '../../../actions';

import { useStore } from '../../../providers/store';

import { useProcessTasks } from '../../../tasks';
import { createFolderHandler } from '../../../actions';
import { useGetActionInput } from '../../../providers/configuration';
import { CreateFolderViewState } from './types';

export const useCreateFolderView = (params?: {
  onExit?: (location: LocationData) => void;
}): CreateFolderViewState => {
  const { onExit } = params ?? {};
  const [folderName, setFolderName] = React.useState('');
  const folderNameId = React.useRef(crypto.randomUUID()).current;

  const getConfig = useGetActionInput();
  const [
    { tasks, isProcessing, isProcessingComplete, statusCounts },
    handleCreateFolder,
  ] = useProcessTasks(createFolderHandler);

  const [{ location }, dipatchStoreAction] = useStore();
  const { current, key: destinationPrefix } = location;

  return {
    folderName,
    folderNameId,
    isProcessing,
    isProcessingComplete,
    location,
    onActionStart: () => {
      handleCreateFolder({
        config: getConfig(),
        data: { id: folderNameId, key: `${folderName}/` },
        destinationPrefix,
        options: { preventOverwrite: true },
      });
    },
    onActionExit: () => {
      if (isFunction(onExit)) onExit(current!);
      tasks?.forEach((task) => task.remove());
      dipatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    },
    onFolderNameChange: (value) => {
      setFolderName(value);
    },
    // needs to be removed
    onTaskCancel: () => null,
    statusCounts,
    tasks,
  };
};
