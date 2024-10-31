import { LocationCredentialsProvider } from '../storage-internal';

interface FolderItem {
  key: string;
  id: string;
  type: 'FOLDER';
}

interface FileItem {
  key: string;
  id: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

export type LocationItem = FileItem | FolderItem;

export interface LocationConfig {
  accountId?: string;
  bucket: string;
  credentialsProvider: LocationCredentialsProvider;
  customEndpoint?: string;
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
