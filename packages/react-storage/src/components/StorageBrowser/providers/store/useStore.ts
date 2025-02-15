import React from 'react';

import { ActionTypeAction, useActionType } from './actionType';
import { FilesActionType, FileItemsState, useFiles } from './fileItems';
import { LocationActionType, LocationState, useLocation } from './location';
import {
  LocationItemsAction,
  LocationItemsState,
  useLocationItems,
} from './locationItems';

export interface UseStoreState {
  actionType: string | undefined;
  fileItems: FileItemsState;
  location: LocationState;
  locationItems: LocationItemsState;
}

export type HandleStoreAction = (
  action:
    | ActionTypeAction
    | FilesActionType
    | LocationActionType
    | LocationItemsAction
) => void;

export function useStore(): [UseStoreState, HandleStoreAction] {
  const [actionType, actionTypeDispatch] = useActionType();
  const [fileItems, FileItemsDispatch] = useFiles();
  const [location, LocationDispatch] = useLocation();
  const [locationItems, locationItemsDispatch] = useLocationItems();

  const dispatchHandler: HandleStoreAction = React.useCallback(
    (action) => {
      switch (action.type) {
        case 'ADD_FILE_ITEMS':
        case 'REMOVE_FILE_ITEM':
        case 'SELECT_FILES':
        case 'RESET_FILE_ITEMS': {
          FileItemsDispatch(action);
          break;
        }
        case 'NAVIGATE':
        case 'RESET_LOCATION': {
          LocationDispatch(action);
          break;
        }
        case 'SET_LOCATION_ITEMS':
        case 'REMOVE_LOCATION_ITEM':
        case 'RESET_LOCATION_ITEMS': {
          locationItemsDispatch(action);
          break;
        }
        case 'SET_ACTION_TYPE':
        case 'RESET_ACTION_TYPE': {
          actionTypeDispatch(action);
          break;
        }
      }
    },
    [
      actionTypeDispatch,
      FileItemsDispatch,
      LocationDispatch,
      locationItemsDispatch,
    ]
  );

  return [{ actionType, fileItems, location, locationItems }, dispatchHandler];
}
