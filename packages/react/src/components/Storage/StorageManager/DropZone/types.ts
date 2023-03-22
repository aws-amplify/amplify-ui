import { StorageManagerDisplayText } from '../displayText';

export interface DropZoneProps {
  acceptedFileTypes: string[];
  children?: React.ReactNode;
  displayText: StorageManagerDisplayText;
  isLoading?: boolean;
  onChange: (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
}
