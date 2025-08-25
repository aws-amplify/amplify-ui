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
  onOpenFilePreview: (p: FileData) => void;
  onCloseFilePreview: () => void;
  onRetryFilePreview: () => void;
}
