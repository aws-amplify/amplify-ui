import React from 'react';
import { LocationData } from '../../../actions';

/**
 * Current `location` data. `bucket`, `prefix` and `permissions` are required
 */
export interface LocationValue
  extends Pick<LocationData, 'bucket' | 'permissions' | 'prefix'> {
  /**
   * unique location identifier
   * @default string - auto-generated
   */
  id?: LocationData['id'];
  /**
   * breadcrumb navigation `path`
   * @default string - empty string
   */
  path?: string;
  type?: LocationData['type'];
}

export interface StorageBrowserValue {
  // sets action view
  actionType?: string;
  location?: LocationValue;
}

export interface LocationEventValue extends Required<LocationValue> {}

export interface StorageBrowserEventValue {
  // `undefined` on no `actionType` selected
  actionType: string | undefined;
  // `undefined` on no `location` selected
  location: LocationEventValue | undefined;
}

export interface ValueProviderProps {
  children?: React.ReactNode;
  value?: StorageBrowserValue;
  defaultValue?: StorageBrowserValue;
  onValueChange?: (event: StorageBrowserEventValue) => void;
}
