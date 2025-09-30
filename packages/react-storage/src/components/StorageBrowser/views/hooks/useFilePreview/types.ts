import type { FileData } from '../../../actions';

export type OKFilePreviewContent = {
  ok: true;
  isLoading: false;
  fileData: FileData;
  url: string;
};
export type FailFilePreviewContent = {
  isLoading: false;
  ok: false;
  error: string;
};
export type LoadingFilePreviewContent = {
  isLoading: true;
};

export type FilePreviewContent =
  | OKFilePreviewContent
  | FailFilePreviewContent
  | LoadingFilePreviewContent;

type DisabledFilePreviewState = {
  enabled: false;
};

export type EnabledFilePreviewState = FilePreviewContent & {
  enabled: true;
};

export type FilePreviewState =
  | EnabledFilePreviewState
  | DisabledFilePreviewState;

export type UseFilePreviewState = FilePreviewState & {
  optout: boolean;
  handleRetry: () => void;
};
