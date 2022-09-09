import { FileName } from '../../FileUploader/types';
import { Storage } from 'aws-amplify';
import { StorageAccessLevel } from '@aws-amplify/storage';

export function getFileName(
  file: File,
  fileName: FileName,
  index: number
): string {
  if (!fileName) return file.name;
  if (Array.isArray(fileName)) {
    return fileName[index] ?? file.name;
  }
  return fileName;
}

export async function uploadFile(
  file: File,
  fileName: string,
  level: StorageAccessLevel = 'private'
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('running put', fileName, file);
  const s = await Storage.put(fileName, file, {
    level,
    progressCallback(progress: { loaded: number; total: number }) {
      // eslint-disable-next-line no-console
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  });

  // eslint-disable-next-line no-console
  console.warn('s', s);
}
