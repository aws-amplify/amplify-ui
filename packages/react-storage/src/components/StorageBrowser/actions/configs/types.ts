import { Permission } from '../../storage-internal';
import { IconVariant } from '../../context/elements';

import {
  ListLocationsHandler,
  ListLocationItemsHandler,
  LocationItem,
  LocationItemType,
  UploadHandler,
  CreateFolderHandler,
} from '../handlers';
import { TaskHandler, TaskHandlerOutput } from '../types';

type CapitalizedStringWithoutSpaces = Capitalize<
  Exclude<string, ` ${string}` | `${string} ` | `${string} ${string}`>
>;

/**
 * native OS file picker type. to restrict selectable file types, define the picker types
 * followed by accepted file types as strings
 * @example
 * ```ts
 * type JPEGOnly = ['FOLDER', '.jpeg'];
 * ```
 */
export type SelectionType = LocationItemType | [LocationItemType, ...string[]];

export interface ActionConfigTemplate<T, K> {
  /**
   * The name of the component associated with the action
   */
  componentName: K;
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

type IsCancelableTaskHandler<T> = T extends TaskHandler<
  any,
  TaskHandlerOutput<infer K>
>
  ? 'CANCELED' extends K
    ? true
    : false
  : never;

/**
 * defines an action to be included in the actions list of the `LocationDetailView` with
 * a dedicated subcomponent of the `LocationActionView`
 */
export interface TaskActionConfig<
  T extends TaskHandler,
  K extends CapitalizedStringWithoutSpaces = CapitalizedStringWithoutSpaces,
> {
  componentName: K;
  /**
   * configure action list item behavior. provide multiple configs
   * to create additional list items for a single action
   */
  actionsListItemConfig?: ActionListItemConfig | ActionListItemConfig[];

  /**
   * whether the action allows inflight cancellation
   */
  isCancelable: boolean;

  /**
   * action handler
   */
  handler: T;

  /**
   * default display name value displayed on action view
   */
  displayName: string;
}

export interface BatchTaskActionConfig<
  T extends TaskHandler,
  K extends CapitalizedStringWithoutSpaces = CapitalizedStringWithoutSpaces,
> extends TaskActionConfig<T, K> {
  /**
   * sets action view subcomponent type and action processing behavior
   */
  type: 'BATCH_ACTION';
}

export interface SingleTaskActionConfig<
  T extends TaskHandler,
  K extends CapitalizedStringWithoutSpaces = CapitalizedStringWithoutSpaces,
> extends TaskActionConfig<T, K> {
  /**
   * sets action view subcomponent type and action processing behavior
   */
  type: 'SINGLE_ACTION';
}

export interface ListActionConfig<
  T,
  K extends CapitalizedStringWithoutSpaces = CapitalizedStringWithoutSpaces,
> extends ActionConfigTemplate<T, K> {}

export interface UploadActionConfig
  extends TaskActionConfig<UploadHandler, 'UploadView'> {
  type: 'BATCH_ACTION';
  isCancelable: IsCancelableTaskHandler<UploadHandler>;
}

export interface CreateFolderActionConfig
  extends TaskActionConfig<CreateFolderHandler, 'CreateFolderView'> {
  type: 'SINGLE_ACTION';
  isCancelable: IsCancelableTaskHandler<CreateFolderHandler>;
}

export interface ListLocationsActionConfig
  extends ListActionConfig<ListLocationsHandler, 'LocationsView'> {
  displayName: string;
  type: 'LIST_LOCATIONS';
}

export interface ListLocationItemsActionConfig
  extends ListActionConfig<ListLocationItemsHandler, 'LocationDetailView'> {
  displayName: (
    bucket: string | undefined,
    prefix: string | undefined
  ) => string;
  type: 'LIST_LOCATION_ITEMS';
}

export interface DefaultActionConfigs {
  ListLocationItems: ListLocationItemsActionConfig;
  ListLocations: ListLocationsActionConfig;
  CreateFolder: CreateFolderActionConfig;
  Upload: UploadActionConfig;
}

export type DefaultActionKeys = keyof DefaultActionConfigs;

export type ActionConfigs<
  ActionsKeys extends
    CapitalizedStringWithoutSpaces = CapitalizedStringWithoutSpaces,
> = Record<
  ActionsKeys,
  | BatchTaskActionConfig<TaskHandler>
  | SingleTaskActionConfig<TaskHandler>
  | ListLocationItemsActionConfig
  | ListLocationsActionConfig
>;

export type ResolveActionHandler<T> = T extends
  | TaskActionConfig<infer K>
  | ListActionConfig<infer K>
  ? K
  : never;

export type ResolveActionHandlers<T> = {
  [K in keyof T]: ResolveActionHandler<T[K]>;
};
