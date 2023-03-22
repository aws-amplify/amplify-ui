import type { UploadTask } from '@aws-amplify/storage';

export enum FileState {
  READY = 'ready',
  EDITING = 'editing',
  LOADING = 'loading',
  PAUSED = 'paused',
  RESUME = 'resume',
  ERROR = 'error',
  SUCCESS = 'success',
  UPLOADED = 'uploaded',
}

export interface StorageFile {
  id: string;
  file: File;
  name: string;
  status: FileState;
  progress: number;
  task?: UploadTask;
  s3Key?: string;
  error: string;
  isImage: boolean;
}

export type StorageFiles = StorageFile[];
