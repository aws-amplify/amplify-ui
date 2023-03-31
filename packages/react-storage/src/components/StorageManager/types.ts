import type { StorageAccessLevel, UploadTask } from '@aws-amplify/storage';

import { DropZoneProps, FilePickerProps } from './ui/DropZone';
import { FileListProps } from './ui/FileList';
import { ContainerProps } from './ui/Container';
import { FileListHeaderProps } from './ui/FileListHeader';
import { StorageManagerDisplayText } from './utils';

export enum FileStatus {
  QUEUED = 'queued',
  UPLOADING = 'uploading',
  PAUSED = 'paused',
  ERROR = 'error',
  UPLOADED = 'uploaded',
}

export interface StorageFile {
  id: string;
  file?: File;
  status: FileStatus;
  progress: number;
  uploadTask?: UploadTask;
  key: string;
  error: string;
  isImage: boolean;
}

export type StorageFiles = StorageFile[];

export type DefaultFile = Pick<StorageFile, 'key'>;

export interface StorageManagerProps {
  /**
   * List of accepted File types
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  acceptedFileTypes: string[];
  /**
   * Access level for file uploads
   * @see https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/
   */
  accessLevel: StorageAccessLevel;
  /**
   * Component overrides
   */
  components?: {
    Container?: (props: ContainerProps) => JSX.Element;
    DropZone?: (props: DropZoneProps) => JSX.Element;
    FileList?: (props: FileListProps) => JSX.Element;
    FilePicker?: (props: FilePickerProps) => JSX.Element;
    FileListHeader?: (props: FileListHeaderProps) => JSX.Element;
  };
  /**
   * List of default files already uploaded
   */
  defaultFiles?: DefaultFile[];
  /**
   * Overrides default display text
   */
  displayText?: Partial<StorageManagerDisplayText>;
  /**
   * Determines if upload can be paused / resumed
   */
  isResumable?: boolean;
  /**
   * Maximum total files to upload in each batch
   */
  maxFileCount: number;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  /**
   * When a file is removed
   */
  onFileRemove?: (file: { key: string }) => void;
  /**
   * Monitor upload errors
   */
  onUploadError?: (error: string) => void;
  /**
   * Monitor upload success
   */
  onUploadSuccess?: (event: { key?: string }) => void;
  /**
   * Process file before upload
   */
  processFile?: (
    storageFile: Required<Pick<StorageFile, 'file' | 'key'>>
  ) => Required<Pick<StorageFile, 'file' | 'key'>>;
  /**
   * Determines if thumbnails show for image files
   */
  showThumbnails?: boolean;
  /**
   * Storage provider name
   * @see https://docs.amplify.aws/lib/storage/custom-plugin/q/platform/js/
   */
  provider?: string;
}
