import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface FileControlProps
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
  displayName: string;
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

export interface FileStatusMessageProps
  extends Pick<
    FileUploaderDisplayText,
    'getUploadingText' | 'getPausedText' | 'uploadSuccessfulText'
  > {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}

export interface FileDetailsProps {
  file: File;
  onStartEdit: React.MouseEventHandler<HTMLButtonElement>;
  fileState: FileState;
  extensionNotAllowedText: string;
  errorMessage: string;
  displayName: string;
}

export interface FileThumbnailProps {
  hasImage: boolean;
  showImage: boolean;
  file: File;
  url: string;
}

export interface FileActionsProps {
  fileState: FileState;
  file: File;
  onCancel: () => void;
}
