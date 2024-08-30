import React from 'react';
import {
  uploadData,
  UploadDataWithPathInput,
  isCancelError,
} from 'aws-amplify/storage';

import { useGetLocationConfig } from '../../context/config';
import { TaskStatus } from '../../context/types';

// 5MB for multipart upload
export const MULTIPART_UPLOAD_THRESHOLD_BYTES = 5242880;

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

interface PendingTask {
  task: CancelableTask;
  result: Promise<any>;
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
  batchSize = 6,
}: {
  prefix: string;
  preventOverwrite: boolean;
  batchSize?: number;
}): [
  tasks: CancelableTask[],
  handleUpload: () => void,
  handleFileSelect: (files: File[]) => void,
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

  const processUpload = (task: CancelableTask): PendingTask => {
    const { key, data } = task;
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
        preventOverwrite,
      },
    };

    const { cancel, result } = uploadData(input);

    const cancelFn =
      task.size >= MULTIPART_UPLOAD_THRESHOLD_BYTES
        ? () => cancel()
        : undefined;

    const pendingTask: CancelableTask = {
      ...task,
      status: 'PENDING',
      cancel: cancelFn,
    };

    setTasks((prevTasks) => updateTasks(prevTasks, pendingTask));

    return {
      task: pendingTask,
      result,
    };
  };

  // Help set status to queue and remove the "cancel" property so it
  // doesn't points to the "removeTask" call
  const queueUpload = (task: CancelableTask): CancelableTask => {
    const queuedTask: CancelableTask = {
      ...task,
      status: 'QUEUED',
      cancel: undefined,
    };

    setTasks((prevTasks) => updateTasks(prevTasks, queuedTask));

    return queuedTask;
  };

  const handleUpload = async () => {
    let currentIndex = 0;

    const queuedTasks = tasks.map((task) => queueUpload(task));

    const uploadNext = async () => {
      if (currentIndex >= tasks.length) {
        return;
      }

      const pendingTask = processUpload(queuedTasks[currentIndex]);

      currentIndex++;

      const { task, result } = pendingTask;
      const { key } = task;

      try {
        await result;

        setTasks((prevTasks) =>
          updateTasks(prevTasks, { key, status: 'COMPLETE' })
        );
      } catch (error) {
        setTasks((prevTasks) =>
          updateTasks(prevTasks, {
            key,
            status: isCancelError(error) ? 'CANCELED' : 'FAILED',
            cancel: undefined,
          })
        );
      } finally {
        uploadNext();
      }
    };

    // Start the initial set of uploads
    const initialUploads = Array(batchSize)
      .fill(null)
      .map(() => uploadNext());

    await Promise.all(initialUploads);
  };

  return [tasks, handleUpload, handleFileSelect];
}
