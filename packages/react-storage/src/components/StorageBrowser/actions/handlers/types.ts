import type { LocationCredentialsProvider } from '../../storage-internal';

/**
 * `location` grant scope
 */
export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

/**
 * `location` grant permissions
 */
export type LocationPermissions = ('delete' | 'get' | 'list' | 'write')[];

/**
 * `location` metadata
 */
export interface LocationData {
  /**
   * `location` s3 bucket
   */
  bucket: string;

  /**
   * Unique identifier
   */
  id: string;

  /**
   * @see {@link LocationPermissions}
   */
  permissions: LocationPermissions;

  /**
   * `location` base prefix, delimited by `'/'`. Empty string indicates bucket root
   */
  prefix: string;

  /**
   * @see {@link LocationType}
   */
  type: LocationType;
}

export interface FolderData {
  key: string;
  id: string;
  type: 'FOLDER';
}

export interface FileData {
  eTag?: string;
  key: string;
  lastModified: Date;
  id: string;
  size: number;
  type: 'FILE';
}

export type LocationItemData = FileData | FolderData;

export interface FileDataItem extends FileData, TaskData {
  fileKey: string;
}

export interface FileItem extends TaskData {
  file: File;
}

export interface OptionalFileData
  extends Partial<Omit<FileData, 'id' | 'key'>> {}

export interface ActionInputConfig {
  accountId?: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  customEndpoint?: string;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskData {
  key: string;
  id: string;
}

export interface TaskHandlerOptions {
  onProgress?: (
    data: { key: string; id: string },
    progress: number | undefined
  ) => void;
}

export interface TaskHandlerInput<
  TData extends TaskData = TaskData,
  TOptions extends TaskHandlerOptions = TaskHandlerOptions,
> {
  config: ActionInputConfig;
  data: TData;
  options?: TOptions;
}

export type TaskResultStatus =
  | 'CANCELED'
  | 'COMPLETE'
  | 'FAILED'
  | 'OVERWRITE_PREVENTED';

export interface TaskResult<TStatus, TValue> {
  /**
   * result error (if any)
   */
  error?: Error;

  /**
   * result message (if any)
   */
  message?: string;

  /**
   * task result status
   */
  status: TStatus;

  /**
   * task result value (if any)
   */
  value?: TValue;
}

export interface TaskHandlerOutput<K = any> {
  cancel?: () => void;
  result: Promise<TaskResult<TaskResultStatus, K>>;
}

export type TaskHandler<T = any, K = any> = (input: T) => K;

export interface ListHandlerOptions<T = never> {
  exclude?: T;
  nextToken?: string;
  pageSize?: number;
}

export interface ListHandlerInput<T = any> extends ActionInput<T> {}

export interface ListHandlerOutput<T = any> {
  nextToken: string | undefined;
  items: T[];
}

export type ListHandler<T = any, K = any> = (input: T) => Promise<K>;

export interface ListLocationsExcludeOptions {
  exactPermissions?: LocationPermissions;
  type?: LocationType | LocationType[];
}
