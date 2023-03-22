import { StorageManagerDisplayText } from '../displayText';
import { FileState, StorageFile } from '../types';

export interface FileListProps {
  displayText: StorageManagerDisplayText;
  files: StorageFile[];
  isResumable: boolean;
  onRemoveUpload: (id: string) => void;
  showThumbnails: boolean;
}

// interface ComponentFileListProps extends Omit<FileListProps, 'displayText'> {
// }

interface FileListFooter {
  hasMaxFilesError: boolean;
  displayText: StorageManagerDisplayText;
  allUploadsPercentage: number;
  allUploadsSuccessful: boolean;
  aggregatePercentage: number;
  isLoading: boolean;
  isSuccessful: boolean;
  fileCount: number;
}

export interface FileControlProps {
  displayText: StorageManagerDisplayText;
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
  thumbnailUrl: string;
}

export interface FileStatusMessageProps
  extends Pick<
    StorageManagerDisplayText,
    'getUploadingText' | 'getPausedText' | 'uploadSuccessfulText'
  > {
  status: FileState;
  errorMessage: string;
  percentage: number;
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
