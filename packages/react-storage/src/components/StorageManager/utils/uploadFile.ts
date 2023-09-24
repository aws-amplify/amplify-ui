// import { Storage } from '@aws-amplify/storage';
// import type { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';
import { StorageAccessLevel } from '@aws-amplify/core';
import * as Storage from '@aws-amplify/storage';

export type UploadFileProps = {
  file: File;
  key: string;
  level: StorageAccessLevel;
  isResumable?: boolean;
  progressCallback: (progress: { loaded: number; total: number }) => void;
  errorCallback: (error: string) => void;
  completeCallback: (event: { key: string | undefined }) => void;
  provider?: string;
} & Record<string, any>;

export function uploadFile({
  file,
  key,
  level = 'private',
  progressCallback,
  errorCallback,
  completeCallback,
  isResumable: _ = false,
  provider: __,
}: UploadFileProps): Storage.UploadDataOutput {
  const contentType = file.type || 'binary/octet-stream';

  const input: Storage.UploadDataInput = {
    key,
    data: file,
    options: {
      accessLevel: level,
      contentType,
      onProgress: ({ transferredBytes, totalBytes }) =>
        progressCallback({ loaded: transferredBytes, total: totalBytes } as {
          loaded: number;
          total: number;
        }),
    },
  };
  const output = Storage.uploadData(input);

  if (output.state === 'SUCCESS') {
    completeCallback?.({ key });
  }

  if (output.state === 'ERROR') {
    errorCallback?.(key);
  }

  return output;
}
