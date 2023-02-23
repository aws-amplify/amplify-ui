import { DisplayText } from '../displayText';
import { FileStatuses } from '../types';

export interface UploadPreviewerProps {
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
  displayText: Pick<
    DisplayText,
    | 'maxFilesError'
    | 'remainingFiles'
    | 'filesUploaded'
    | 'uploading'
    | 'clearButton'
    | 'uploadButton'
    | 'doneButton'
  >;
}
