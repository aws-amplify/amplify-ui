import React from 'react';
import { uploadData, UploadDataWithPathInput } from 'aws-amplify/storage';

import { useGetLocationConfig } from '../../context/config';
import { TaskStatus } from '../../context/types';

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
  files,
}: {
  prefix: string;
  files: File[];
}): [tasks: CancelableTask[], handleUpload: () => void] {
  const getConfig = useGetLocationConfig();

  const [tasks, setTasks] = React.useState<CancelableTask[]>(() => []);

  React.useEffect(() => {
    const nextTasks = files.map((file) => ({
      cancel: () => setTasks((prev) => removeTask(prev, file.name)),
      key: file.name,
      data: file,
      size: file.size,
      status: 'INITIAL' as const,
      progress: 0,
    }));
    setTasks(nextTasks);
  }, [files]);

  const handleUpload = () =>
    setTasks((prevTasks) =>
      prevTasks.map(({ key, data, progress, size }) => {
        const { bucket: bucketName, credentialsProvider, region } = getConfig();
        const input: UploadDataWithPathInput = {
          path: `${prefix}${key}`,
          data,
          options: {
            bucket: { bucketName, region },
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
          },
        };

        const { cancel, result } = uploadData(input);

        result
          .then(() => {
            setTasks((curr) => updateTasks(curr, { key, status: 'COMPLETE' }));
          })
          .catch(() => {
            setTasks((curr) => updateTasks(curr, { key, status: 'FAILED' }));
          });

        const handleCancel = () => {
          cancel();

          setTasks((curr) =>
            // assign cancel to noop
            updateTasks(curr, { key, cancel: () => null, status: 'CANCELED' })
          );
        };

        return {
          cancel: handleCancel,
          key,
          data,
          progress,
          size,
          status: 'PENDING',
        };
      })
    );

  return [tasks, handleUpload];
}
