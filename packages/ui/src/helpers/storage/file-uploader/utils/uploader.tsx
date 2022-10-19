import { FileName } from '../../../../types/storage';
import { Storage } from 'aws-amplify';
import { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

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
  // todo add content type
  // eslint-disable-next-line no-console
  console.log('running put', fileName, file);
  return Storage.put(fileName, file, {
    level,
    resumable: true,
    progressCallback(progress: { loaded: number; total: number }) {
      const singlePercentage = Math.floor(
        (progress.loaded / progress.total) * 100
      );
      percentage[index] = singlePercentage;
      // eslint-disable-next-line no-console
      console.log('poercentage', percentage);
      const addPercentage = [...percentage, singlePercentage];

      setPercentage(addPercentage);
      // eslint-disable-next-line no-console
      console.log(
        `Uploaded: ${progress.loaded}/${progress.total} ${singlePercentage} ${fileName}`
      );
    },
  });
}
