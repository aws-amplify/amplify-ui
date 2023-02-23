import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadTrackerProps {
  errorMessage: string;
  file: File;
  fileState: FileState;
  hasImage: boolean;
  name: string;
  onCancel: () => void;
  onCancelEdit?: () => void;
  onPause: () => void;
  onResume: () => void;
  onSaveEdit: (value: string) => void;
  onStartEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  percentage: number;
  isResumable?: boolean;
  showImage: boolean;
  displayText: Pick<
    FileUploaderDisplayText,
    | 'extensionNotAllowed'
    | 'pause'
    | 'resume'
    | 'uploading'
    | 'paused'
    | 'uploadSuccessful'
  >;
}
