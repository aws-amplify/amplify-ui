import { Permission } from '@aws-amplify/storage/internals';
import { IconVariant } from '../../context/elements';

import {
  ListLocationsAction,
  ListLocationItemsAction,
  LocationItem,
  LocationItemType,
  UploadAction,
  CreateFolderAction,
} from '../handlers';
import { TaskAction, TaskActionOutput } from '../types';

/**
 * native OS file picker type. to restrict selectable file types, define the picker types
 * followed by accepted file types as strings
 * @example
 * ```ts
 * type JPEGOnly = ['FOLDER', '.jpeg'];
 * ```
 */
export type SelectionType = LocationItemType | [LocationItemType, ...string[]];

export interface ActionConfigTemplate<T> {
  /**
   * action handler
   */
  handler: T;
}

export interface ActionListItemConfig {
  /**
   * conditionally disable item selection based on currently selected values
   * @default false
   */
  disable?: (selectedValues: LocationItem[] | undefined) => boolean;

  /**
   * open native OS file picker with associated selection type on item select
   */
  fileSelection?: SelectionType;

  /**
   * conditionally render list item based on location permission
   * @default false
   */
  hide?: (permission: Permission) => boolean;

  /**
   * list item icon
   */
  icon: IconVariant | Exclude<React.ReactNode, string>;

  /**
   * list item label
   */
  label: string;
}

type IsCancelableTaskAction<T> = T extends TaskAction<
  any,
  TaskActionOutput<infer K>
>
  ? K extends 'CANCELED'
    ? true
    : false
  : never;

/**
 * defines an action to be included in the actions list of the `LocationDetailView` with
 * a dedicated subcomponent of the `LocationActionView`
 */
export interface TaskActionConfig<T extends TaskAction> {
  /**
   * configure action list item behavior. provide multiple configs
   * to create additional list items for a single action
   */
  actionsListItemConfig?: ActionListItemConfig | ActionListItemConfig[];

  /**
   * whether the action allows inflight cancellation
   */
  isCancelable: IsCancelableTaskAction<T>;

  /**
   * action handler
   */
  handler: T;

  /**
   * default title value displayed on action view
   */
  title: string;

  /**
   * sets action view subcomponent type and action processing behavior
   */
  type: 'BATCH_ACTION' | 'SINGLE_ACTION';
}

export interface ListActionConfig<T> extends ActionConfigTemplate<T> {}

export interface UploadActionConfig extends TaskActionConfig<UploadAction> {}

export interface CreateFolderActionConfig
  extends TaskActionConfig<CreateFolderAction> {}

export interface ListLocationsActionConfig
  extends ListActionConfig<ListLocationsAction> {
  title: string;
  type: 'LIST_LOCATIONS';
}

export interface ListLocationItemsActionConfig
  extends ListActionConfig<ListLocationItemsAction> {
  title: (bucket: string | undefined, prefix: string | undefined) => string;
  type: 'LIST_LOCATION_ITEMS';
}

export interface DefaultActionConfigs {
  listLocationItems: ListLocationItemsActionConfig;
  listLocations: ListLocationsActionConfig;
  createFolder: CreateFolderActionConfig;
  upload: UploadActionConfig;
}

export type DefaultActionKey = keyof DefaultActionConfigs;
export type CustomActionKey<T> = keyof Omit<T, DefaultActionKey>;

export type ActionConfigs = Record<
  Capitalize<string>,
  | TaskActionConfig<TaskAction>
  | ListLocationItemsActionConfig
  | ListLocationsActionConfig
>;

export type ResolveAction<T> = T extends
  | TaskActionConfig<infer K>
  | ListActionConfig<infer K>
  ? K
  : never;

export type ResolveActions<T> = { [K in keyof T]: ResolveAction<T[K]> };
