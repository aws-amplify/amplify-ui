import type { UploadTask } from '@aws-amplify/storage';

export enum FileState {
  PAUSED = 'paused',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  RESUME = 'resume',
  EDITING = 'editing',
  INIT = 'init',
}

export interface StorageFile {
  id: string;
  file: File;
  name: string;
  status: FileState;
  progress: number;
  task?: UploadTask;
  s3Key?: string;
  error?: string;
  isImage: boolean;
}

export type StorageFiles = StorageFile[];
