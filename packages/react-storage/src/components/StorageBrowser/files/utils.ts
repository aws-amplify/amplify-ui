import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import type { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import type { FileItem } from '../actions';

import type { FileItems, SelectionType } from './types';
interface ValidFilesData {
  validFiles: File[];
  invalidFiles: File[];
}

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

export const handleFileValidation = (
  files: File[] | undefined,
  isFileValid: (file: File) => boolean
): ValidFilesData =>
  (files ?? []).reduce(
    (curr: ValidFilesData, file) => {
      if (isFileValid(file)) {
        curr.validFiles = isUndefined(curr.validFiles)
          ? [file]
          : curr.validFiles.concat(file);
      } else {
        curr.invalidFiles = isUndefined(curr.invalidFiles)
          ? [file]
          : curr.invalidFiles.concat(file);
      }
      return curr;
    },
    { validFiles: [], invalidFiles: [] }
  );

export const resolveFiles = (
  prevItems: FileItems,
  files: File[] | undefined
): FileItems => {
  if (!files?.length) return prevItems;

  // construct `nextItems` and filter out existing `file` entries
  const nextItems = files.reduce((items: FileItems, file) => {
    const { name, webkitRelativePath } = file;

    return prevItems.some(
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

  if (!prevItems.length) {
    return nextItems.sort(compareFileItems);
  }

  return prevItems.concat(nextItems).sort(compareFileItems);
};

export const parseFileSelectParams = (
  value?: SelectionType
): Parameters<HandleFileSelect> => {
  if (isUndefined(value)) return ['FILE', undefined];
  if (isString(value)) return [value, undefined];

  const [selectType, ...rest] = value;
  return [selectType, !rest?.length ? undefined : { accept: rest.join() }];
};
