import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import type { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import type { FileItem } from '../actions';

import { DEFAULT_MAX_FILE_SIZE, DEFAULT_RESOLVED_FILES } from './constants';
import type { FileItems, ResolvedFiles, SelectionType } from './types';

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

const constructFiles = (files: File[] | undefined, file: File): File[] =>
  isUndefined(files) ? [file] : files.concat(file);

export const defaultFileSizeValidator = (file: File): boolean =>
  file.size <= DEFAULT_MAX_FILE_SIZE;

export const resolveFiles = (
  files: File[] | undefined,
  validator?: (file: File) => boolean
): ResolvedFiles => {
  if (!files?.length) return DEFAULT_RESOLVED_FILES;

  if (!validator) return { validFiles: files, invalidFiles: undefined };

  return files.reduce(
    (acc, file) => {
      if (validator(file)) {
        acc.validFiles = constructFiles(acc.validFiles, file);
      } else {
        acc.invalidFiles = constructFiles(acc.invalidFiles, file);
      }
      return acc;
    },
    // create new copy of default to be modified
    { ...DEFAULT_RESOLVED_FILES }
  );
};

export const processFileItems = (
  prevItems: FileItems | undefined,
  files: File[] | undefined
): FileItems | undefined => {
  if (!files?.length) return prevItems;

  // construct `nextItems` and filter out existing `file` entries
  const nextItems = files.reduce((items: FileItems, file) => {
    const { name, webkitRelativePath } = file;

    return prevItems?.some(
      ({ file: existing }) =>
        existing.name === name &&
        existing.webkitRelativePath === webkitRelativePath
    )
      ? items
      : items.concat({
          key: isEmpty(webkitRelativePath) ? name : webkitRelativePath,
          id: crypto.randomUUID(),
          file,
        });
  }, []);

  if (!nextItems.length) return prevItems;

  if (!prevItems?.length) {
    return nextItems.sort(compareFileItems);
  }

  return prevItems?.concat(nextItems).sort(compareFileItems);
};

export const parseFileSelectParams = (
  value?: SelectionType
): Parameters<HandleFileSelect> => {
  if (isUndefined(value)) return ['FILE', undefined];
  if (isString(value)) return [value, undefined];

  const [selectType, ...rest] = value;
  return [selectType, !rest?.length ? undefined : { accept: rest.join() }];
};
