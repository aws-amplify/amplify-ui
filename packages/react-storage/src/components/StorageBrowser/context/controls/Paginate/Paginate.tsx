import React from 'react';

const INITIAL_STATE: PaginateState = {
  current: 1,
  hasNext: false,
  hasPrevious: false,
  getPageData: () => undefined,
  isLoadingNextPage: false,
};

type Permission = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

// avoid naming clash with Location (URL) API (https://developer.mozilla.org/en-US/docs/Web/API/Location)
interface LocationData {
  name: string;
  permission: Permission;
  type: LocationType;
}

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

interface ListData {
  LOCATIONS: LocationData;
  LOCATION_ITEMS: LocationItem;
}

type GetData = <T extends keyof ListData>(type: T) => ListData[T][] | undefined;

type PaginateAction = { type: 'NEXT' } | { type: 'PREVIOUS' };

export interface PaginateState {
  current: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLoadingNextPage: boolean;
  readonly getPageData: GetData;
}

export type PaginateStateContext = [
  state: PaginateState,
  handleUpdateState: (action: PaginateAction) => void,
];

export const PaginateContext = React.createContext<
  PaginateStateContext | undefined
>(undefined);

export function paginateReducer(
  state: PaginateState,
  action: PaginateAction
): PaginateState {
  if (action.type === 'NEXT') {
    return { ...state, current: (state.current ?? 0) + 1 };
  }
  return state;
}

export function PaginateProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element {
  const value = React.useReducer(paginateReducer, INITIAL_STATE);

  return (
    <PaginateContext.Provider value={value}>
      {children}
    </PaginateContext.Provider>
  );
}
