import React from 'react';

import { uploadHandler } from '../../../actions';

import { useGetActionInput } from '../../../providers/configuration';
import { FileItems, useStore } from '../../../providers/store';
import { Task, useProcessTasks } from '../../../tasks';

import { DEFAULT_ACTION_CONCURRENCY } from '../constants';
import { UploadViewState, UseUploadViewOptions } from './types';
import { DEFAULT_OVERWRITE_ENABLED } from './constants';
import { isUndefined } from '@aws-amplify/ui';
import { isFileTooBig } from '../../../validators';

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit } = options ?? {};
  const getInput = useGetActionInput();
  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current, key } = location;

  const { invalidFiles, validFiles } = React.useMemo(
    () =>
      (files ?? [])?.reduce(
        (curr, file) => {
          if (isFileTooBig(file.file)) {
            curr.invalidFiles = isUndefined(curr.invalidFiles)
              ? [file]
              : curr.invalidFiles.concat(file);
          } else {
            curr.validFiles = isUndefined(curr.validFiles)
              ? [file]
              : curr.validFiles.concat(file);
          }

          return curr;
        },
        {} as {
          invalidFiles: FileItems | undefined;
          validFiles: FileItems | undefined;
        }
      ),
    [files]
  );

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleProcess,
  ] = useProcessTasks(uploadHandler, validFiles, {
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

  const handleResetInvalidFiles = React.useCallback(() => {
    invalidFiles?.forEach((file) => {
      dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id: file.id });
    });
  }, [invalidFiles, dispatchStoreAction]);

  const onActionStart = React.useCallback(() => {
    handleResetInvalidFiles();

    handleProcess({
      config: getInput(),
      destinationPrefix: key,
      options: { preventOverwrite: !isOverwritingEnabled },
    });
  }, [
    isOverwritingEnabled,
    key,
    getInput,
    handleProcess,
    handleResetInvalidFiles,
  ]);

  const onActionCancel = React.useCallback(() => {
    tasks.forEach((task) => task.cancel?.());
  }, [tasks]);

  const onActionExit = React.useCallback(() => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  }, [dispatchStoreAction, _onExit, current]);

  const onToggleOverwrite = React.useCallback(() => {
    setIsOverwritingEnabled((prev) => !prev);
  }, []);

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id: data.id });
    },
    [dispatchStoreAction]
  );

  return {
    isProcessing,
    isProcessingComplete,
    isOverwritingEnabled,
    location,
    invalidFiles,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onDropFiles,
    onTaskRemove,
    onSelectFiles,
    onToggleOverwrite,
    handleResetInvalidFiles,
  };
};
