import React from 'react';
import { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';
import { DragActionHandlers } from './hooks/useFileUploader/types';
import { ButtonProps } from '../../../primitives';

export type SetShowPreviewer = (show: boolean) => void;
export type Files = File[];

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
}

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  hasMultipleFiles?: boolean;
  isPreviewerVisible?: boolean;
  isResumable?: boolean;
  accessLevel: StorageAccessLevel;
  maxFiles?: number;
  maxSize?: number;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  shouldAutoProceed?: boolean;
  showImages?: boolean;
  variation?: 'drop' | 'button';
}

export interface IconProps {
  className?: string;
  fontSize?: string;
}

export interface PreviewerProps {
  aggregatePercentage: number;
  children?: React.ReactNode;
  dropZone: React.ReactNode;
  fileStatuses: FileStatuses;
  isLoading: boolean;
  isSuccessful: boolean;
  hasMaxFilesError: boolean;
  onClear: () => void;
  onFileClick: () => void;
}

export interface TrackerProps {
  errorMessage: string;
  file: File;
  fileState: FileState;
  hasImage: boolean;
  name: string;
  onCancel: () => void;
  onCancelEdit?: () => void;
  onPause: () => void;
  onResume: () => void;
  onSaveEdit: (value: string) => void;
  onStartEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  percentage: number;
  isResumable?: boolean;
  showImage: boolean;
}

export interface FileStatus extends Partial<FileStateProps> {
  percentage?: number;
  uploadTask?: UploadTask;
  fileErrors?: string;
  name?: string;
  file?: File;
}

export type FileStatuses = FileStatus[];

export type FileState =
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
  Props & Partial<ButtonProps>
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
  UploadPreviewer?: PreviewerComponent;
  UploadTracker?: TrackerComponent;
}
