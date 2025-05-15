import { isEmpty, isString, isUndefined } from '@aws-amplify/ui';
import type { HandleFileSelect } from '@aws-amplify/ui-react/internal';

import type { FileItem } from '../actions';

import type { FileItems, SelectionType } from './types';

const compareFileItems = (prev: FileItem, next: FileItem) =>
  prev.key.localeCompare(next.key);

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
