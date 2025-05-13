import type { FileUploaderDisplayTextDefault, TaskHandler } from '../../utils';
import type { FileStatus, StorageFile } from '../../types';

export interface FileListProps {
  displayText: FileUploaderDisplayTextDefault;
  files: StorageFile[];
  isResumable: boolean;
  onCancelUpload: TaskHandler;
  onDeleteUpload: (params: { id: string }) => void;
  onPause: TaskHandler;
  onResume: TaskHandler;
  showThumbnails: boolean;
  hasMaxFilesError: boolean;
  maxFileCount: number;
}

export interface FileControlProps {
  displayText: FileUploaderDisplayTextDefault;
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
    FileUploaderDisplayTextDefault,
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
