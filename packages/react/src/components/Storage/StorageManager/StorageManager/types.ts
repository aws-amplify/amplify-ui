import { StorageAccessLevel } from '@aws-amplify/storage';
import { StorageManagerDisplayText } from '../displayText';
import { DropZoneProps, FilePickerProps } from '../DropZone/types';
import { FileListProps } from '../FileList/types';
import { ContainerProps } from '../FileListContainer/FileListContainer';
import { FileListHeaderProps } from '../FileListHeader/FileListHeader';
import { DefaultFile, StorageFile } from '../types';

export type OnFilesChange = (
  files: Array<Pick<StorageFile, 'file' | 'name' | 'status'>>
) => void;

export interface StorageManagerProps {
  acceptedFileTypes: string[];
  /**
   * Determines if upload can be paused/resumed
   */
  isResumable?: boolean;
  /**
   * Access level for file uploads
   * @see https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/
   */
  accessLevel: StorageAccessLevel;
  /**
   * Maximum total files to upload in one batch
   */
  maxFileCount?: number;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  onUploadError?: (error: string) => void;
  onUploadSuccess?: (event: { key: string }) => void;
  shouldAutoUpload?: boolean;
  showThumbnails?: boolean;
  displayText?: Partial<StorageManagerDisplayText>;
  defaultFiles?: Array<DefaultFile>;
  processFile?: (
    storageFile: Required<Pick<StorageFile, 'file' | 'name'>>
  ) => Required<Pick<StorageFile, 'file' | 'name'>>;
  components?: {
    Container?: (props: ContainerProps) => JSX.Element;
    DropZone?: (props: DropZoneProps) => JSX.Element;
    FileList?: (props: FileListProps) => JSX.Element;
    FilePicker?: (props: FilePickerProps) => JSX.Element;
    FileListHeader?: (props: FileListHeaderProps) => JSX.Element;
  };
  provider?: string;
  onFilesChange?: OnFilesChange;
}
