import {
  uploadData,
  TransferProgressEvent,
  UploadDataOutput,
} from '@aws-amplify/storage';
import { StorageAccessLevel } from '@aws-amplify/core';

export type UploadFileProps = {
  file: File;
  key: string;
  level: StorageAccessLevel;
  progressCallback: (event: TransferProgressEvent) => void;
} & Record<string, any>;

export function uploadFile({
  file,
  key,
  level = 'private',
  progressCallback,
  ...rest
}: UploadFileProps): UploadDataOutput {
  const contentType = file.type || 'binary/octet-stream';

  return uploadData({
    key,
    data: file,

    options: {
      accessLevel: level,
      contentType: contentType,
      onProgress: progressCallback,
      ...rest,
    },
  });
}
