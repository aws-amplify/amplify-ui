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

const removeFile = (files: File[], key: string): File[] => {
  return files.filter((file) => getFileKey(file) !== key);
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

// Helper function to replace files with the same name
const mergeSelectedFiles = (prevFiles: File[], newFiles: File[]): File[] => {
  const files: File[] = [];
  const filesSet = new Set<string>();

  // Add new files so they appear on the top of the table
  newFiles.forEach((file) => {
    const fileKey = getFileKey(file);

    files.push(file);
    filesSet.add(fileKey);
  });

  prevFiles.forEach((file) => {
    const fileKey = getFileKey(file);

    if (!filesSet.has(fileKey)) {
      files.push(file);
    }
  });

  return files;
};

export function useHandleUpload({
  prefix,
  preventOverwrite,
}: {
  prefix: string;
  preventOverwrite: boolean;
}): [
  tasks: CancelableTask[],
  handleUpload: () => void,
  handleFileSelect: (files: File[]) => void,
] {
  const getConfig = useGetLocationConfig();

  const [tasks, setTasks] = React.useState<CancelableTask[]>(() => []);
  const [_, setFiles] = React.useState<File[]>([]);

  const handleFileSelect = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const mergedFiles = mergeSelectedFiles(prevFiles, newFiles);

      const nextTasks = mergedFiles.map((file) => {
        const key = getFileKey(file);

        return {
          cancel: () => {
            setTasks((prev) => removeTask(prev, key));
            setFiles((prev) => removeFile(prev, key));
          },
          key,
          data: file,
          size: file.size,
          status: 'INITIAL' as const,
          progress: 0,
        };
      });

      setTasks(nextTasks);
      return mergedFiles;
    });
  };

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
            preventOverwrite,
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

  return [tasks, handleUpload, handleFileSelect];
}
