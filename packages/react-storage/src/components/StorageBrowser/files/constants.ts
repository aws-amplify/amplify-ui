import type { ResolvedFiles } from './resolveFiles';
import type { FilesState } from './types';

export const DEFAULT_STATE: FilesState = {
  items: undefined,
  invalidItems: undefined,
};

export const DEFAULT_RESOLVED_FILES: ResolvedFiles = {
  valid: undefined,
  invalid: undefined,
};

export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;

// 5 TiB for max object size
// https://github.com/aws-amplify/amplify-js/blob/1a5366d113c9af4ce994168653df3aadb142c581/packages/storage/src/providers/s3/utils/constants.ts#L17
export const MAX_UPLOAD_OBJECT_SIZE = 5 * 1024 * 1024 * 1024 * 1024;
