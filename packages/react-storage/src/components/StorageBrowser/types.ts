import React from 'react';

import {
  CustomActionConfigs,
  DefaultActionConfigs,
  ExtendedActionConfigs,
  ListLocations,
  LocationData,
} from './actions';
import { GetLocationCredentials } from './credentials/types';

import { StorageBrowserComponents } from './ComponentsProvider';

import { RegisterAuthListener, StoreProviderProps } from './providers';

import {
  CopyViewType,
  CreateFolderViewType,
  DeleteViewType,
  UploadViewType,
  LocationActionViewType,
  LocationDetailViewType,
  LocationsViewType,
  UseView,
  StorageBrowserViews,
} from './views';

import { StorageBrowserDisplayText } from './displayText';

import { DerivedActionHandlers, UseAction } from './useAction';

/**
 * Configuration properties
 */
export interface StorageBrowserConfig {
  /**
   * AWS account Id
   */
  accountId?: string;

  /**
   * Custom S3 endpoint used in action handler calls
   */
  customEndpoint?: string;

  /**
   * Location credentials retrieval handler
   */
  getLocationCredentials: GetLocationCredentials;

  /**
   * @required
   *
   * Locations list handler
   */
  listLocations: ListLocations;

  /**
   * @required
   *
   * Provided handler receives an `onStateChange` callback to be called from
   * the consumer on auth status changes to clear in-memory credentials
   *
   * @example
   * ```tsx
   * // src/auth.ts
   * class MyAuth {
   *   // ...other private fields
   *   private onStateChange: () => void | undefined;
   *
   *   registerAuthListener = (onStateChange: () => void) => {
   *     // set `onStateChange` callback
   *     this.onStateChange = onStateChange;
   *   };
   *
   *   signOut() {
   *     // ...do sign out stuff
   *
   *     // run `onStateChange` callback
   *     this.onStateChange?.();
   *   }
   * }
   *
   * export const myAuth = new MyAuth();
   *
   * // src/storage-browser.ts
   * import {
   *   createStorageBrowser,
   *   createManagedAuthAdapter
   * } from '@aws-amplify/ui-react-storage/browser';
   *
   * import { myAuth } from './auth.ts';
   *
   * const managedAuthAdapter = createManagedAuthAdapter({
   *   accountId: myAuth.accountId,
   *   credentialsProvider: myAuth.credentialsProvider,
   *   region: myAuth.region,
   *   registerAuthListener: myAuth.registerAuthListener,
   * });
   *
   * export const { StorageBrowser } = createStorageBrowser({
   *   config: managedAuthAdapter,
   * });
   * ```
   */
  registerAuthListener: RegisterAuthListener;

  /**
   * @required
   *
   * AWS account region
   */
  region: string;
}

export interface StorageBrowserActions {
  default?: DefaultActionConfigs;
  custom?: CustomActionConfigs;
}

/**
 * Configuration and options for `createStorageBrowser`
 */
export interface CreateStorageBrowserInput {
  /**
   * Override and default `StorageBrowser` actions and action view configs
   */
  actions?: StorageBrowserActions;

  /**
   * `StorageBrowser` configuration properties
   */
  config: StorageBrowserConfig;

  /**
   * Overrides default `components` used within `StorageBrowser`
   */
  components?: StorageBrowserComponents;
}

/**
 * `StorageBrowser` component properties
 */
export interface StorageBrowserProps<K = string, V = {}> {
  /**
   * Overrides default display string values. Supports resolving of static and dynamic text
   * values and error messages
   *
   * @example
   * ```tsx
   * const myDisplayText = {
   *   CreateFolderView: {
   *     // static text
   *     // default: "Create folder"
   *     title: 'Add subfolder",
   *
   *     // dynamic text
   *     // default: () => 'Folder name cannot contain "/", nor start or end with "."'
   *     getValidationMessage?: (folderName) =>
   *       `Folder name "${folderName}" cannot contain "/", nor start or end with "."`
   *   }
   * }
   *
   * <StorageBrowser displayText={{ displayText: myDisplayText }} />
   * ```
   */
  displayText?: StorageBrowserDisplayText;

  /**
   * Accepts default top level `views` overrides and custom `views` defined by the `actions`
   * parameter of `createStorageBrowser`
   */
  views?: StorageBrowserViews<K, V>;
}

/**
 * `StorageBrowser.Provider` component properties
 */
export interface StorageBrowserProviderProps<V = {}>
  extends StoreProviderProps,
    Pick<StorageBrowserProps, 'displayText'> {
  // note: `views` intentionally scoped to custom slots to prevent conflicts with composability
  /**
   * Accepts custom action views rendered by `LocationActionView`
   */
  views?: V;

  /**
   * Sets initial `location` data. Provide to initialize the `StorageBrowser` with an initial
   * `location`
   */
  location?: LocationData;
}

/**
 * `StorageBrowser` component, provider and view components
 */
export interface StorageBrowserType<K = string, V = {}> {
  (props: StorageBrowserProps<K, V>): React.JSX.Element;
  displayName: string;
  /**
   * `StorageBrowser` React.Context provider. Composed `StorageBrowser` components
   * must be a descendant of a `Provider` element
   *
   * @example
   * ```tsx
   * <StorageBrowser.Provider>
   *   <Modal content={<StorageBrowser.UploadView />}>
   * </StorageBrowser.Provider>
   * ```
   */
  Provider: (props: StorageBrowserProviderProps<V>) => React.JSX.Element;

  /**
   * Utility view aggregating all action views. Can be used to render a standalone
   * action view
   *
   * @example
   * ```tsx
   * <StorageBrowser.LocationActionView type="copy" />
   * ```
   */
  LocationActionView: LocationActionViewType<K>;

  /**
   * Displays data related to the selected or provided `location` and action
   * selection
   */
  LocationDetailView: LocationDetailViewType;

  /**
   * Entry point view displaying `locations` returned from `listLocations`
   */
  LocationsView: LocationsViewType;

  /**
   * Standalone composable default action view components
   */
  CopyView: CopyViewType;
  CreateFolderView: CreateFolderViewType;
  DeleteView: DeleteViewType;
  UploadView: UploadViewType;
}

type DefaultActionType<T = string> = Exclude<T, keyof DefaultActionConfigs>;

/**
 * @internal @unstable interface subject to change, not recommended for public use
 *
 * Utility type resolving available custom action view component slots
 */
export type DerivedActionViews<T extends StorageBrowserActions> = {
  [K in keyof T['custom'] as K extends DefaultActionType<K>
    ? T['custom'][K] extends { viewName: `${string}View` }
      ? T['custom'][K]['viewName']
      : never
    : never]?: () => React.JSX.Element | null;
};

/**
 * @internal @unstable interface subject to change, not recommended for public use
 *
 * Utility type of excluded action keys that do not have a corresponding action view
 */
type DefaultActionWithoutViewType = 'download';

/**
 * @internal @unstable interface subject to change, not recommended for public use
 *
 * Utility type resolving available location action view types
 */
export type DerivedActionViewType<T extends StorageBrowserActions> =
  | keyof {
      [K in keyof T['custom'] as K extends DefaultActionType<K>
        ? T['custom'][K] extends { viewName: `${string}View` }
          ? K
          : never
        : never]?: any;
    }
  | Exclude<keyof DefaultActionConfigs, DefaultActionWithoutViewType>;

/**
 * Return values of `createStorageBrowser`
 */
export interface CreateStorageBrowserOutput<
  C extends ExtendedActionConfigs = ExtendedActionConfigs,
> {
  /**
   * `StorageBrowser` component and subcomponents
   */
  StorageBrowser: StorageBrowserType<
    DerivedActionViewType<C>,
    DerivedActionViews<C>
  >;

  /**
   * Action handler utility hook
   */
  useAction: UseAction<DerivedActionHandlers<C>>;

  /**
   * View state utility hook
   */
  useView: UseView;
}
