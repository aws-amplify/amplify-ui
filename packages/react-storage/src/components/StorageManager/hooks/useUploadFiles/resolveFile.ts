import { isFunction } from '@aws-amplify/ui';
import { ProcessFileParams, StorageManagerProps } from '../../types';

interface ResolveFileParams
  extends Pick<StorageManagerProps, 'processFile'>,
    ProcessFileParams {}

/**
 * Utility function that takes the processFile prop, along with a file a key
 * and returns a Promise that resolves to { file, key, ..rest }
 * regardless if processFile is defined and if it is sync or async
 */
export const resolveFile = ({
  processFile,
  file,
  key,
}: ResolveFileParams): Promise<ProcessFileParams> => {
  return new Promise((resolve, reject) => {
    const result = isFunction(processFile)
      ? processFile({ file, key })
      : { file, key };
    if (result instanceof Promise) {
      result.then(resolve).catch(reject);
    } else {
      resolve(result);
    }
  });
};
