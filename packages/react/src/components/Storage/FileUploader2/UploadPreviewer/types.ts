import { FileUploaderDisplayText } from '../displayText';
import { FileStatuses } from '../types';

export interface UploadPreviewerProps
  extends Pick<
    FileUploaderDisplayText,
    | 'getMaxFilesErrorText'
    | 'getRemainingFilesText'
    | 'getFilesUploadedText'
    | 'getUploadingText'
    | 'clearButtonText'
    | 'getUploadButtonText'
    | 'doneButtonText'
  > {
  aggregatePercentage: number;
  children?: React.ReactNode;
  dropZone: React.ReactNode;
  fileStatuses: FileStatuses;
  isLoading: boolean;
  isSuccessful: boolean;
  hasMaxFilesError: boolean;
  maxFileCount: number;
  onClear: () => void;
  onFileClick: () => void;
}
