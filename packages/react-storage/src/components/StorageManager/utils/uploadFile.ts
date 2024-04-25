import { StorageAccessLevel } from '@aws-amplify/core';
import {
  uploadData,
  TransferProgressEvent,
  UploadDataInput,
  UploadDataOutput,
  UploadDataWithPathInput,
  UploadDataWithPathOutput,
} from 'aws-amplify/storage';

export type UploadFileProps = {
  file: File;
  key: string;
  path: string;
  level?: StorageAccessLevel;
  progressCallback: (event: TransferProgressEvent) => void;
  errorCallback: (error: string) => void;
  completeCallback: (event: { key: string | undefined }) => void;
} & Record<string, any>;

type UploadData = (
  input: UploadDataInput | UploadDataWithPathInput
) => UploadDataOutput | UploadDataWithPathOutput;

export function uploadFile({
  file,
  key,
  path,
  level,
  progressCallback: onProgress,
  errorCallback,
  completeCallback,
  ...rest
}: UploadFileProps): UploadDataOutput | UploadDataWithPathOutput {
  const contentType = file.type || 'binary/octet-stream';

  const input: UploadDataInput | UploadDataWithPathInput = level
    ? {
        // key will be deprecated in aws-amplify@v7
        key,
        data: file,
        options: {
          accessLevel: level,
          contentType,
          onProgress,
          ...rest,
        },
      }
    : {
        path,
        data: file,
        options: {
          contentType,
          onProgress,
          ...rest,
        },
      };

  const output = (uploadData as UploadData)(input);

  output.result
    .then(() => {
      if (output.state === 'SUCCESS') {
        completeCallback?.({ key });
      }
    })
    .catch((e) => {
      const error = e as Error;
      errorCallback?.(error.message);
    });
  return output;
}
