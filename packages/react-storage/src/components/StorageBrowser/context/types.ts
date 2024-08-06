import { UploadDataWithPathInput } from 'aws-amplify/storage';
import { LocationCredentialsProvider } from '@aws-amplify/storage/storage-browser';

import { DownloadControl } from '../Views/Controls';

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

export type FileTableEntry = FileItem & { download: DownloadControl };

export type LocationItem = FileItem | FolderItem | FileTableEntry;

export type Permission = 'READ' | 'READWRITE' | 'WRITE';
export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export interface LocationAccess<T = Permission> {
  type: LocationType;
  permission: T;
  scope: string;
}

export interface LocationData<T = Permission> {
  bucket: string;
  permission: T;
  prefix: string;
  type: LocationType;
}

export interface LocationConfig {
  bucket: string;
  credentialsProvider: LocationCredentialsProvider;
  region: string;
}

type TaskStatus = 'INITIAL' | 'QUEUED' | 'IN_PROGRESS' | 'SUCCESS' | 'ERROR';

interface Task<T = TaskStatus> {
  key: string;
  message: string | undefined;
  status: T;
}

interface CancelableTask extends Task<TaskStatus | 'CANCELED'> {
  cancel: (() => void) | undefined;
}

interface UploadItemOptions extends Omit<UploadDataWithPathInput, 'options'> {
  options?: Pick<
    NonNullable<UploadDataWithPathInput['options']>,
    'preventOverwrite'
  >;
}
interface UploadItem extends OperationItem<UploadItemOptions> {}

interface UploadActionInput
  extends TaskActionInput<UploadItem, { preventOverwite?: boolean }> {}

interface UploadActionOutput extends OperationOutput<CancelableTask> {}

export interface UploadAction
  extends OperationAction<UploadActionInput, UploadActionOutput> {}

export type UploadItemData = Blob | ArrayBufferView | ArrayBuffer | string;

interface TaskActionInput<T, K = never> {
  config?: LocationConfig;
  data: T;
  options?: K;
  prefix: string;
}

interface OperationOutput<T = Task> {
  tasks: T | undefined;
}

type OperationItem<T = {}> = Omit<T, 'path'>;

type OperationAction<T, K = OperationOutput> = (input: T) => K;

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
  config?: (() => LocationConfig) | LocationConfig;
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
  key: string;
}
