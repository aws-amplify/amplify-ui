import { DEFAULT_STATE } from './constants';
import type { FileItemsState, FilesActionType } from './types';
import { processFileItems } from './utils';

export const filesReducer: React.Reducer<
  FileItemsState,
  Exclude<FilesActionType, { type: 'SELECT_FILES' } | { type: 'ADD_FILES' }>
> = (state, action) => {
  switch (action.type) {
    case 'ADD_FILE_ITEMS': {
      if (!action.validFiles?.length && !action.invalidFiles?.length) {
        return state;
      }

      const validItems = processFileItems(state.validItems, action.validFiles);
      // `invalidItems` should only track invalid items from latest action taken
      const invalidItems = processFileItems(undefined, action.invalidFiles);

      return { validItems, invalidItems };
    }
    case 'REMOVE_FILE_ITEM': {
      const { validItems: prevItems } = state;
      if (!prevItems?.length) return state;

      const nextItems = prevItems.filter(({ id }) => id !== action.id);

      if (nextItems.length === prevItems.length) return state;

      // `validItems` is strictly undefined if it has 0 file items
      // otherwise, `validItems` is guaranteed to have at least 1+ file items
      return {
        ...state,
        validItems: nextItems.length ? nextItems : undefined,
      };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};
