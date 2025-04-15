import React from 'react';

import {
  CustomActionConfigs,
  DefaultActionConfigs,
  ListLocations,
  LocationData,
} from '../actions';
import { StorageBrowserComponents } from '../components';
import { GetLocationCredentials, RegisterAuthListener } from '../credentials';
import { StorageBrowserDisplayText } from '../displayText';
import { ErrorBoundaryType } from '../ErrorBoundary';
import {
  StorageBrowserEventValue,
  StorageBrowserValue,
  StoreProviderProps,
} from '../store';
import { DerivedActionHandlers, UseAction } from '../useAction';
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
} from '../views';

/**
 * @description configuration properties
 */
export interface StorageBrowserConfig {
  /**
   * @description AWS account Id
   */
  accountId?: string;

  /**
   * @description custom S3 endpoint used in action handler calls
   */
  customEndpoint?: string;

  /**
   * @description location credentials retrieval handler
   */
  getLocationCredentials: GetLocationCredentials;

  /**
   * @description locations list handler
   * @required
   */
  listLocations: ListLocations;

  /**
   *
   * @description provided handler receives an `onStateChange` callback to be called from the consumer on auth status changes to clear in-memory credentials
   * @required
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
   * import { myAuth } from '../auth.ts';
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
   * @description AWS account region
   * @required
   */
  region: string;
}

export interface StorageBrowserActions {
  default?: DefaultActionConfigs;
  custom?: CustomActionConfigs;
}

/**
 * @description configuration and options for `createStorageBrowser`
 */
export interface CreateStorageBrowserInput {
  /**
   * @description override and default `StorageBrowser` actions and action view configs
   */
  actions?: StorageBrowserActions;

  /**
   * @description `StorageBrowser` configuration properties
   * @required
   */
  config: StorageBrowserConfig;

  /**
   * @description custom ErrorBoundary class. If omitted, a default ErrorBoundary is provided. To disable ErrorBoundary, set to `null`.
   */
  ErrorBoundary?: ErrorBoundaryType | null;

  /**
   * @description Overrides default `components` used within `StorageBrowser`
   */
  components?: StorageBrowserComponents;
}

/**
 * `StorageBrowser` component properties
 */
export interface StorageBrowserProps<
  LocationActionNameType = string,
  CustomActionViews = {},
> {
  /**
   * @description provide to initialize the `StorageBrowser` with a default location, `actionType` or pagination values as an uncontrolled component
   */
  defaultValue?: StorageBrowserValue | null;

  /**
   * @description called on location and action change events. Provide with `value` prop for controlled component behavior or as a standalone prop
   */
  onValueChange?: (value: StorageBrowserEventValue) => void;

  /**
   * @description provide with `onValueChange` to use the `StorageBrowser` as a controlled component
   */
  value?: StorageBrowserValue | null;

  /**
   * @description Overrides default display string values. Supports resolving of static and dynamic text values and error messages
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
   * @description accepts default top level `views` overrides and custom `views` defined by the `actions` parameter of `createStorageBrowser`
   */
  views?: StorageBrowserViews<LocationActionNameType, CustomActionViews>;
}

/**
 * @description `StorageBrowser.Provider` component properties
 */
export interface StorageBrowserProviderProps<CustomActionViews = {}>
  extends StoreProviderProps,
    Pick<
      StorageBrowserProps,
      'defaultValue' | 'displayText' | 'onValueChange' | 'value'
    > {
  // note: `views` intentionally scoped to custom slots to prevent conflicts with composability
  /**
   * @description accepts custom action views rendered by `LocationActionView`
   */
  views?: CustomActionViews;

  /**
   * @deprecated will be removed in a future major verison. Prefer `value` for controlled behavior or `defaultValue` for initializng `actionType`
   * @description initial `actionType`, does not update
   */
  actionType?: string;

  /**
   * @deprecated will be removed in a future major verison. Prefer `value` for controlled behavior or `defaultValue` for initializng `actionType`
   * @description initial `location` data, does not update
   */
  location?: LocationData;

  /**
   * @deprecated will be removed in a future major verison. Prefer `value` for controlled behavior or `defaultValue` for initializng `actionType`
   * @description initial `location` subpath to establish navigation state, does not update
   */
  path?: string;
}

/**
 * @description `StorageBrowser` component, provider and view components
 */
export interface StorageBrowserType<
  LocationActionNameType = string,
  CustomActionView = {},
> {
  (
    props: StorageBrowserProps<LocationActionNameType, CustomActionView>
  ): React.JSX.Element;
  displayName: string;
  /**
   * @description `StorageBrowser` React.Context provider. Composed `StorageBrowser` components must be a descendant of a `Provider` element
   * @example
   * ```tsx
   * <StorageBrowser.Provider>
   *   <Modal content={<StorageBrowser.UploadView />}>
   * </StorageBrowser.Provider>
   * ```
   */
  Provider: (
    props: StorageBrowserProviderProps<CustomActionView>
  ) => React.JSX.Element;

  /**
   * @description utility view aggregating all action views. Can be used to render a standalone action view
   * @example
   * ```tsx
   * <StorageBrowser.LocationActionView type="copy" />
   * ```
   */
  LocationActionView: LocationActionViewType<LocationActionNameType>;

  /**
   * @description displays data related to the selected or provided `location` and action selection
   */
  LocationDetailView: LocationDetailViewType;

  /**
   * @description entry point view displaying `locations` returned from `listLocations`
   */
  LocationsView: LocationsViewType;

  /**
   * @description standalone composable default action view components
   */
  CopyView: CopyViewType;
  CreateFolderView: CreateFolderViewType;
  DeleteView: DeleteViewType;
  UploadView: UploadViewType;
}

type NonDefaultActionType<T = string> = Exclude<T, keyof DefaultActionConfigs>;

/**
 * @internal
 * @unstable interface subject to change, not recommended for public use
 * @description utility type resolving available custom action view component slots
 */
export type DerivedActionViews<T extends StorageBrowserActions> = {
  [K in keyof T['custom'] as K extends NonDefaultActionType<K>
    ? T['custom'][K] extends { viewName: `${string}View` }
      ? T['custom'][K]['viewName']
      : never
    : never]?: () => React.JSX.Element | null;
};

/**
 * @internal @unstable interface subject to change, not recommended for public use
 * @description utility type of excluded action keys that do not have a corresponding action view
 */
type DefaultActionWithoutViewType = 'download';

/**
 * @internal @unstable interface subject to change, not recommended for public use
 * @description utility type resolving available location action view types
 */
export type DerivedActionNameType<T extends StorageBrowserActions> =
  | keyof {
      [K in keyof T['custom'] as K extends NonDefaultActionType<K>
        ? T['custom'][K] extends { viewName: `${string}View` }
          ? K
          : never
        : never]?: any;
    }
  | Exclude<keyof DefaultActionConfigs, DefaultActionWithoutViewType>;

/**
 * @description return values of `createStorageBrowser`
 */
export interface CreateStorageBrowserOutput<
  ActionsType extends StorageBrowserActions,
> {
  /**
   * @description `StorageBrowser` component and subcomponents
   */
  StorageBrowser: StorageBrowserType<
    DerivedActionNameType<ActionsType>,
    DerivedActionViews<ActionsType>
  >;

  /**
   * @description action handler utility hook
   */
  useAction: UseAction<
    DerivedActionHandlers<NonNullable<ActionsType['custom']>>
  >;

  /**
   * @description view state utility hook
   */
  useView: UseView;
}
