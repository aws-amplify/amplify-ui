import { UploadDataInput } from '../storage-internal';
import { LocationCredentialsProvider } from '../storage-internal';

export interface FolderItem {
  key: string;
  type: 'FOLDER';
}

export interface FileItem {
  key: string;
  data?: File;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

export type LocationItem = FileItem | FolderItem;

export type Permission = 'READ' | 'READWRITE' | 'WRITE';
export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export interface LocationAccess<T = Permission> {
  type: LocationType;
  permission: T;
  scope: string;
}

export interface LocationData<T = Permission>
  extends Pick<LocationAccess<T>, 'permission' | 'type'> {
  bucket: string;
  prefix: string;
}

export interface LocationConfig {
  bucket: string;
  credentialsProvider: LocationCredentialsProvider;
  region: string;
}

export type TaskStatus =
  | 'INITIAL'
  | 'QUEUED'
  | 'PENDING'
  | 'FAILED'
  | 'COMPLETE';

export interface TaskResult<T = TaskStatus> {
  key: string;
  message: string | undefined;
  status: T;
}

interface CancelableTaskResult extends TaskResult<TaskStatus | 'CANCELED'> {
  cancel: (() => void) | undefined;
}

interface UploadItemOptions
  extends Pick<NonNullable<UploadDataInput['options']>, 'preventOverwrite'> {}

interface UploadActionInput extends TaskActionInput<UploadItemOptions> {}

interface UploadActionOutput extends TaskActionOutput<CancelableTaskResult> {}

export interface UploadAction
  extends TaskAction<UploadActionInput, UploadActionOutput> {}

export interface TaskActionInput<T = never> {
  prefix: string;
  config: LocationConfig | (() => LocationConfig);
  data: File;
  options?: T;
}

export interface TaskActionOutput<T = TaskResult> {
  result: T | undefined;
}

export type PrefixTaskAction<T = TaskActionInput, K = TaskActionOutput> = (
  input: T
) => Promise<K>;

export type TaskAction<T = TaskActionInput, K = TaskActionOutput> = (
  input: T
) => Promise<K>;

export interface ListActionOptions<T = never> {
  delimiter?: string;
  exclude?: T | T[];
  nextToken?: string;
  pageSize?: number;
  refresh?: boolean;
  reset?: boolean;
}

export interface ListActionInput<K = never> {
  prefix: string;
  config: (() => LocationConfig) | LocationConfig;
  options?: K;
}

export interface ListActionOutput<T> {
  result: T[];
  nextToken: string | undefined;
}

export interface DownloadActionInput {
  key: string;
  config?: (() => LocationConfig) | LocationConfig;
}

export interface DownloadActionOutput {
  signedUrl: string;
}
