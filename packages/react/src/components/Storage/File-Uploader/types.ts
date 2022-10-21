import React from 'react';
import { DragActionHandlers } from './hooks/useFileUploader/types';
import { FileName } from '@aws-amplify/ui';

export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type SetFileType = File[];

export interface UploaderButtonProps {
  acceptedFileTypes: Array<string>;
  multiple?: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UploaderDropProps {
  children?: React.ReactNode;
  inDropZone?: boolean;
  getDropEvents?: DragActionHandlers;
}

export interface FileUploaderProps {
  acceptedFileTypes: Array<string>;
  fileNames?: FileName;
  multiple?: boolean;
  components?: ComponentsProviderProps;
  level: LevelInfo;
  maxFiles?: number;
  maxMultipleSize?: number;
  isPreviewerVisible?: boolean;
  maxSize?: number;
  onChange?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  path?: string;
  showPreview?: boolean;
  variation?: 'drop' | 'button';
}

export interface FilePreviewerProps {
  fileNames: FileName;
  level: LevelInfo;
  files: File[];
  onClose: () => void;
}

type UploaderDropComponent<Props = {}> = React.ComponentType<
  Props & Partial<UploaderDropProps>
>;
export interface ComponentsProviderProps {
  UploaderDrop?: UploaderDropComponent;
}
