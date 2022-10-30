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
}

export interface IconProps {
  className?: string;
  fontSize?: string;
}

export interface PreviewerProps extends DragActionHandlers {
  files: File[];
  onClear: () => void;
  acceptedFileTypes: string[];
  multiple?: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inDropZone?: boolean;
  onFileCancel: (index: number) => void;
  onFileClick: () => void;
  onNameChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  allFileNames: string[];
  fileStatuses: FileStatuses;
  onPause: (index: number) => () => void;
  onResume: (index: number) => () => void;
  onDelete: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  percentage: number;
  isEditingNames: boolean[];
  saveEdit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  cancelEdit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  startEdit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
}

export interface TrackerProps {
  file: File;
  hasImage: boolean;
  url: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
  onDelete?: () => void;
  name: string;
  percentage: number;
  isLoading: boolean;
  isPaused: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  isEditing: boolean;
  saveEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  cancelEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  startEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface FileStatus extends Partial<FileStateProps> {
  percentage?: number;
  uploadTask?: UploadTask;
  fileErrors?: string;
}

export type FileStatuses = FileStatus[];

export interface FileStateProps {
  loading: boolean;
  success: boolean;
  error: boolean;
  paused: boolean;
  errorMessage: string;
}

type UploadButtonComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploadButtonProps>
>;

type UploadDropZoneComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploadDropZoneProps>
>;
export interface Components {
  UploadDropZone?: UploadDropZoneComponent;
  UploadButton?: UploadButtonComponent;
}
