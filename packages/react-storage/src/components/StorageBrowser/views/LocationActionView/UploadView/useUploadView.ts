import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { LocationData, uploadHandler } from '../../../actions';

import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { useProcessTasks } from '../../../tasks';
import { DEFAULT_OVERWRITE_ENABLED } from './constants';
import { UploadViewState } from './types';

export const useUploadView = (params?: {
  onExit?: (location: LocationData) => void;
}): UploadViewState => {
  const { onExit: _onExit } = params ?? {};

  const getInput = useGetActionInput();
  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current, key: destinationPrefix } = location;

  const [isOverwriteEnabled, setOverwriteEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const [processState, handleProcess] = useProcessTasks(uploadHandler, files, {
    concurrency: 4,
  });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const onDropFiles = React.useCallback(
    (files?: File[]) => {
      if (files) {
        dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
      }
    },
    [dispatchStoreAction]
  );

  const onSelectFiles = React.useCallback(
    (type?: 'FILE' | 'FOLDER') => {
      dispatchStoreAction({ type: 'SELECT_FILES', selectionType: type });
    },
    [dispatchStoreAction]
  );

  const onActionStart = React.useCallback(() => {
    handleProcess({
      config: getInput(),
      destinationPrefix,
      options: { preventOverwrite: !isOverwriteEnabled },
    });
  }, [destinationPrefix, getInput, handleProcess, isOverwriteEnabled]);

  const onActionCancel = React.useCallback(() => {
    tasks.forEach((task) => task.cancel?.());
  }, [tasks]);

  const onExit = React.useCallback(() => {
    if (isFunction(_onExit)) _onExit?.(current!);
    // clear tasks state
    tasks.forEach(({ remove }) => remove());
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
  }, [tasks, dispatchStoreAction, _onExit, current]);

  const onToggleOverwrite = React.useCallback(() => {
    setOverwriteEnabled((prev) => !prev);
  }, []);

  return {
    destinationPrefix,
    isOverwriteEnabled,
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onDropFiles,
    onExit,
    onSelectFiles,
    onToggleOverwrite,
    statusCounts,
    tasks,
  };
};
