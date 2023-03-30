import type { UploadTask } from '@aws-amplify/storage';

export enum FileStatus {
  QUEUED = 'queued',
  UPLOADING = 'uploading',
  PAUSED = 'paused',
  ERROR = 'error',
  UPLOADED = 'uploaded',
}

export interface StorageFile {
  id: string;
  file?: File;
  name: string;
  status: FileStatus;
  progress: number;
  uploadTask?: UploadTask;
  s3Key?: string;
  error: string;
  isImage: boolean;
}

export type StorageFiles = StorageFile[];

export type DefaultFile = Pick<StorageFile, 's3Key'>;
