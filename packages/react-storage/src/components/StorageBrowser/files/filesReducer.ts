import { DEFAULT_STATE } from './constants';
import type { FilesActionType, FilesState } from './types';
import { getFileItems } from './utils';

export const filesReducer: React.Reducer<
  FilesState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' }>
> = (state, input) => {
  switch (input.type) {
    case 'ADD_FILE_ITEMS': {
      if (!input.files?.length && !input.invalidFiles?.length) return state;

      const items = getFileItems(state.items, input.files);
      const invalidFiles = getFileItems(state.invalidFiles, input.invalidFiles);

      return { items, invalidFiles };
    }
    case 'REMOVE_FILE_ITEM': {
      const { items: prevItems } = state;
      if (!prevItems?.length) return state;

      const items = prevItems.filter(({ id }) => id !== input.id);

      if (items.length === prevItems.length) return state;

      // `items` is strictly undefined if it has 0 file items;
      // otherwise, `items` is guaranteed to have at least 1+ file items.
      return { ...state, items: items.length ? items : undefined };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};
