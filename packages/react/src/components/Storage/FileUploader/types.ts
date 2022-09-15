import { ComponentsProviderProps } from '../hooks';

export type FileName = string | Array<string>;
export type SetShowPreviewer = (show: boolean) => void;
type LevelInfo = 'public' | 'protected' | 'private';
export type SetFileType = File[];

interface BaseFileProps {
  accept?: Array<string>;
  fileName?: FileName;
  multiple?: boolean;
}
export interface FileUploaderTransferProps extends BaseFileProps {
  children?: React.ReactNode;
}

export interface FileUploaderProps extends BaseFileProps {
  components?: ComponentsProviderProps;
  level: LevelInfo;
  maxFiles?: number;
  maxMultipleSize?: number;
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
}
