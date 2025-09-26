import type {
  AllFileTypes,
  FileSizeResolver,
} from '../../../createStorageBrowser/types';
import { DEFAULT_FILE_SIZE_LIMIT, DEFAULT_FILE_SIZE_LIMITS } from './const';

export function resolveMaxFileSize(
  maxFileSize: number | FileSizeResolver | undefined,
  fileType: AllFileTypes | null
): number {
  if (typeof maxFileSize === 'number') {
    return maxFileSize;
  }

  if (typeof maxFileSize === 'function' && fileType) {
    try {
      const result = maxFileSize(fileType);
      if (typeof result === 'number') {
        return result;
      }
    } catch (error) {
      //
    }
  }

  return fileType
    ? DEFAULT_FILE_SIZE_LIMITS[fileType] || DEFAULT_FILE_SIZE_LIMIT
    : DEFAULT_FILE_SIZE_LIMIT;
}
