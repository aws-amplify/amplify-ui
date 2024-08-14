import React from 'react';

import { Permission, PrefixTaskAction, LocationItem } from '../../types';

/**
 * open native OS file picker with associated selection type on action select
 */
export type SelectionType =
  | ('file' | 'folder')
  | ['file' | 'folder', ...string[]];

export interface LocationAction<T = Permission> {
  handler: PrefixTaskAction;
  options?: {
    /**
     * disable menu
     */
    disable?: boolean | ((selectedItems: LocationItem[]) => boolean);
    displayName?: string;
    hide?: boolean | ((permission: T) => boolean);
    icon?: React.ReactNode | string;
    selectionData?: SelectionType;
  };
}

export interface LocationActions<T = Permission> {
  [key: string]: LocationAction<T>;
}
