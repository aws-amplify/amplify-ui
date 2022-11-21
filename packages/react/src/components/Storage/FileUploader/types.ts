import React from 'react';
import { UploadTask } from '@aws-amplify/storage';
import { DragActionHandlers } from './hooks/useFileUploader/types';

export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type Files = File[];

export interface UploadButtonProps {
  acceptedFileTypes: string[];
  hasMultipleFiles?: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isLoading?: boolean;
}

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
}

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  shouldAutoProceed?: boolean;
  hasMultipleFiles?: boolean;
  components?: Components;
  level: LevelInfo;
  maxFiles?: number;
  maxhasMultipleFilesSize?: number;
  isPreviewerVisible?: boolean;
  maxSize?: number;
  onChange?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  path?: string;
  showImages?: boolean;
  variation?: 'drop' | 'button';
  isResumable?: boolean;
}

export interface IconProps {
  className?: string;
  fontSize?: string;
}

export interface PreviewerProps extends DragActionHandlers {
  acceptedFileTypes: string[];
  children?: React.ReactNode;
  fileStatuses: FileStatuses;
  inDropZone?: boolean;
  isLoading: boolean;
  isSuccessful: boolean;
  hasMaxFilesError: boolean;
  hasMultipleFiles?: boolean;
  onClear: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileClick: () => void;
  percentage: number;
}

export interface TrackerProps {
  errorMessage: string;
  file: File;
  fileState: FileState;
  hasImage: boolean;
  name: string;
  onCancel: () => void;
  onCancelEdit?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  onPause: () => void;
  onResume: () => void;
  onSaveEdit: (value: string) => void;
  onStartEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  percentage: number;
  isResumable?: boolean;
  showImage: boolean;
  url: string;
}

export interface FileStatus extends Partial<FileStateProps> {
  percentage?: number;
  uploadTask?: UploadTask;
  fileErrors?: string;
  name?: string;
  file?: File;
}

export type FileStatuses = FileStatus[];

type FileState =
  | 'paused'
  | 'success'
  | 'error'
  | 'loading'
  | 'resume'
  | 'editing'
  | null;
export interface FileStateProps {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}

type UploadButtonComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploadButtonProps>
>;

type UploadDropZoneComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploadDropZoneProps>
>;

type PreviewerComponent<Props = {}> = React.ComponentType<
  Props & Partial<PreviewerProps>
>;

type TrackerComponent<Props = {}> = React.ComponentType<
  Props & Partial<TrackerProps>
>;

export interface Components {
  UploadDropZone?: UploadDropZoneComponent;
  UploadButton?: UploadButtonComponent;
  Previewer?: PreviewerComponent;
  Tracker?: TrackerComponent;
}
