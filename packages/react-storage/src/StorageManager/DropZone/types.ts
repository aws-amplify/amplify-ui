import { StorageManagerDisplayText } from '../displayText';

export interface DropZoneProps {
  acceptedFileTypes: string[];
  children?: React.ReactNode;
  displayText: StorageManagerDisplayText;
  isLoading?: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  inDropZone: boolean;
}

export interface FilePickerProps {
  acceptedFileTypes: string[];
  displayText: StorageManagerDisplayText;
  allowMultipleFiles: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
