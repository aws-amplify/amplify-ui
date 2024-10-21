import React from 'react';
import { isCancelError } from 'aws-amplify/storage';
import { uploadData, UploadDataInput } from '../../storage-internal';
import { isFunction, isUndefined } from '@aws-amplify/ui';

import { useGetLocationConfig } from '../../context/config';
import { TaskStatus } from '../../context/types';

// 5MB for multipart upload
// https://github.com/aws-amplify/amplify-js/blob/1a5366d113c9af4ce994168653df3aadb142c581/packages/storage/src/providers/s3/utils/constants.ts#L16
export const MULTIPART_UPLOAD_THRESHOLD_BYTES = 5 * 1024 * 1024;

/**
 * Base `task`
 */
interface Task {
  key: string;
  data: File;
  progress: number;
  size: number;
  status: TaskStatus;
}

export interface CancelableTask extends Omit<Task, 'status'> {
  cancel: (() => void) | undefined;
  status: TaskStatus | 'CANCELED';
}

interface TaskUpdate extends Partial<CancelableTask> {
  key: string;
}

const getFileKey = (file: File) => {
  const { name, webkitRelativePath } = file;

  return webkitRelativePath?.length > 0 ? webkitRelativePath : name;
};

const removeTask = <T extends Task | CancelableTask>(
  tasks: T[],
  key: string
): T[] => {
  const index = tasks.findIndex(({ key: itemKey }) => key === itemKey);

  if (index === -1) {
    return tasks;
  }

  if (index === 0) {
    return tasks.slice(1);
  }

  if (index === tasks.length) {
    return tasks.slice(-1);
  }

  return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
};

const updateTasks = <T extends Task | CancelableTask>(
  tasks: T[],
  task: TaskUpdate
): T[] => {
  const index = tasks.findIndex(({ key }) => key === task.key);
  const updatedTask = { ...tasks[index], ...task };

  if (index === 0) {
    return [updatedTask, ...tasks.slice(1)];
  }

  if (index === tasks.length) {
    return [...tasks.slice(-1), updatedTask];
  }

  return [...tasks.slice(0, index), updatedTask, ...tasks.slice(index + 1)];
};

const mergeSelectedTasks = (
  prevTasks: CancelableTask[],
  newTasks: CancelableTask[]
): CancelableTask[] => {
  const tasks: CancelableTask[] = [];
  const tasksSet = new Set<string>();

  // Add new tasks so they appear on the top of the table
  newTasks.forEach((file) => {
    tasks.push(file);
    tasksSet.add(file.key);
  });

  // Add back any of the older tasks that we previously had
  prevTasks.forEach((file) => {
    if (!tasksSet.has(file.key)) {
      tasks.push(file);
    }
  });

  return tasks;
};

export function useHandleUpload({
  prefix,
  preventOverwrite,
}: {
  prefix: string | undefined;
  preventOverwrite: boolean;
}): [
  tasks: CancelableTask[],
  handleUpload: () => void,
  handleFileSelect: (files: File[]) => void,
  handleCancel: () => void,
] {
  const getConfig = useGetLocationConfig();

  const [tasks, setTasks] = React.useState<CancelableTask[]>(() => []);

  const handleFileSelect = (newFiles: File[]) => {
    setTasks((prevTasks) => {
      // iterate over new files and create new tasks
      const newTasks = newFiles.map((file) => {
        const key = getFileKey(file);

        return {
          cancel: () => {
            setTasks((prev) => removeTask(prev, key));
          },
          key,
          data: file,
          size: file.size,
          status: 'INITIAL' as const,
          progress: 0,
        };
      });

      return mergeSelectedTasks(prevTasks, newTasks);
    });
  };

  const processUpload = React.useCallback(
    async (_task?: CancelableTask) => {
      const task = _task ?? tasks.find(({ status }) => status === 'INITIAL');

      if (!task || isUndefined(prefix)) return;

      const { key, data } = task;
      const {
        accountId,
        bucket: bucketName,
        credentialsProvider,
        region,
      } = getConfig();

      const input: UploadDataInput = {
        path: `${prefix}${key}`,
        data,
        options: {
          bucket: { bucketName, region },
          expectedBucketOwner: accountId,
          locationCredentialsProvider: credentialsProvider,
          onProgress: ({ totalBytes, transferredBytes }) => {
            const progress = totalBytes ? transferredBytes / totalBytes : 0;
            const nextTask: TaskUpdate = {
              key,
              progress,
              ...(totalBytes === transferredBytes
                ? { cancel: undefined }
                : undefined),
            };
            setTasks((curr) => updateTasks(curr, nextTask));
          },
          preventOverwrite,
        },
      };

      try {
        const { cancel: _cancel, result } = uploadData(input);

        const cancel =
          task.size < MULTIPART_UPLOAD_THRESHOLD_BYTES ? undefined : _cancel;

        setTasks((prevTasks) =>
          prevTasks.map(({ key: _key, status, ...rest }) => {
            const isCurrent = _key === key;
            if (isCurrent) {
              return { ...rest, key, status: 'PENDING', cancel };
            }

            const isInitial = status === 'INITIAL';

            if (isInitial) {
              return {
                ...rest,
                key: _key,
                status: 'QUEUED',
                cancel: () =>
                  setTasks((prev) =>
                    updateTasks(prev, {
                      key: _key,
                      cancel: undefined,
                      status: 'CANCELED',
                    })
                  ),
              };
            }

            return { ...rest, key: _key, status };
          })
        );

        await result;

        setTasks((prevTasks) =>
          updateTasks(prevTasks, { key, cancel: undefined, status: 'COMPLETE' })
        );
      } catch (error) {
        const status = isCancelError(error) ? 'CANCELED' : 'FAILED';

        setTasks((prevTasks) =>
          updateTasks(prevTasks, { key, cancel: undefined, status })
        );
      }
    },
    [getConfig, tasks, prefix, preventOverwrite]
  );

  React.useEffect(() => {
    const hasStarted = tasks.some(({ status }) => status !== 'INITIAL');
    const hasPendingTask = tasks.some(({ status }) => status === 'PENDING');

    if (hasPendingTask || !hasStarted) return;

    const nextTask = tasks.find(({ status }) => status === 'QUEUED');

    if (!nextTask) return;

    processUpload(nextTask);
  }, [processUpload, tasks]);

  const handleCancelAll = () => {
    tasks.forEach(({ cancel }) => (isFunction(cancel) ? cancel() : undefined));
  };

  return [tasks, () => processUpload(), handleFileSelect, handleCancelAll];
}
