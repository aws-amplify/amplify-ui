import type { FileSizeResolver } from '../../../createStorageBrowser/types';
import {
  DEFAULT_FILE_SIZE_LIMIT,
  DEFAULT_FILE_SIZE_LIMITS,
  type FileType,
} from './const';

export function resolveMaxFileSize(
  maxFileSize: number | FileSizeResolver | undefined,
  fileType: FileType
): number {
  if (typeof maxFileSize === 'number') {
    return maxFileSize;
  }

  if (typeof maxFileSize === 'function') {
    try {
      const result = maxFileSize(fileType);
      if (typeof result === 'number') {
        return result;
      }
    } catch (error) {
      //
    }
  }

  return DEFAULT_FILE_SIZE_LIMITS[fileType] || DEFAULT_FILE_SIZE_LIMIT;
}
