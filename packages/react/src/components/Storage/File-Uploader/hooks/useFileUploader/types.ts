export type SetFileType = File[];

export interface DragActionHandlers {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseFileUploader {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files?: SetFileType;
  setFiles?: React.Dispatch<React.SetStateAction<SetFileType>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  getDropEvents?: DragActionHandlers;
}
