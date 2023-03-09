import { FileStatus, FileStatuses } from '../../types';

export interface DragActionHandlers {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseFileUploader extends DragActionHandlers {
  showPreviewer?: boolean;
  fileStatuses: FileStatuses;
  setFileStatuses: (
    fileStatuses: FileStatus[] | ((prevState: FileStatus[]) => FileStatus[])
  ) => void;
  clearFiles: () => void;
  inDropZone?: boolean;
  addTargetFiles?: (targetFiles: File[]) => void;
}

export interface UseFileUploaderProps {
  maxFileSize: number;
  acceptedFileTypes: string[];
  allowMultipleFiles: boolean;
  isLoading: boolean;
}
