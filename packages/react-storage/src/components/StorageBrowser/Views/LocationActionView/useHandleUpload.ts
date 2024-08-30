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
  handleCancel: () => void,
] {
  const getConfig = useGetLocationConfig();

  const [tasks, setTasks] = React.useState<CancelableTask[]>(() => []);
  const tasksRef = React.useRef<CancelableTask[]>(tasks);

  React.useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

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

  const handleUpload = async () => {
    let currentIndex = 0;

    // Update tasks to be in QUEUED state
    // the 'cancel' property will update the the state so the task
    // has status 'CANCELED' and its 'cancel' property is undefined
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        status: 'QUEUED',
        cancel: () =>
          setTasks((prevTasks) =>
            updateTasks(prevTasks, {
              key: task.key,
              status: 'CANCELED',
              cancel: undefined,
            })
          ),
      }))
    );

    const uploadNext = async () => {
      const currentTasks = tasksRef.current;

      if (currentIndex >= currentTasks.length) {
        return;
      }

      const queuedTask = currentTasks[currentIndex];

      if (queuedTask.status === 'CANCELED') {
        currentIndex++;

        uploadNext();

        return;
      }

      const pendingTask = processUpload(queuedTask);

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

  const handleCancel = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.status === 'COMPLETE' || task.progress === 1) {
          return task;
        } else if (task.status === 'PENDING') {
          if (task.cancel && typeof task.cancel === 'function') {
            // Need to call cancel on all pending tasks if it's cancellable
            task.cancel();
          } else {
            // Uploads with size less than 5MB are not cancellable
            return task;
          }
        }

        // Calling `cancel` above should've updated the state in our try/catch
        // but returning the updated state here since we are mapping over the tasks
        return {
          ...task,
          status: 'CANCELED',
          cancel: undefined,
        };
      })
    );
  };

  return [tasks, handleUpload, handleFileSelect, handleCancel];
}
