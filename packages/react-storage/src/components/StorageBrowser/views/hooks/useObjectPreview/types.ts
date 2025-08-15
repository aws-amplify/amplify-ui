import type { FileData } from '../../../actions';

export interface ObjectPreviewData {
  isLoading?: boolean;
  hasError?: boolean;
  selectedObject?: FileData | null;
  url?: string | null;
  hasLimitExceeded?: boolean;
  error?: Error | null;
}

export interface UseObjectPreviewReturn extends ObjectPreviewData {
  openFilePreview: (p: FileData) => void;
  closeFilePreview: () => void;
  retryFilePreview: () => void;
}
