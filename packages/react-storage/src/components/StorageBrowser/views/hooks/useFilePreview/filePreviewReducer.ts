import type { FileData } from '../../../actions';
import type { FilePreviewState } from './types';

type FilePreviewAction =
  | { type: 'RESET_STATE' }
  | { type: 'START_PREVIEW_PREPARATION' }
  | {
      type: 'PREVIEW_PREPARATION_SUCCESS';
      payload: { fileData: FileData; url: string };
    }
  | { type: 'PREVIEW_PREPARATION_ERROR'; payload: Error }
  | { type: 'LIMIT_EXCEEDED' };

export const initialState: FilePreviewState = {
  isLoading: false,
  hasError: false,
  previewedFile: null,
  url: null,
  hasLimitExceeded: false,
  error: null,
};

export function filePreviewReducer(
  state: FilePreviewState,
  action: FilePreviewAction
): FilePreviewState {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;

    case 'START_PREVIEW_PREPARATION':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        hasLimitExceeded: false,
        error: null,
      };

    case 'PREVIEW_PREPARATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        previewedFile: action?.payload?.fileData,
        url: action.payload?.url,
        hasError: false,
        error: null,
      };

    case 'PREVIEW_PREPARATION_ERROR':
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action?.payload,
      };

    case 'LIMIT_EXCEEDED':
      return {
        ...state,
        isLoading: false,
        hasLimitExceeded: true,
      };

    default:
      return state;
  }
}
