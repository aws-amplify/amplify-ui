import { isFunction } from '@aws-amplify/ui';
import { StorageManagerProps } from '../../types';

interface ProcessFileParams extends Pick<StorageManagerProps, 'processFile'> {
  file: File;
  key: string;
}

/**
 * Utility function that takes the processFile prop, along with a file a key
 * and returns a Promise that resolves to { file, key, ..rest }
 * regardless if processFile is defined and if it is sync or async
 */
export const resolveFile = ({
  processFile,
  file,
  key,
}: ProcessFileParams): Promise<Pick<ProcessFileParams, 'file' | 'key'>> => {
  return new Promise((resolve, reject) => {
    const result = isFunction(processFile)
      ? processFile({ file, key })
      : { file, key };
    if (result instanceof Promise) {
      result.then(resolve).catch(reject);
    } else {
      resolve({
        ...result,
      });
    }
  });
};
