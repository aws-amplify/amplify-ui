export type SetFileType = File[];

export interface DropZoneInterface {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseFileUploader {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files?: SetFileType;
  setFiles?: React.Dispatch<React.SetStateAction<SetFileType>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  getDropEvents?: DropZoneInterface;
}
