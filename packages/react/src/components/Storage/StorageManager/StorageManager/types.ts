import { StorageAccessLevel } from '@aws-amplify/storage';
import { StorageManagerDisplayText } from '../displayText';

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
}
