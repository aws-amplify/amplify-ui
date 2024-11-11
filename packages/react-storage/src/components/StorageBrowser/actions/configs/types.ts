import { IconVariant } from '../../context/elements';
import { LocationPermissions } from '../../credentials/types';

import {
  ListLocationsHandler,
  ListLocationItemsHandler,
  LocationItemData,
  LocationItemType,
  UploadHandler,
  CreateFolderHandler,
  DeleteHandler,
  CopyHandler,
  TaskHandler,
} from '../handlers';

type StringWithoutSpaces<T extends string> = Exclude<
  T,
  ` ${string}` | `${string} ` | `${string} ${string}`
>;

export type ComponentName = Capitalize<`${string}View`>;
type ActionName = StringWithoutSpaces<string>;

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
   * The name of the component associated with the action
   */
  componentName: ComponentName;

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
  disable?: (selectedValues: LocationItemData[] | undefined) => boolean;

  /**
   * open native OS file picker with associated selection type on item select
   */
  fileSelection?: SelectionType;

  /**
   * conditionally render list item based on location permission
   * @default false
   */
  hide?: (permissions: LocationPermissions) => boolean;

  /**
   * list item icon
   */
  icon: IconVariant | Exclude<React.ReactNode, string>;

  /**
   * list item label
   */
  label: string;
}

/**
 * defines an action to be included in the actions list of the `LocationDetailView` with
 * a dedicated subcomponent of the `LocationActionView`
 */
export interface TaskActionConfig<T extends TaskHandler = TaskHandler>
  extends ActionConfigTemplate<T> {
  /**
   * configure action list item behavior. provide multiple configs
   * to create additional list items for a single action
   */
  actionsListItemConfig?: ActionListItemConfig | ActionListItemConfig[];

  /**
   * whether the provided `handler` allow inflight cancellation
   * @default false
   */
  isCancelable?: boolean;

  /**
   * show per task progress in the action task table
   * @default false
   */
  includeProgress?: boolean;

  /**
   * default display name value displayed on action view
   */
  displayName: string;
}

export interface ListActionConfig<T> extends ActionConfigTemplate<T> {}

export interface UploadActionConfig extends TaskActionConfig<UploadHandler> {
  componentName: 'UploadView';
}

export interface DeleteActionConfig extends TaskActionConfig<DeleteHandler> {
  componentName: 'DeleteView';
}

export interface CopyActionConfig extends TaskActionConfig<CopyHandler> {
  componentName: 'CopyView';
}

export interface CreateFolderActionConfig
  extends TaskActionConfig<CreateFolderHandler> {
  componentName: 'CreateFolderView';
}

export interface ListLocationsActionConfig
  extends ListActionConfig<ListLocationsHandler> {
  componentName: 'LocationsView';
  displayName: string;
}

export interface ListLocationItemsActionConfig
  extends ListActionConfig<ListLocationItemsHandler> {
  componentName: 'LocationDetailView';
  displayName: (
    bucket: string | undefined,
    prefix: string | undefined
  ) => string;
}

export interface DefaultActionConfigs {
  ListLocationItems: ListLocationItemsActionConfig;
  ListLocations: ListLocationsActionConfig;
  CreateFolder: CreateFolderActionConfig;
  Upload: UploadActionConfig;
  Delete: DeleteActionConfig;
  Copy: CopyActionConfig;
}

export type DefaultActionKey = keyof DefaultActionConfigs;

export type ActionConfigs<ActionsKeys extends ActionName = ActionName> = Record<
  ActionsKeys,
  | ListLocationItemsActionConfig
  | ListLocationsActionConfig
  | CreateFolderActionConfig
  | UploadActionConfig
  | TaskActionConfig
>;

export type ResolveActionHandler<T> = T extends
  | TaskActionConfig<infer K>
  | ListActionConfig<infer K>
  ? K
  : never;

export type ResolveActionHandlers<T> = {
  [K in keyof T]: ResolveActionHandler<T[K]>;
};
