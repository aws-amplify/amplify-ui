import type { FileItemsState, ResolvedFiles } from './types';

export const DEFAULT_STATE: FileItemsState = {
  validItems: undefined,
  invalidItems: undefined,
};

export const DEFAULT_RESOLVED_FILES: ResolvedFiles = {
  validFiles: undefined,
  invalidFiles: undefined,
};

export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;
