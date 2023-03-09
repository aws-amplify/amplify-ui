import type { UploadTask } from '@aws-amplify/storage';

export type SetShowPreviewer = (show: boolean) => void;
export type Files = File[];

export interface IconProps {
  className?: string;
  fontSize?: string;
}

export enum FileState {
  PAUSED = 'paused',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  RESUME = 'resume',
  EDITING = 'editing',
  INIT = 'init',
}

export interface FileStateProps {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}

export interface FileStatus extends Partial<FileStateProps> {
  percentage?: number;
  uploadTask?: UploadTask;
  fileErrors?: string;
  name?: string;
  file?: File;
}

export type FileStatuses = FileStatus[];
