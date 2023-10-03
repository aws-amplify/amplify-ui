import { StorageAccessLevel } from '@aws-amplify/core';
import {
  uploadData,
  TransferProgressEvent,
  UploadDataInput,
  UploadDataOutput,
} from '@aws-amplify/storage';

export type UploadFileProps = {
  file: File;
  key: string;
  level: StorageAccessLevel;
  progressCallback: (event: TransferProgressEvent) => void;
  errorCallback: (error: string) => void;
  completeCallback: (event: { key: string | undefined }) => void;
} & Record<string, any>;

export function uploadFile({
  file,
  key,
  level = 'private',
  progressCallback,
  errorCallback,
  completeCallback,
}: UploadFileProps): UploadDataOutput {
  const contentType = file.type || 'binary/octet-stream';

  const input: UploadDataInput = {
    key,
    data: file,
    options: {
      accessLevel: level,
      contentType,
      onProgress: ({ transferredBytes, totalBytes }) =>
        progressCallback({ transferredBytes, totalBytes }),
    },
  };
  const output = uploadData(input);

  output.result.then(() => {
    if (output.state === 'SUCCESS') {
      completeCallback?.({ key });
    }

    if (output.state === 'ERROR') {
      errorCallback?.(key);
    }

    return output;
  });

  return output;
}
