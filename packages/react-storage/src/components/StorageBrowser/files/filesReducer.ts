import { DEFAULT_STATE } from './constants';
import type { FilesActionType, FilesState } from './types';
import { getFileItems } from './utils';

export const filesReducer: React.Reducer<
  FilesState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = (state, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      const items = getFileItems(state.items, input.files);
      const invalidFiles = getFileItems(state.invalidFiles, input.invalidFiles);

      return { items, invalidFiles };
    }
    case 'REMOVE_FILE_ITEM': {
      const { items: prevItems } = state;
      const filteredItems = prevItems?.filter(({ id }) => id !== input.id);

      // items is strictly undefined if there are 0 files stored in it;
      // otherwise, items is guaranteed to have at least 1+ files.
      if (!filteredItems?.length) return { ...state, items: undefined };

      const items =
        filteredItems.length === prevItems?.length ? prevItems : filteredItems;

      return { ...state, items };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};
