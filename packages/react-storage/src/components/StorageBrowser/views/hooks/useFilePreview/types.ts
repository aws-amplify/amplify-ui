import type { FileData } from '../../../actions';

export interface FilePreviewState {
  isLoading?: boolean;
  hasError?: boolean;
  previewedFile?: FileData | null;
  url?: string | null;
  hasLimitExceeded?: boolean;
  error?: Error | null;
}

export interface UseFilePreviewReturn extends FilePreviewState {
  openFilePreview: (p: FileData) => void;
  closeFilePreview: () => void;
  retryFilePreview: () => void;
}
