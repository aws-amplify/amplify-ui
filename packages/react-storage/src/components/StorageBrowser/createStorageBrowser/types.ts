import type React from 'react';

import type {
  CustomActionConfigs,
  DefaultActionConfigs,
  ExtendedActionConfigs,
  FileData,
  ListLocations,
  LocationData,
} from '../actions';
import type { StorageBrowserComponents } from '../components';
import type {
  GetLocationCredentials,
  RegisterAuthListener,
} from '../credentials';
import type { StorageBrowserDisplayText } from '../displayText';
import type { ErrorBoundaryType } from '../ErrorBoundary';
import type {
  StorageBrowserEventValue,
  StorageBrowserValue,
  StoreProviderProps,
} from '../store';
import type { DerivedActionHandlers, UseAction } from '../useAction';
import type {
  CopyViewType,
  CreateFolderViewType,
  DeleteViewType,
  DownloadViewType,
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

export interface StorageBrowserOptions {
  /**
   * @description Overrides default file validation called when selecting files to be uploaded
   * @param {File} file — The file to validate
   * @returns {boolean} — Returns true if `file` is valid, false otherwise
   * @example
   * ```tsx
   * const MAX_FILE_SIZE = 10 * 1000 * 1000 * 1000; // 10 GB in bytes
   *
   * const myValidateFile = (file: File) => file.size < MAX_FILE_SIZE;
   * ```
   */
  validateFile?: (file: File) => boolean;
}

const BUILT_IN_FILE_TYPES = ['text', 'video', 'image'] as const;
export type BuiltInFileType = (typeof BUILT_IN_FILE_TYPES)[number];

type CustomFileType<T> = T extends (properties: FileData) => infer R
  ? R extends string | undefined
    ? Exclude<NonNullable<R>, BuiltInFileType>
    : never
  : never;

export type AllFileTypes<T extends undefined | any = undefined> =
  T extends undefined ? BuiltInFileType : BuiltInFileType | CustomFileType<T>;

export type FileSizeResolver<T extends string = BuiltInFileType> = (
  fileType: T
) => number | undefined;

export type UrlOptionsResolver<T extends string = BuiltInFileType> = (
  fileType: T
) => FilePreviewUrlOptions | undefined;

export type FilePreview<
  TResolver extends ((properties: FileData) => unknown) | undefined = undefined,
> = {
  /**
   * @description Function to determine file type from file properties
   * @param properties - File metadata and properties
   * @returns FileType or undefined that will fallback to the built-in file type detection
   */
  fileTypeResolver?: TResolver;

  /**
   * @description Function that dynamically returns a custom React component for rendering specific file types based on file type
   * @param fileType - The resolved file type
   * @returns React component or undefined to use built-in renderer
   * @example fileType => fileType === 'image' ? CustomImagePreview : undefined
   * @example fileType => {
   *   if (fileType === 'text') return CodeRenderer;
   *   if (fileType === 'pdf') return CustomPDFViewer;
   *   return undefined; // Use built-in renderer
   * }
   */
  rendererResolver?: (
    fileType: AllFileTypes<TResolver>
  ) => React.ComponentType<FilePreviewProps> | undefined;

  /**
   * @description Options for generating preview URLs.
   * Can be:
   * - A static configuration object
   * - A function that dynamically returns URL options based on file type
   * @example { expiresIn: 1800, validateObjectExistence: true }
   * @example fileType => fileType === 'video' ? { expiresIn: 3600, validateObjectExistence: true } : undefined
   */
  urlOptions?:
    | FilePreviewUrlOptions
    | UrlOptionsResolver<AllFileTypes<TResolver>>;

  /**
   * @description Maximum file sizes allowed for preview in kilobytes (KB).
   * Can be:
   * - A single limit for all file types
   * - A function that dynamically calculates the limit based on file type
   * @example 10240 // 10MB limit for all files
   * @example fileType => fileType === 'image' ? 5120 : undefined
   */
  maxFileSize?: number | FileSizeResolver<AllFileTypes<TResolver>>;
};

/**
 * @description Options for generating file preview URLs
 */
export interface FilePreviewUrlOptions {
  /**
   * @description Whether to validate that the object exists before generating the URL
   * @default false
   */
  validateObjectExistence?: boolean;

  /**
   * @description Time in seconds until the generated URL expires
   * @default 900 (15 minutes)
   */
  expiresIn?: number;
}

/**
 * @description Props provided to custom file preview renderer components
 */
export interface FilePreviewProps {
  /**
   * @description File metadata including content type and other properties
   */
  fileData: FileData;

  /**
   * @description Pre-signed URL for the file.
   */
  url: string;
}

/**
 * @description configuration and options for `createStorageBrowser`
 */
export interface CreateStorageBrowserInput<
  TResolver extends ((properties: FileData) => unknown) | undefined = undefined,
> {
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

  /**
   * @description Additional options and overrides for `StorageBrowser`
   */
  options?: StorageBrowserOptions;

  /**
   * @description Configuration for file preview functionality including custom renderers, file type resolution, and size limits
   */
  filePreview?: FilePreview<TResolver>;
}

/**
 * `StorageBrowser` component properties
 * @template TActionType Optional type of action names rendered by `LocationActionView`
 * @template TViews Optional type of custom action view components.
 */
export interface StorageBrowserProps<TActionType = string, TViews = {}> {
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
  views?: StorageBrowserViews<TActionType, TViews>;
}

/**
 * @description `StorageBrowser.Provider` component properties
 * @template TViews Optional type of custom action view components.
 */
export interface StorageBrowserProviderProps<TViews = {}>
  extends StoreProviderProps,
    Pick<
      StorageBrowserProps,
      'defaultValue' | 'displayText' | 'onValueChange' | 'value'
    > {
  // note: `views` intentionally scoped to custom slots to prevent conflicts with composability
  /**
   * @description accepts custom action views rendered by `LocationActionView`
   */
  views?: TViews;

  /**
   * @deprecated will be removed in a future major version. Prefer `value` for controlled behavior or `defaultValue` for initializing `actionType`
   * @description initial `actionType`, does not update
   */
  actionType?: string;

  /**
   * @deprecated will be removed in a future major version. Prefer `value` for controlled behavior or `defaultValue` for initializing `actionType`
   * @description initial `location` data, does not update
   */
  location?: LocationData;

  /**
   * @deprecated will be removed in a future major version. Prefer `value` for controlled behavior or `defaultValue` for initializing `actionType`
   * @description initial `location` subpath to establish navigation state, does not update
   */
  path?: string;
}

/**
 * @description `StorageBrowser` component, provider and view components.
 * @template TActionType Optional type of action names rendered by `LocationActionView`
 * @template TViews Optional type of custom action view components.
 */
export interface StorageBrowserType<TActionType = string, TViews = {}> {
  (props: StorageBrowserProps<TActionType, TViews>): React.JSX.Element;
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
  Provider: (props: StorageBrowserProviderProps<TViews>) => React.JSX.Element;

  /**
   * @description utility view aggregating all action views. Can be used to render a standalone action view
   * @example
   * ```tsx
   * <StorageBrowser.LocationActionView type="copy" />
   * ```
   */
  LocationActionView: LocationActionViewType<TActionType>;

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
  DownloadView: DownloadViewType;
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
export type DerivedActionViewType<T extends StorageBrowserActions> =
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
 * @template TActions Type of `actions` passed to `createStorageBrowser`
 */
export interface CreateStorageBrowserOutput<
  TActions extends StorageBrowserActions = ExtendedActionConfigs,
> {
  /**
   * @description `StorageBrowser` component and subcomponents
   */
  StorageBrowser: StorageBrowserType<
    DerivedActionViewType<TActions>,
    DerivedActionViews<TActions>
  >;

  /**
   * @description action handler utility hook
   */
  useAction: UseAction<DerivedActionHandlers<TActions>>;

  /**
   * @description view state utility hook
   */
  useView: UseView;
}
