import React from 'react';

import { uploadHandler } from '../../../actions';

import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { Task, useProcessTasks } from '../../../tasks';

import { DEFAULT_ACTION_CONCURRENCY } from '../constants';
import { UploadViewState, UseUploadViewOptions } from './types';
import { DEFAULT_OVERWRITE_ENABLED } from './constants';

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit } = options ?? {};
  const getInput = useGetActionInput();
  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current, key } = location;

  const [isOverwritingEnabled, setObjectOverwriteEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleProcess,
  ] = useProcessTasks(uploadHandler, files, {
    concurrency: DEFAULT_ACTION_CONCURRENCY,
  });

  const onDropFiles = React.useCallback(
    (files: File[]) => {
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
      destinationPrefix: key,
      options: { preventOverwrite: !isOverwritingEnabled },
    });
  }, [isOverwritingEnabled, key, getInput, handleProcess]);

  const onActionCancel = React.useCallback(() => {
    tasks.forEach((task) => task.cancel?.());
  }, [tasks]);

  const onExit = React.useCallback(() => {
    // clear tasks state
    tasks.forEach(({ remove }) => remove());
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  }, [tasks, dispatchStoreAction, _onExit, current]);

  const onToggleOverwrite = React.useCallback(() => {
    setObjectOverwriteEnabled((prev) => !prev);
  }, []);

  const onTaskCancel = React.useCallback(
    (task: Task) => {
      if (isProcessing) {
        task.cancel();
      } else {
        dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id: task.data.id });
        task.remove();
      }
    },
    [isProcessing, dispatchStoreAction]
  );

  return {
    isProcessing,
    isProcessingComplete,
    isOverwritingEnabled,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onDropFiles,
    onExit,
    onSelectFiles,
    onTaskCancel,
    onToggleOverwrite,
  };
};
