import type { FileData } from '../../../actions';

export interface FilePreviewData {
  isLoading?: boolean;
  hasError?: boolean;
  selectedObject?: FileData | null;
  url?: string | null;
  hasLimitExceeded?: boolean;
  error?: Error | null;
}

export interface UseFilePreviewReturn extends FilePreviewData {
  openFilePreview: (p: FileData) => void;
  closeFilePreview: () => void;
  retryFilePreview: () => void;
}
