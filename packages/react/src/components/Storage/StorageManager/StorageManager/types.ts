import { StorageAccessLevel } from '@aws-amplify/storage';
import { StorageManagerDisplayText } from '../displayText';

export interface StorageManagerProps {
  acceptedFileTypes: string[];
  isResumable?: boolean;
  accessLevel: StorageAccessLevel;
  maxFileCount?: number;
  maxFileSize?: number;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  shouldAutoUpload?: boolean;
  showThumbnails?: boolean;
  displayText?: Partial<StorageManagerDisplayText>;
}
