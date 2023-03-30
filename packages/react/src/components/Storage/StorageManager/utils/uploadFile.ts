import { Storage } from 'aws-amplify';
import type { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

interface UploadFileProps {
  file: File;
  fileName: string;
  level: StorageAccessLevel;
  isResumable?: boolean;
  progressCallback: (progress: { loaded: number; total: number }) => void;
  errorCallback: (error: string) => void;
  completeCallback: (event: { key?: string }) => void;
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
      resumable: true,
      progressCallback,
      errorCallback,
      completeCallback,
      contentType,
      /**
       * This type cast is required because storage _S3ProviderPutConfig['provider']
       * type only allows `AWSS3` which is not accurate.
       * https://github.com/aws-amplify/amplify-js/blob/main/packages/storage/src/types/AWSS3Provider.ts#L59
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      provider: provider as unknown as any,
      ...rest,
    });
  } else {
    return Storage.put(fileName, file, {
      level,
      resumable: false,
      progressCallback,
      contentType,
      provider,
      ...rest,
    }).then(completeCallback, errorCallback);
  }
}
