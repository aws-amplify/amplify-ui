import type { FilesState } from './types';

export const DEFAULT_STATE: FilesState = {
  items: undefined,
  invalidFiles: undefined,
};

export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;
