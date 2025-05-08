import type { FileItemsState, FilesActionType } from './types';
import { DEFAULT_STATE, resolveFiles } from './utils';

export const filesReducer: React.Reducer<
  FileItemsState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = ({ items: prevItems, invalidFiles: prevInvalid }, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      const nextItems = resolveFiles(prevItems, input.files);
      const nextInvalid = resolveFiles(prevInvalid, input.invalidFiles);

      return { items: nextItems, invalidFiles: nextInvalid };
    }
    case 'REMOVE_FILE_ITEM': {
      const filteredItems = prevItems?.filter(({ id }) => id !== input.id);

      /* 
        We want to enforce that items is strictly undefined if there are no files
        stored within it; otherwise, items is guaranteed to have at least 1+ files. 
      */
      const items = !filteredItems?.length
        ? undefined
        : filteredItems.length === prevItems?.length
        ? prevItems
        : filteredItems;

      return { items, invalidFiles: prevInvalid };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};
