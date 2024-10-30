import React from 'react';
import { useGetActionInput } from '../../providers/configuration';
import { useStore } from '../../providers/store';
import { Task, useProcessTasks } from '../../tasks';
import { DEFAULT_OVERWRITE_PROTECTION } from '../LocationActionView/constants';
import { uploadHandler } from '../../actions';
import { getTaskCounts } from '../../controls/getTaskCounts';
import { isFunction, isUndefined } from '@aws-amplify/ui';

interface UseUploadView {
  tasks: Task<File>[];
  isStartDisabled: boolean;
  // TODO: add from main
  // isDropzoneDisabled: boolean;
  isCancelDisabled: boolean;
  isOverwriteDisabled: boolean;
  isSelectFilesDisabled: boolean;
  overwriteSelection: boolean;
  onDropFiles: (files?: File[]) => void;
  onExit: () => void;
  onProcessStart: () => void;
  onProcessCancel: () => void;
  onSelectFiles: (type?: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
}

export const useUploadView = ({
  onClose,
}: {
  onClose?: () => void;
}): UseUploadView => {
  const getInput = useGetActionInput();
  const [{ files, history }, dispatchStoreAction] = useStore();
  const { prefix } = history?.current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);
  const [overwriteSelection, setOverwriteSelection] = React.useState(
    DEFAULT_OVERWRITE_PROTECTION
  );

  const [tasks, handleProcess] = useProcessTasks(uploadHandler, files, {
    concurrency: 4,
  });

  const taskCounts = React.useMemo(() => getTaskCounts(tasks), [tasks]);

  const hasStarted = !!taskCounts.PENDING;
  const hasCompleted =
    !!taskCounts.TOTAL &&
    taskCounts.CANCELED + taskCounts.COMPLETE + taskCounts.FAILED ===
      taskCounts.TOTAL;

  const disableCancel = !taskCounts.TOTAL || !hasStarted || hasCompleted;
  const disablePrimary = !taskCounts.TOTAL || hasStarted || hasCompleted;
  const disableOverwrite = hasStarted || hasCompleted;
  const disableSelectFiles = hasStarted || hasCompleted;

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

  const onProcessStart = React.useCallback(() => {
    if (hasInvalidPrefix) return;

    handleProcess({
      config: getInput(),
      prefix,
      options: { preventOverwrite: overwriteSelection },
    });
  }, [handleProcess, prefix, overwriteSelection, getInput, hasInvalidPrefix]);

  const onProcessCancel = React.useCallback(() => {
    tasks.forEach((task) => task.cancel?.());
  }, [tasks]);

  const onExit = React.useCallback(() => {
    if (isFunction(onClose)) onClose?.();
    // clear tasks state
    tasks.forEach(({ remove }) => remove());
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
  }, [tasks, dispatchStoreAction, onClose]);

  const onToggleOverwrite = React.useCallback(() => {
    setOverwriteSelection((overwrite) => !overwrite);
  }, []);

  return {
    isStartDisabled: disablePrimary,
    isCancelDisabled: disableCancel,
    isOverwriteDisabled: disableOverwrite,
    isSelectFilesDisabled: disableSelectFiles,
    onDropFiles,
    onExit,
    onProcessStart,
    onProcessCancel,
    onSelectFiles,
    overwriteSelection,
    onToggleOverwrite,
    tasks,
  };
};
