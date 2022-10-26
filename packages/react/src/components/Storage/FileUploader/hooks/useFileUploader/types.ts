import { FileTypes } from '../../types';

export interface DragActionHandlers {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseFileUploader extends DragActionHandlers {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files?: FileTypes;
  setFiles?: React.Dispatch<React.SetStateAction<FileTypes>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
}
