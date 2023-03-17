import { FileUploaderDisplayText } from '../displayText';

export interface DropZoneProps
  extends Pick<FileUploaderDisplayText, 'dropFilesText'> {
  browseFilesText: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onChange: (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
}
