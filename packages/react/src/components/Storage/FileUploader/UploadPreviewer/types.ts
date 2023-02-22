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
}
