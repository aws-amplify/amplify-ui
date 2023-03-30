import { StorageAccessLevel } from '@aws-amplify/storage';
import { StorageManagerDisplayText } from '../displayText';
import { DropZoneProps, FilePickerProps } from '../DropZone/types';
import { FileListProps } from '../FileList/types';
import { ContainerProps } from '../FileListContainer/FileListContainer';
import { FileListHeaderProps } from '../FileListHeader/FileListHeader';
import { DefaultFile, StorageFile } from '../types';

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
  defaultFiles?: Array<DefaultFile>;
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
   * Monitor upload errors
   */
  onUploadError?: (error: string) => void;
  /**
   * Monitor upload success
   */
  onUploadSuccess?: (event: { key: string }) => void;
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
