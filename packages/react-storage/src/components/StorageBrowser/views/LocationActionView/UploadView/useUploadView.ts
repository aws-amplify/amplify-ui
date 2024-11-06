import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { useProcessTasks } from '../../../tasks';
import { DEFAULT_OVERWRITE_ENABLED } from '../constants';
import { LocationData, uploadHandler } from '../../../actions';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { getActionViewDisabledButtons } from '../utils';
import { UploadViewState } from './types';

export const useUploadView = ({
  onExit: _onExit,
}: {
  onExit?: (location: LocationData) => void;
}): UploadViewState => {
  const getInput = useGetActionInput();
  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current, key: destinationPrefix } = location;

  const [isOverwriteEnabled, setOverwriteEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const [{ isProcessing, isProcessingComplete, tasks }, handleProcess] =
    useProcessTasks(uploadHandler, files, {
      concurrency: 4,
    });

  const taskCounts = React.useMemo(() => getTaskCounts(tasks), [tasks]);
  const { disableCancel, disableStart, disableClose } =
    getActionViewDisabledButtons(taskCounts);

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
      options: { preventOverwrite: isOverwriteEnabled },
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
    disableCancel,
    disableClose,
    disableStart,
    isOverwriteEnabled,
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onDropFiles,
    onExit,
    onSelectFiles,
    onToggleOverwrite,
    taskCounts,
    tasks,
  };
};
