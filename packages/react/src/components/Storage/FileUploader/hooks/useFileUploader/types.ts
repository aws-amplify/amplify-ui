import { Files, FileStatuses } from '../../types';

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
  files?: Files;
  fileStatuses: FileStatuses;
  setFileStatuses: React.Dispatch<React.SetStateAction<FileStatuses>>;
  setFiles?: React.Dispatch<React.SetStateAction<Files>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  addTargetFiles?: (targetFiles: FileList) => number;
  setFileSizeErrors?: (files: Files, fileStatuses: FileStatuses) => void;
}
