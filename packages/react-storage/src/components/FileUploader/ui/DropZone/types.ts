import { FileUploaderDisplayText } from '../../utils/displayText';

export interface DropZoneProps {
  children?: React.ReactNode;
  displayText: FileUploaderDisplayText;
  inDropZone: boolean;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  testId?: string;
}
