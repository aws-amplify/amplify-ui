import React from 'react';

import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { useProcessTasks } from '../../../tasks';
import { DEFAULT_OVERWRITE_PROTECTION } from '../constants';
import { LocationData, uploadHandler } from '../../../actions';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { isFunction, isUndefined } from '@aws-amplify/ui';
import { getActionViewDisabledButtons, getAllTasksStatus } from '../utils';
import { UploadViewState } from './types';

export const useUploadView = ({
  onExit: _onExit,
}: {
  onExit?: (location: LocationData) => void;
}): UploadViewState => {
  const getInput = useGetActionInput();
  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current, key: locationKey } = location;
  const { prefix } = current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);

  const [preventOverwrite, setPreventOverwrite] = React.useState(
    DEFAULT_OVERWRITE_PROTECTION
  );

  const [tasks, handleProcess] = useProcessTasks(uploadHandler, files, {
    concurrency: 4,
  });

  const taskCounts = React.useMemo(() => getTaskCounts(tasks), [tasks]);
  const { disableCancel, disableStart, disableClose } =
    getActionViewDisabledButtons(taskCounts);

  const { hasStarted, hasCompleted } = getAllTasksStatus(taskCounts);

  const isOverwriteDisabled = hasStarted || hasCompleted;
  const isSelectFilesDisabled = hasStarted || hasCompleted;

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
    if (hasInvalidPrefix) return;

    handleProcess({
      config: getInput(),
      prefix: locationKey,
      options: { preventOverwrite },
    });
  }, [
    handleProcess,
    preventOverwrite,
    getInput,
    hasInvalidPrefix,
    locationKey,
  ]);

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
    setPreventOverwrite((overwrite) => !overwrite);
  }, []);

  return {
    tasks,
    taskCounts,
    disableStart,
    disableCancel,
    disableClose,
    isOverwriteDisabled,
    isSelectFilesDisabled,
    preventOverwrite,
    onToggleOverwrite,
    onDropFiles,
    onExit,
    onActionStart,
    onActionCancel,
    onSelectFiles,
  };
};
