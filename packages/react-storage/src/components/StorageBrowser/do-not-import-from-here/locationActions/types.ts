import React from 'react';

import { Permission } from '../../storage-internal';
import { PrefixTaskAction, LocationItem } from '../types';

/**
 * open native OS file picker with associated selection type on action select
 */
export type SelectionType =
  | ('file' | 'folder')
  | ['file' | 'folder', ...string[]];

export interface LocationActionOptions<T = Permission> {
  /**
   * disable menu
   */
  disable?: boolean | ((selectedItems: LocationItem[]) => boolean);
  displayName?: string;
  hide?: boolean | ((permission: T) => boolean);
  icon?: React.ReactNode | string;
  selectionData?: SelectionType;
}

interface _LocationAction<T = Permission> {
  readonly handler: PrefixTaskAction;
  options?: LocationActionOptions<T>;
}
export interface LocationAction<T = Permission>
  extends Omit<_LocationAction<T>, 'handler'> {}

export interface LocationActions<T = Permission> {
  [key: string]: Omit<LocationAction<T>, 'handler'>;
}

export type LocationActionsAction<T = string> =
  | { type: 'CLEAR' }
  | { type: 'SET_ACTION'; actionType: T }
  | { type: 'TOGGLE_SELECTED_ITEM'; item: LocationItem }
  | { type: 'TOGGLE_SELECTED_ITEMS'; items?: LocationItem[] };

export interface LocationActionsState<T = string> {
  actions: LocationActions;
  selected: {
    type: T | undefined;
    items: LocationItem[] | undefined;
  };
}

export type LocationActionsStateContext = [
  state: LocationActionsState,
  handleUpdateState: (action: LocationActionsAction) => void,
];

export interface LocationActionsProviderProps {
  actions?: LocationActions;
  actionType?: string;
  children?: React.ReactNode;
}
