import { UploadDataOutput } from 'aws-amplify/storage';

import { StorageManagerDisplayTextDefault } from '../../utils';
import { FileStatus, StorageFile } from '../../types';

export interface FileListProps {
  displayText: StorageManagerDisplayTextDefault;
  files: StorageFile[];
  isResumable: boolean;
  onCancelUpload: (params: {
    id: string;
    uploadTask: UploadDataOutput;
  }) => void;
  onDeleteUpload: (params: { id: string }) => void;
  onPause: (params: { id: string; uploadTask: UploadDataOutput }) => void;
  onResume: (params: { id: string; uploadTask: UploadDataOutput }) => void;
  showThumbnails: boolean;
  hasMaxFilesError: boolean;
  maxFileCount: number;
}

export interface FileControlProps {
  displayText: StorageManagerDisplayTextDefault;
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
    StorageManagerDisplayTextDefault,
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
