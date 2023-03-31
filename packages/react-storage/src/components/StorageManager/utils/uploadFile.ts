import { Storage } from 'aws-amplify';
import type { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

interface UploadFileProps {
  file: File;
  fileName: string;
  level: StorageAccessLevel;
  isResumable?: boolean;
  progressCallback: (progress: { loaded: number; total: number }) => void;
  errorCallback: (error: string) => void;
  completeCallback: (event: { key: string | undefined }) => void;
  provider?: string;
}

type UploadFile = Promise<void> | UploadTask;

export function uploadFile({
  file,
  fileName,
  level = 'private',
  progressCallback,
  errorCallback,
  completeCallback,
  isResumable = false,
  provider,
  ...rest
}: UploadFileProps): UploadFile {
  const contentType = file.type || 'binary/octet-stream';
  if (isResumable === true) {
    return Storage.put(fileName, file, {
      level,
      resumable: true, // Ensures correct typing for resumable behavior
      progressCallback,
      errorCallback,
      // @ts-ignore
      completeCallback,
      contentType,
      /**
       * This type cast is required because _S3ProviderPutConfig['provider']
       * type only allows `AWSS3` which is not accurate. We cast in order to make
       * TS happy while still allowing a different provider to be used.
       * https://github.com/aws-amplify/amplify-js/blob/main/packages/storage/src/types/AWSS3Provider.ts#L59
       */
      provider: provider as `AWSS3`,
      ...rest,
    });
  } else {
    return Storage.put(fileName, file, {
      level,
      resumable: false,
      progressCallback,
      contentType,
      provider: provider as `AWSS3`,
      ...rest,
    }).then(completeCallback, errorCallback);
  }
}
