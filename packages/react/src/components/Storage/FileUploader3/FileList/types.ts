import { FileUploaderDisplayText } from '../displayText';
import { FileState, StorageFile } from '../types';

export interface FileListProps
  extends Pick<
    FileUploaderDisplayText,
    | 'extensionNotAllowedText'
    | 'pauseText'
    | 'resumeText'
    | 'getUploadingText'
    | 'getPausedText'
    | 'uploadSuccessfulText'
  > {
  files: StorageFile[];
  isResumable: boolean;
  showThumbnails: boolean;
}

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
  displayName: string;
  errorMessage: string;
  isImage: boolean;
  loaderIsDeterminate: boolean;
  // onCancelEdit?: () => void;
  // onPause: () => void;
  onRemove: () => void;
  // onResume: () => void;
  // onSaveEdit: (value: string) => void;
  onStartEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  progress: number;
  showThumbnails: boolean;
  size: number;
  status: FileState;
  url: string;
}

export interface FileStatusMessageProps
  extends Pick<
    FileUploaderDisplayText,
    'getUploadingText' | 'getPausedText' | 'uploadSuccessfulText'
  > {
  status: FileState;
  errorMessage: string;
  percentage?: number;
}

export interface UploadDetailsProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  displayName: string;
  showEditButton: boolean;
  fileSize: number;
}

export interface FileThumbnailProps {
  isImage: boolean;
  fileName: string;
  url: string;
}

export interface FileRemoveButtonProps {
  altText: string;
  onClick: () => void;
}
