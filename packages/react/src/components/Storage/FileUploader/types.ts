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
  onError?: () => void;
  onSuccess?: () => void;
  path?: string;
  variation?: 'drop' | 'button';
}

export interface IconProps {
  className?: string;
}

export interface PreviewerProps extends DragActionHandlers {
  fileNames: string[];
  level: LevelInfo;
  files: File[];
  onClear: () => void;
  acceptedFileTypes: string[];
  multiple?: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inDropZone?: boolean;
  onFileCancel: (index: number) => void;
  onNameChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  allFileNames: string[];
}

export interface TrackerProps {
  file: File;
  hasImage: boolean;
  url: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  name: string;
}

interface FileStatus {
  percentage: number;
  uploadTask: UploadTask;
  pause: boolean;
}

export type FileStatuses = FileStatus[];

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
