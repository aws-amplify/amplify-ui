import { FileName } from '../../../../types/storage';
import { Storage } from 'aws-amplify';
import { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

export function getFileName(
  file: File,
  fileName: FileName,
  index: number
): string {
  // stub
  return '';
}

export function uploadFile({
  file,
  fileName,
  level = 'private',
  setPercentage,
  percentage,
  index,
}: {
  file: File;
  fileName: string;
  level: StorageAccessLevel;
  setPercentage: (percentage: Array<number>) => void;
  percentage: Array<number>;
  index: number;
}): UploadTask {
  // stub
  return;
}
