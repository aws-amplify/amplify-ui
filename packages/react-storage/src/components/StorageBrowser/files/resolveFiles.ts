import { isUndefined } from '@aws-amplify/ui';

import { DEFAULT_RESOLVED_FILES, UPLOAD_FILE_SIZE_LIMIT } from './constants';

export interface ResolvedFiles {
  valid: File[] | undefined;
  invalid: File[] | undefined;
}

const constructFiles = (files: File[] | undefined, file: File): File[] =>
  isUndefined(files) ? [file] : files.concat(file);

const defaultValidateFile = (file: File): boolean =>
  file.size <= UPLOAD_FILE_SIZE_LIMIT;

export const resolveFiles = (
  files: File[] | undefined,
  validator: (file: File) => boolean = defaultValidateFile
): ResolvedFiles => {
  if (!files?.length) return DEFAULT_RESOLVED_FILES;

  return files.reduce(
    (curr, file) => {
      if (validator(file)) {
        curr.valid = constructFiles(curr.valid, file);
      } else {
        curr.invalid = constructFiles(curr.invalid, file);
      }
      return curr;
    },
    { ...DEFAULT_RESOLVED_FILES }
  );
};
