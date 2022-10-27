import { Storage } from 'aws-amplify';
import { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

export function getFileName(
  file: File,
  fileName: string[],
  index: number
): string {
  // stub
  return '';
}

export function uploadFile({
  file,
  fileName,
  level = 'private',
  index,
}: {
  file: File;
  fileName: string;
  level: StorageAccessLevel;
  index: number;
}): UploadTask {
  // stub
  return;
}
