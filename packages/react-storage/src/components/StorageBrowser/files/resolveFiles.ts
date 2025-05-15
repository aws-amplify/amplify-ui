import { isUndefined } from '@aws-amplify/ui';

import {
  DEFAULT_RESOLVED_FILES,
  MAX_UPLOAD_OBJECT_SIZE,
  UPLOAD_FILE_SIZE_LIMIT,
} from './constants';

export interface ResolvedFiles {
  valid: File[] | undefined;
  invalid: File[] | undefined;
}

const constructFiles = (files: File[] | undefined, file: File): File[] =>
  isUndefined(files) ? [file] : files.concat(file);

const defaultValidateFile = (file: File): boolean =>
  file.size <= UPLOAD_FILE_SIZE_LIMIT;

// Safeguard to enforce max S3 object size allowed for multipart uploads
// when custom file validator is provided
const isValidObjectSize = (file: File): boolean =>
  file.size <= MAX_UPLOAD_OBJECT_SIZE;

export const resolveFiles = (
  files: File[] | undefined,
  validator: (file: File) => boolean = defaultValidateFile
): ResolvedFiles => {
  if (!files?.length) return DEFAULT_RESOLVED_FILES;

  return files.reduce(
    (acc, file) => {
      if (validator(file) && isValidObjectSize(file)) {
        acc.valid = constructFiles(acc.valid, file);
      } else {
        acc.invalid = constructFiles(acc.invalid, file);
      }
      return acc;
    },
    { ...DEFAULT_RESOLVED_FILES }
  );
};
