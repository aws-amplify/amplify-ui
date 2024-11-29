import React from 'react';

import {
  CustomActionConfigs,
  DefaultActionConfigs,
  ExtendedActionConfigs,
  ListLocations,
  LocationData,
} from './actions';
import { GetLocationCredentials } from './credentials/types';

import { UseView } from './views/useView';

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
  StorageBrowserViews,
} from './views';

import { StorageBrowserDisplayText } from './displayText';

import { DerivedActionHandlers, UseAction } from './useAction';

export interface StorageBrowserConfig {
  accountId?: string;
  customEndpoint?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

export interface StorageBrowserActions {
  default?: DefaultActionConfigs;
  custom?: CustomActionConfigs;
}

export interface CreateStorageBrowserInput {
  /**
   * Override and default `StorageBrowser` actions and action view configs.
   */
  actions?: StorageBrowserActions;

  /**
   * `StorageBrowser` configuration properties.
   */
  config: StorageBrowserConfig;

  /**
   * Overrides default `components` used within `StorageBrowser`
   */
  components?: StorageBrowserComponents;
}

export interface StorageBrowserProps<K = string, V = {}> {
  /**
   * Overrides default display string values. Supports resolving of static and dynamic text
   * values and error messages.
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
   *     // default: () => 'Folder name cannot contain "/", nor end or start with "."'
   *     getValidationMessage?: (foldeerName) =>
   *       `Folder name ${folderName} cannot contain "/", nor end or start with "."`
   *   }
   * }
   *
   * <StorageBrowser displayText={{ displayText: myDisplayText }} />
   * ```
   */
  displayText?: StorageBrowserDisplayText;

  /**
   * Overrides default top level views and custom views defined by the `actions` parameter of
   * `createStorageBrowser`.
   */
  views?: StorageBrowserViews<K, V>;
}

export interface StorageBrowserProviderProps<V = {}>
  extends StoreProviderProps {
  /**
   * See @typedef {StorageBrowserProps['displayText']}
   */
  displayText?: StorageBrowserDisplayText;

  views?: V;

  /**
   * Sets initial `location` data. used to fetch Provide to initialize the `StorageBrowser` with an initial `actionType`
   *
   * @example
   * ```tsx
   * <StorageBroeser.Provider actionType="upload">
   *   <StorageBroeser />
   * </StorageBroeser.Provider>
   * ```
   */
  location?: LocationData;
}

/**
 * StorageBrowser` component, provider and view components.
 */
export interface StorageBrowserType<K = string, V = {}> {
  (props: StorageBrowserProps<K, V>): React.JSX.Element;
  displayName: string;
  /**
   * `StorageBrowser` React.Context provider. Composed `StorageBrowser` components
   * must be a descendant of a `Provider` element.
   *
   * @example
   * ```tsx
   * <StorageBrowser.Provider>
   *   <Modal content={<StorageBrowser.UploadView />}>
   * <StorageBrowser.Provider>
   * ```
   */
  Provider: (props: StorageBrowserProviderProps<V>) => React.JSX.Element;

  /**
   * Utility view aggregating all action views. Can be used to render a standalone
   * action view.
   *
   * @example
   * ```tsx
   * <StorageBrowser.LocationActionView type="copy" />
   * ```
   */
  LocationActionView: LocationActionViewType<K>;

  /**
   * Displays data related to the selected or provided `location` and action
   * selection.
   */
  LocationDetailView: LocationDetailViewType;

  /**
   * Entry point view displaying end user allowed locations.
   */
  LocationsView: LocationsViewType;

  /**
   * Standalone composable default action view components.
   */
  CopyView: CopyViewType;
  CreateFolderView: CreateFolderViewType;
  DeleteView: DeleteViewType;
  UploadView: UploadViewType;
}

type DefaultActionType<T = string> = Exclude<T, keyof DefaultActionConfigs>;

/**
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
 * Utility type representing default actions that do not have a corresponding action view
 * and require exclusionn from aggregated action views.
 */
type DefaultActionWithoutViewType = 'download';

/**
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

export interface CreateStorageBrowserOutput<
  C extends ExtendedActionConfigs = ExtendedActionConfigs,
> {
  StorageBrowser: StorageBrowserType<
    DerivedActionViewType<C>,
    DerivedActionViews<C>
  >;
  useAction: UseAction<DerivedActionHandlers<C>>;
  useView: UseView;
}
