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

export interface DropZoneInterface {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface ComponentsProviderProps {
  FileUploaderDrop?: React.ComponentType<FileUploaderTransferProps>;
}
