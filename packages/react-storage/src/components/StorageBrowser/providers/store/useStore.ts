import React from 'react';

import { ActionTypeAction, useActionType } from './actionType';
import { FileItems, FilesActionType, useFiles } from './files';
import { HistoryActionType, HistoryState, useHistory } from './history';
import {
  LocationItemsAction,
  LocationItemsState,
  useLocationItems,
} from './locationItems';

export interface UseStoreState {
  actionType: string | undefined;
  files: FileItems | undefined;
  history: HistoryState;
  locationItems: LocationItemsState;
}

export type HandleStoreAction = (
  action:
    | ActionTypeAction
    | FilesActionType
    | HistoryActionType
    | LocationItemsAction
) => void;

export function useStore(): [UseStoreState, HandleStoreAction] {
  const [actionType, dispatchActionType] = useActionType();
  const [files, dispatchFilesAction] = useFiles();
  const [history, dispatchHistoryAction] = useHistory();
  const [locationItems, dispatchLocationItemsAction] = useLocationItems();

  const dispatchHandler: HandleStoreAction = React.useCallback(
    (action) => {
      switch (action.type) {
        case 'ADD_FILE_ITEMS':
        case 'REMOVE_FILE_ITEM':
        case 'SELECT_FILES':
        case 'RESET_FILE_ITEMS': {
          dispatchFilesAction(action);
          break;
        }
        case 'NAVIGATE':
        case 'RESET_HISTORY': {
          dispatchHistoryAction(action);
          break;
        }
        case 'SET_LOCATION_ITEMS':
        case 'REMOVE_LOCATION_ITEM':
        case 'RESET_LOCATION_ITEMS': {
          dispatchLocationItemsAction(action);
          break;
        }
        case 'SET_ACTION_TYPE':
        case 'RESET_ACTION_TYPE': {
          dispatchActionType(action);
          break;
        }
      }
    },
    [
      dispatchActionType,
      dispatchFilesAction,
      dispatchHistoryAction,
      dispatchLocationItemsAction,
    ]
  );

  return [{ actionType, files, history, locationItems }, dispatchHandler];
}
