import type { FileItemsData, FilesActionType } from './types';
import { resolveFiles } from './utils';

export const filesReducer: React.Reducer<
  FileItemsData,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = (prevItems, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      const nextItems = resolveFiles(prevItems.items, input.files);
      const nextInvalidFiles = resolveFiles(
        prevItems.invalidFiles,
        input.invalidFiles
      );
      return {
        ...prevItems,
        items: nextItems,
        invalidFiles: nextInvalidFiles,
      };
    }
    case 'REMOVE_FILE_ITEM': {
      const filteredItems = prevItems.items.filter(({ id }) => id !== input.id);

      return filteredItems.length === prevItems.items.length
        ? prevItems
        : { ...prevItems, items: filteredItems };
    }
    case 'RESET_FILE_ITEMS': {
      return { items: [], invalidFiles: [] };
    }
    // TODO: clear message
  }
};
