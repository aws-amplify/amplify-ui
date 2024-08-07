import React from 'react';
import { uploadData, UploadDataWithPathInput } from 'aws-amplify/storage';

import { useGetLocationConfig } from '../../context/config';
import { FileItem } from '../../context/types';

type TaskStatus = 'INITIAL' | 'QUEUED' | 'IN_PROGRESS' | 'SUCCESS' | 'ERROR';

/**
 * Base `task`
 */
interface Task {
  key: string;
  data: File;
  message: string | undefined;
  progress: number;
  status: TaskStatus;
}

interface CancelableTask extends Omit<Task, 'status'> {
  cancel: (() => void) | undefined;
  status: TaskStatus | 'CANCELED';
}

interface TaskUpdate extends Partial<CancelableTask> {
  key: string;
}

const removeTask = <T extends Task | CancelableTask>(
  tasks: T[],
  key: string
): T[] => {
  const index = tasks.findIndex(({ key: itemKey }) => key === itemKey);

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

export function useHandleUpload({
  prefix,
  items,
}: {
  prefix: string;
  items: FileItem[];
}): [tasks: CancelableTask[], handleUpload: () => void] {
  const getConfig = useGetLocationConfig();
  const [tasks, setTasks] = React.useState<CancelableTask[]>(() =>
    (items ?? []).map(({ key, data }) => ({
      cancel: () => setTasks((prev) => removeTask(prev, key)),
      key,
      data: data!,
      status: 'INITIAL',
      message: undefined,
      progress: 0,
    }))
  );

  const handleUpload = () =>
    setTasks((prevTasks) =>
      prevTasks.map(({ data, key, message, progress }) => {
        const { bucket: bucketName, credentialsProvider, region } = getConfig();
        const input: UploadDataWithPathInput = {
          path: `${prefix}${key}`,
          data,
          options: {
            bucket: { bucketName, region },
            locationCredentialsProvider: credentialsProvider,
            onProgress: ({ totalBytes, transferredBytes }) => {
              const nextTask: TaskUpdate = {
                key,
                progress: totalBytes ? transferredBytes / totalBytes : 0,
                ...(totalBytes === transferredBytes
                  ? { cancel: undefined }
                  : undefined),
              };
              setTasks((curr) => updateTasks(curr, nextTask));
            },
          },
        };

        const { cancel, result } = uploadData(input);

        result.then(() => {
          setTasks((curr) => updateTasks(curr, { key, status: 'SUCCESS' }));
        });

        const handleCancel = () => {
          cancel();

          setTasks((curr) =>
            updateTasks(curr, {
              key,
              cancel: undefined,
              status: 'CANCELED',
            })
          );
        };

        return {
          key,
          cancel: handleCancel,
          data,
          message,
          progress,
          status: 'IN_PROGRESS',
        };
      })
    );

  return [tasks, handleUpload];
}
