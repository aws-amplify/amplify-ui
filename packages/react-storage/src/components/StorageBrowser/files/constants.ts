import type { ResolvedFiles } from './resolveFiles';
import type { FilesState } from './types';

export const DEFAULT_STATE: FilesState = {
  items: undefined,
  invalidFiles: undefined,
};

export const DEFAULT_RESOLVED_FILES: ResolvedFiles = {
  valid: undefined,
  invalid: undefined,
};

export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;
