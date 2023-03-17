import { StorageAccessLevel } from '@aws-amplify/storage';
import { ReactNode } from 'react';
import { FileUploaderDisplayText } from '../displayText';

export interface FileUploaderProps {
  acceptedFileTypes: string[];
  isResumable?: boolean;
  accessLevel: StorageAccessLevel;
  maxFileCount?: number;
  maxFileSize?: number;
  onError?: (error: string) => void;
  onSuccess?: (event: { key: string }) => void;
  shouldAutoUpload?: boolean;
  showThumbnails?: boolean;
  displayText?: Partial<FileUploaderDisplayText>;
  children: ReactNode;
}
