import { StorageManagerDisplayText } from '../displayText';

export interface DropZoneProps {
  acceptedFileTypes: string[];
  children?: React.ReactNode;
  displayText: StorageManagerDisplayText;
  isLoading?: boolean;
  onChange: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface UseDropZoneProps extends Pick<DropZoneProps, 'onChange'> {}
export interface UseDropZoneReturn {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  inDropZone: boolean;
}
