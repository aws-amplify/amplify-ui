import type { FileItemsState, ResolvedFiles } from './types';

export const DEFAULT_STATE: FileItemsState = {
  validItems: undefined,
  invalidItems: undefined,
};

export const DEFAULT_RESOLVED_FILES: ResolvedFiles = {
  validFiles: undefined,
  invalidFiles: undefined,
};

export const DEFAULT_MAX_FILE_SIZE = 160 * 1000 * 1000 * 1000;
