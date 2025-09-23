import { DEFAULT_STATE } from './constants';
import type { FileItemsState, FileItemsActionType } from './types';
import { processFileItems } from './utils';

export const fileItemsReducer: React.Reducer<
  FileItemsState,
  Exclude<FileItemsActionType, { type: 'SELECT_FILES' } | { type: 'ADD_FILES' }>
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
      const validItems = nextItems.length ? nextItems : undefined;
      return { ...state, validItems };
    }
    case 'RESET_FILE_ITEMS': {
      return DEFAULT_STATE;
    }
  }
};
