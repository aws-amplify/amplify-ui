import React from 'react';
import { UploadTask } from '@aws-amplify/storage';
import { DragActionHandlers } from './hooks/useFileUploader/types';

export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type Files = File[];

export interface UploadButtonProps {
  acceptedFileTypes: string[];
  multiple?: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isLoading?: boolean;
  hiddenInput: React.MutableRefObject<HTMLInputElement>;
  onClick: () => void;
}

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
}

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  fileNames?: string[];
  multiple?: boolean;
  components?: Components;
  level: LevelInfo;
  maxFiles?: number;
  maxMultipleSize?: number;
  isPreviewerVisible?: boolean;
  maxSize?: number;
  onChange?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  path?: string;
  variation?: 'drop' | 'button';
  resumable?: boolean;
}

export interface IconProps {
  className?: string;
  fontSize?: string;
}

export interface PreviewerProps extends DragActionHandlers {
  acceptedFileTypes: string[];
  children?: React.ReactNode;
  fileStatuses: FileStatuses;
  hiddenInput: React.MutableRefObject<HTMLInputElement>;
  inDropZone?: boolean;
  isEditingName: boolean[];
  isLoading: boolean;
  isSuccess: boolean;
  maxFilesError: boolean;
  multiple?: boolean;
  onClear: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileClick: () => void;
  onUploadButtonClick: () => void;
  percentage: number;
}

export interface TrackerProps {
  file: File;
  fileState: FileState;
  hasImage: boolean;
  url: string;
  resumable?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
  onDelete?: () => void;
  name: string;
  percentage: number;
  errorMessage: string;
  isEditing: boolean;
  onSaveEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancelEdit?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onStartEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
