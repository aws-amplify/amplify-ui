import { FileStatuses } from '../../types';

export interface DragActionHandlers {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseFileUploader extends DragActionHandlers {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  fileStatuses: FileStatuses;
  setFileStatuses: React.Dispatch<React.SetStateAction<FileStatuses>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  addTargetFiles?: (targetFiles: File[]) => number;
}
