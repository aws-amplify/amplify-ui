import React from 'react';
import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';
import { useProcessTasks } from '../../../tasks';
import { DEFAULT_OVERWRITE_PROTECTION } from '../constants';
import { uploadHandler } from '../../../actions';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { isFunction, isUndefined } from '@aws-amplify/ui';
import { getActionViewDisabledButtons, getAllTasksStatus } from '../utils';
import { UseActionView } from './types';

interface UseUploadView extends UseActionView {
  isOverwriteDisabled: boolean;
  isSelectFilesDisabled: boolean;
  preventOverwrite: boolean;
  onDropFiles: (files?: File[]) => void;
  onSelectFiles: (type?: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
}

export const useUploadView = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): UseUploadView => {
  const getInput = useGetActionInput();
  const [{ files, history }, dispatchStoreAction] = useStore();
  const { prefix } = history?.current ?? {};

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
      prefix,
      options: { preventOverwrite },
    });
  }, [handleProcess, prefix, preventOverwrite, getInput, hasInvalidPrefix]);

  const onActionCancel = React.useCallback(() => {
    tasks.forEach((task) => task.cancel?.());
  }, [tasks]);

  const onClose = React.useCallback(() => {
    if (isFunction(_onClose)) _onClose?.();
    // clear tasks state
    tasks.forEach(({ remove }) => remove());
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
  }, [tasks, dispatchStoreAction, _onClose]);

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
    onClose,
    onActionStart,
    onActionCancel,
    onSelectFiles,
  };
};
