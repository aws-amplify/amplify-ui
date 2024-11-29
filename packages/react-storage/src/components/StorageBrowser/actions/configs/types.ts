import { StorageBrowserIconType } from '../../context/elements';

import {
  CopyHandler,
  CreateFolderHandler,
  DeleteHandler,
  DownloadHandler,
  ListLocationItemsHandler,
  ListLocations,
  LocationItemData,
  LocationPermissions,
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  UploadHandler,
} from '../handlers';

export type ActionHandler<TData = any, RValue = any> = TaskHandler<
  TaskHandlerInput<TData & TaskData>,
  TaskHandlerOutput<RValue>
>;

type StringWithoutSpaces<T extends string> = Exclude<
  T,
  ` ${string}` | `${string} ` | `${string} ${string}`
>;

export type ViewName = Capitalize<`${string}View`>;
export type ActionName<T extends string = string> = StringWithoutSpaces<T>;

export interface ActionListItemConfig {
  /**
   * conditionally disable item selection based on currently selected values
   * @default false
   */
  disable?: (selectedValues: LocationItemData[] | undefined) => boolean;

  /**
   * conditionally render list item based on location permission
   * @default false
   */
  hide?: (permissions: LocationPermissions) => boolean;

  /**
   * list item icon
   */
  icon: StorageBrowserIconType;

  /**
   * list item label
   */
  label: string;
}

/**
 * defines an action to be included in the actions list of the `LocationDetailView` with
 * a dedicated subcomponent of the `LocationActionView`
 */
export interface ActionViewConfig<
  T extends ActionHandler = ActionHandler,
  K extends ViewName = ViewName,
> {
  /**
   * action handler
   */
  handler: T;

  /**
   * The view slot name associated with the action provided on the
   * `StorageBrowser` through the `views` prop
   */
  viewName: K;

  /**
   * configure action list item behavior. provide multiple configs
   * to create additional list items for a single action
   */
  actionListItem: ActionListItemConfig;
}

export interface UploadActionConfig
  extends ActionViewConfig<UploadHandler, 'UploadView'> {}

export interface DeleteActionConfig
  extends ActionViewConfig<DeleteHandler, 'DeleteView'> {}

export interface CopyActionConfig
  extends ActionViewConfig<CopyHandler, 'CopyView'> {}

export interface CreateFolderActionConfig
  extends ActionViewConfig<CreateFolderHandler, 'CreateFolderView'> {}

export interface ListActionConfig<T> {
  /**
   * action handler
   */
  handler: T;
}

export interface DefaultActionConfigs {
  createFolder?: CreateFolderActionConfig;
  listLocationItems?: ListLocationItemsHandler;
  upload?: UploadActionConfig;
  delete?: DeleteActionConfig;
  download?: DownloadHandler;
  copy?: CopyActionConfig;
}

export interface ExtendedDefaultActionConfigs
  extends Required<DefaultActionConfigs> {
  listLocations: ListLocations;
}

export type CustomActionConfigs = Record<
  ActionName,
  ActionViewConfig | ActionHandler
>;

/**
 * @internal
 **/
export interface ExtendedActionConfigs {
  default?: ExtendedDefaultActionConfigs;
  custom?: CustomActionConfigs;
}

export type ActionViewConfigs<ActionsKeys extends ActionName = ActionName> =
  Record<ActionsKeys, ActionViewConfig>;
