import type { StorageBrowserIconType } from '../../components/elements';

import type {
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

/**
 * Utility type representing the function signature of `StorageBrowser` action handlers. First
 * positional generic adds additional properties to `data` parameter, second positional
 * generic specifies optional return value provided to `options.onSuccess` callback and
 * `Task.value`.
 *
 * @example
 * ```ts
 * interface MyData {
 *   user: {
 *     name: string
 *     id: string
 *   };
 * }
 *
 * interface MyReturnValue {
 *   link: string;
 * }
 *
 * type CreateDownloadLink = ActionHandler<MyData, MyReturnValue>;
 *
 * const createDownloadLink: CreateDownloadLink = (input) => {
 *   // `config` is provided to handler, includes location data, credentials
 *   const { config, data } = input;
 *   const { user } = data;
 *
 *   const result = generatePresignedUrl(user, credentials).then((res) => ({
 *     status: 'COMPLETE' as const,
 *     value: { link: res.url.toString() },
 *   }));
 *
 *   return { result };
 * }
 * ```
 */
export type ActionHandler<TData = any, TValue = any> = TaskHandler<
  TaskHandlerInput<TData & TaskData>,
  TaskHandlerOutput<TValue>
>;

type StringWithoutSpaces<T extends string> = Exclude<
  T,
  ` ${string}` | `${string} ` | `${string} ${string}`
>;

export type ViewName = Capitalize<`${string}View`>;

// action names cannot contain white space
export type ActionName<K extends string = string> = StringWithoutSpaces<K>;

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

/**
 * Accepts either an `ActionViewConfig` for creation of an action list item and corresponding
 * view slot or an action handler for standalone action usage
 */
export type CustomActionConfigs = Record<
  ActionName,
  ActionViewConfig | ActionHandler
>;

/**
 * @internal @unstable
 */
export interface ExtendedActionConfigs {
  default?: ExtendedDefaultActionConfigs;
  custom?: CustomActionConfigs;
}

export type ActionViewConfigs<ActionsKeys extends ActionName = ActionName> =
  Record<ActionsKeys, ActionViewConfig>;
