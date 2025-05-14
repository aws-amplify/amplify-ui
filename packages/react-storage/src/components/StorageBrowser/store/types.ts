import type React from 'react';
import type { LocationData, LocationType } from '../actions';

/**
 * @see {@link LocationData}
 */
export interface LocationValue
  extends Pick<LocationData, 'bucket' | 'permissions' | 'prefix'> {
  /**
   * @see {@link LocationData.id} defaults to auto-generated uuid
   */
  id?: LocationData['id'];

  /**
   * @description string following `location.prefix` in forming an object key. defaults to empty string
   * @example
   * ```ts
   * const path = "my-path/my-nested-path/";
   *
   * const prefix = "my-prefix/";
   * const bucket = "my-bucket";
   *
   * // "my-bucket/my-prefix/my-path/my-nested-path/"
   * const key = `${bucket}/${prefix}${path}`
   *```
   */
  path?: string;

  /**
   * @see {@link LocationType}
   */
  type?: LocationType;
}

export interface StorageBrowserValue {
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

export interface StoreProviderProps {
  children?: React.ReactNode;

  // include `null` for improved flexibility for consumers
  defaultValue?: StorageBrowserValue | null;

  // include `null` for improved flexibility for consumers
  value?: StorageBrowserValue | null;

  onValueChange?: (event: StorageBrowserEventValue) => void;

  /**
   * @deprecated
   */
  actionType?: string;

  /**
   * @deprecated
   */
  location?: LocationData;

  /**
   * @deprecated
   */
  path?: string;
}

export type StoreActionType =
  | { type: 'CHANGE_ACTION_TYPE'; actionType: string }
  | { type: 'RESET_ACTION_TYPE' }
  | {
      type: 'CHANGE_LOCATION';
      location: LocationData;
      path?: string;
    }
  | { type: 'RESET_LOCATION' };

/**
 * Stores current `location` and nested `path` values set on
 * navigate events.
 *
 * @example
 *`"s3://my-bucket/my-prefix/a-path/a-nested-path/"`
 *
 * ```
 * const state: LocationState = {
 *   location: {
 *     bucket: 'my-bucket',
 *     permisson: 'READWRITE',
 *     prefix: 'my/prefix/',
 *     type: 'PREFIX',
 *   },
 *   path: 'a-path/a-nested-path/',
 *   key: 'my/prefix/a-path/a-nested-path/',
 * }
 *
 */
export interface LocationState {
  /**
   * current `location` metadata
   */
  current: LocationData | undefined;

  /**
   * current `location` subpath within a `location`
   */
  path: string;

  /**
   * fully qualified string consisting of `location` prefix and path
   */
  key: string;
}

export interface StoreState {
  actionType: string | undefined;
  location: LocationState;
}

export type StoreContextType = [StoreState, React.Dispatch<StoreActionType>];
