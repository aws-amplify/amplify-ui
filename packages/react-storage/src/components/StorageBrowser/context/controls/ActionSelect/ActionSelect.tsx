import React from 'react';

const INITIAL_STATE: ActionSelectState = {
  actions: [],
  selected: { items: undefined, actionType: undefined },
};

type UploadItemData = Blob | ArrayBufferView | ArrayBuffer | string;

type Permission = 'READ' | 'READWRITE' | 'WRITE';

interface FolderData {
  key: string;
  type: 'FOLDER';
}

interface FileData {
  key: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

type LocationItem = FileData | FolderData;

type ActionType = 'UPLOAD_FOLDER' | 'UPLOAD_FILES' | 'CREATE_FOLDER';

type ActionSelectAction<T = ActionType> =
  | {
      type: 'SELECT_ACTION_TYPE';
      actionType: T;
      destination: string;
      displayName: string;
      items: LocationItem[] | undefined;
    }
  | { type: 'DESELECT_ACTION_TYPE' }
  | { type: 'SET_UPLOAD_ITEMS'; items: UploadItemData[] }
  | { type: 'SELECT_LOCATION_ITEM'; item: LocationItem }
  | { type: 'DESELECT_LOCATION_ITEM'; key: string }
  | { type: 'DESELECT_ALL_LOCATION_ITEMS' };

interface Action {
  displayName: string;
  hide?: (permission: Permission) => boolean;
  disable?: (selected: LocationItem[] | undefined) => boolean;
  type: string;
}

interface ActionSelectState<T = ActionType> {
  actions: Action[];
  selected: { actionType: T | undefined; items: LocationItem[] | undefined };
}

export type ActionSelectStateContext = [
  state: ActionSelectState,
  handleUpdateState: (action: ActionSelectAction) => void,
];

export function actionSelectReducer(
  state: ActionSelectState,
  _action: ActionSelectAction
): ActionSelectState {
  return state;
}

export const ActionSelectContext = React.createContext<
  ActionSelectStateContext | undefined
>(undefined);

export function ActionSelectProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(actionSelectReducer, INITIAL_STATE);

  return (
    <ActionSelectContext.Provider value={value}>
      {children}
    </ActionSelectContext.Provider>
  );
}
