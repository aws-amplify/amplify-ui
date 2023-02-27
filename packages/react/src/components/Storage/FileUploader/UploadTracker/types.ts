import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadTrackerProps
  extends Pick<
    FileUploaderDisplayText,
    | 'extensionNotAllowedText'
    | 'pauseText'
    | 'resumeText'
    | 'getUploadingText'
    | 'getPausedText'
    | 'uploadSuccessfulText'
  > {
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
  handleUploadFile: () => void;
  percentage: number;
  isResumable?: boolean;
  showImage: boolean;
  shouldAutoLoad: boolean;
}
