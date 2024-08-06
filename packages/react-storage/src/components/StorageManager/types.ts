import * as React from 'react';

import type { StorageAccessLevel } from '@aws-amplify/core';

import {
  ContainerProps,
  DropZoneProps,
  FileListHeaderProps,
  FileListFooterProps,
  FileListProps,
  FilePickerProps,
} from './ui';
import { StorageManagerDisplayText, PathCallback, UploadTask } from './utils';

export enum FileStatus {
  ADDED = 'added',
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
  // only present after `processFile` complete
  processedKey?: string;
  uploadTask?: UploadTask;
  key: string;
  error: string;
  isImage: boolean;
}

export type StorageFiles = StorageFile[];

export type DefaultFile = Pick<StorageFile, 'key'>;

export interface ProcessFileParams extends Record<string, any> {
  file: File;
  key: string;
  useAccelerateEndpoint?: boolean;
}

export type ProcessFile = (
  params: ProcessFileParams
) => Promise<ProcessFileParams> | ProcessFileParams;

export interface StorageManagerHandle {
  clearFiles: () => void;
}

export interface StorageManagerProps {
  /**
   * List of accepted File types, values of `['*']` or undefined allow any files
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  acceptedFileTypes?: string[];
  /**
   * Access level for file uploads
   * @see https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/
   */
  accessLevel: StorageAccessLevel;

  /**
   * Determines if the upload will automatically start after a file is selected, default value: true
   */
  autoUpload?: boolean;
  /**
   * Component overrides
   */
  components?: {
    Container?: React.ComponentType<ContainerProps>;
    DropZone?: React.ComponentType<DropZoneProps>;
    FileList?: React.ComponentType<FileListProps>;
    FilePicker?: React.ComponentType<FilePickerProps>;
    FileListHeader?: React.ComponentType<FileListHeaderProps>;
    FileListFooter?: React.ComponentType<FileListFooterProps>;
  };
  /**
   * List of default files already uploaded
   */
  defaultFiles?: DefaultFile[];
  /**
   * Overrides default display text
   */
  displayText?: StorageManagerDisplayText;
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
  onUploadError?: (error: string, file: { key: string }) => void;
  /**
   * Monitor upload success
   */
  onUploadSuccess?: (event: { key?: string }) => void;
  /**
   * When a file begins uploading
   */
  onUploadStart?: (event: { key?: string }) => void;
  /**
   * Process file before upload
   */
  processFile?: ProcessFile;
  /**
   * Determines if thumbnails show for image files
   */
  showThumbnails?: boolean;
  /**
   * Provided value is prefixed to the file `key` for each file
   */
  path?: string;

  useAccelerateEndpoint?: boolean;
}

export interface StorageManagerPathProps
  extends Omit<StorageManagerProps, 'accessLevel' | 'path'> {
  /**
   * S3 bucket key, allows either a `string` or a `PathCallback`:
   * - `string`: `path` is prefixed to the file `key` for each file
   * - `PathCallback`: callback provided an input containing the current `identityId`,
   *    resolved value is prefixed to the file `key` for each file
   */
  path: string | PathCallback;
  accessLevel?: never;
  useAccelerateEndpoint?: boolean;
}
