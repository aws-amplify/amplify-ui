import type { UploadTask } from '@aws-amplify/storage';
import { StorageManagerDisplayText } from '../displayText';
import { FileStatus, StorageFile } from '../types';

export interface FileListProps {
  displayText: StorageManagerDisplayText;
  files: StorageFile[];
  isResumable: boolean;
  onRemoveUpload: (id: string) => void;
  onPause: (params: { id: string; uploadTask: UploadTask }) => void;
  onResume: (params: { id: string; uploadTask: UploadTask }) => void;
  showThumbnails: boolean;
  hasMaxFilesError: boolean;
  maxFileCount: number;
}

// interface ComponentFileListProps extends Omit<FileListProps, 'displayText'> {
// }

export interface FileControlProps {
  displayText: StorageManagerDisplayText;
  displayName: string;
  errorMessage: string;
  isImage: boolean;
  isResumable: boolean;
  isUploading: boolean;
  loaderIsDeterminate: boolean;
  onRemove: () => void;
  onPause: () => void;
  onResume: () => void;
  progress: number;
  showThumbnails: boolean;
  size?: number;
  status: FileStatus;
  thumbnailUrl: string;
}

export interface FileStatusMessageProps
  extends Pick<
    StorageManagerDisplayText,
    'getUploadingText' | 'getPausedText' | 'uploadSuccessfulText'
  > {
  status: FileStatus;
  errorMessage: string;
  percentage: number;
}

export interface UploadDetailsProps {
  displayName: string;
  fileSize?: number;
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
