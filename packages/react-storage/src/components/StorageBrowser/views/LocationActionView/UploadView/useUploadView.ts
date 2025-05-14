import React from 'react';
import { isUndefined } from '@aws-amplify/ui';

import type { UploadHandlerData } from '../../../actions';
import type { FileItems } from '../../../files';
import { useFiles } from '../../../files';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';
import { isFileTooBig } from '../../../validators';

import type { UploadViewState, UseUploadViewOptions } from './types';
import { DEFAULT_OVERWRITE_ENABLED } from './constants';

interface FilesData {
  invalidFiles: FileItems | undefined;
  validFiles: FileItems | undefined;
  data: UploadHandlerData[];
}

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ location }, storeDispatch] = useStore();
  const [files, filesDispatch] = useFiles();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const filesData = React.useMemo(
    () =>
      (files ?? [])?.reduce(
        (curr: FilesData, item) => {
          if (isFileTooBig(item.file)) {
            curr.invalidFiles = isUndefined(curr.invalidFiles)
              ? [item]
              : curr.invalidFiles.concat(item);
          } else {
            curr.validFiles = isUndefined(curr.validFiles)
              ? [item]
              : curr.validFiles.concat(item);

            const parsedFileItem = {
              ...item,
              key: `${location.key}${item.key}`,
            };

            curr.data = curr.data.concat({
              ...parsedFileItem,
              preventOverwrite: !isOverwritingEnabled,
            });
          }

          return curr;
        },
        { invalidFiles: undefined, validFiles: undefined, data: [] }
      ),
    [files, isOverwritingEnabled, location.key]
  );

  const { data, invalidFiles } = filesData;

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items: data });

  const onDropFiles = (files: File[]) => {
    if (files) {
      filesDispatch({ type: 'ADD_FILE_ITEMS', files });
    }
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    filesDispatch({ type: 'SELECT_FILES', selectionType: type });
  };

  const onActionStart = () => {
    invalidFiles?.forEach((file) => {
      filesDispatch({ type: 'REMOVE_FILE_ITEM', id: file.id });
    });

    handleUploads();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => task.cancel?.());
  };

  const onActionExit = () => {
    // clear files state
    filesDispatch({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  };

  const onToggleOverwrite = () => {
    setIsOverwritingEnabled((prev) => !prev);
  };

  const onTaskRemove = ({ data }: Task) => {
    filesDispatch({ type: 'REMOVE_FILE_ITEM', id: data.id });
  };

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
  };
};
