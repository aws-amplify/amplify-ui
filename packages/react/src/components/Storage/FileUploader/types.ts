import React from 'react';
import { DragActionHandlers } from './hooks/useFileUploader/types';
import { FileName } from '@aws-amplify/ui';

export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type Files = File[];

export interface UploaderButtonProps {
  acceptedFileTypes: string[];
  multiple?: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
}

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  fileNames?: FileName;
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

export interface FilePreviewerProps {
  fileNames: FileName;
  level: LevelInfo;
  files: File[];
  onClose: () => void;
}

type UploadDropZoneComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploadDropZoneProps>
>;
export interface Components {
  UploadDropZone?: UploadDropZoneComponent;
}
