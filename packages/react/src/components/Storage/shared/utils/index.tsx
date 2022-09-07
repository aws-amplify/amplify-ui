import { FileNameProps } from '../../FileUploader/types';
import { Storage } from 'aws-amplify';

export const getFileName: FileNameProps = (fileName, file, index) => {
  if (!fileName) return file.name;
  if (Array.isArray(fileName)) {
    return fileName[index] ?? file.name;
  }
  return fileName;
};

export async function uploadFile(file: File, fileName: string): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('running put', fileName, file);
  const s = await Storage.put(fileName, file, {
    level: 'public',
    progressCallback(progress: { loaded: number; total: number }) {
      // eslint-disable-next-line no-console
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  });

  // eslint-disable-next-line no-console
  console.warn('s', s);
}
