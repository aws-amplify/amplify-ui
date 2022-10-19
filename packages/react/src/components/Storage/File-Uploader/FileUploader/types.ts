import { DropZoneInterface } from '@aws-amplify/ui-react-core';
import { FileName } from '@aws-amplify/ui';
export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type SetFileType = File[];

interface BaseFileProps {
  accept?: Array<string>;
  fileName?: FileName;
  multiple?: boolean;
}
export interface FileUploaderTransferProps extends BaseFileProps {
  setFiles?: (file: SetFileType) => void;
  setShowPreviewer?: SetShowPreviewer;
  inDropZone?: boolean;
  getDropEvents?: DropZoneInterface;
  children?: React.ReactNode;
}

export interface FileUploaderProps extends BaseFileProps {
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
  fileName: FileName;
  level: LevelInfo;
  setShowPreviewer: SetShowPreviewer;
  files: File[];
}

export interface ComponentsProviderProps {
  FileUploaderDrop?: React.ComponentType<FileUploaderTransferProps>;
}
