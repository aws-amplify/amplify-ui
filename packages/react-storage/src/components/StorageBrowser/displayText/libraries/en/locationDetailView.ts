import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import type {
  DefaultLocationDetailViewDisplayText,
  DefaultFilePreviewDisplayText,
} from '../../types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';

const DEFAULT_FILE_PREVIEW_DISPLAY_TEXT: DefaultFilePreviewDisplayText = {
  closeButtonLabel: 'Close',
  filePreviewTitle: 'File Preview',
  fileInformationTitle: 'File Information',
  errorMessage: 'Something went wrong',
  sizeLimitMessage: 'File preview not possible due to preview size limit',
  unsupportedFileMessage: 'File preview not supported for this file type',
  keyLabel: 'Key',
  sizeLabel: 'Size',
  versionIdLabel: 'Version Id',
  lastModifiedLabel: 'Last Modified',
  entityTagLabel: 'Entity tag',
  typeLabel: 'Type',
  unknownValue: 'Unknown',
  errorDescription: 'We encountered an issue while loading the file preview.',
  unsupportedFileDescription:
    'This file format is not supported for preview. You can download the file to view it with an appropriate application.',
  imageLoadErrorDescription:
    'The image could not be loaded. This may be due to network issues, file corruption, or an unsupported image format.',
  videoLoadErrorDescription:
    'The video could not be played. This may be due to network issues, file corruption, or an unsupported video format or codec.',
  textLoadErrorDescription:
    'The text file could not be loaded. This may be due to network issues, file access permissions, or the file being too large to display.',
  generalPreviewErrorDescription:
    'An unexpected error occurred while loading the file preview. Please try again or download the file to view it with an appropriate application.',
  fileSizeLimitDescription:
    'This file is too large to preview in the browser. You can download the file to view it with an appropriate application.',
  filePrefix: 'File: ',
  retryButtonLabel: 'Retry',
  downloadButtonLabel: 'Download',
  getTextErrorMessage: (error) => `Error loading file: ${error}`,
  emptyFileMessage: 'File is empty',
};

export const DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT: DefaultLocationDetailViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    getListItemsResultMessage: (data) => {
      const {
        items,
        hasExhaustedSearch,
        hasError = false,
        message,
        isLoading,
      } = data ?? {};

      if (isLoading) {
        return undefined;
      }

      if (hasError) {
        return {
          type: 'error',
          content: message ?? DEFAULT_ERROR_MESSAGE,
        };
      }

      if (!items?.length && hasExhaustedSearch) {
        return {
          type: 'info',
          content: `No results found in the first 10,000 items.`,
        };
      }

      if (!items?.length) {
        return {
          type: 'info',
          content: 'No files.',
        };
      }

      if (hasExhaustedSearch) {
        return {
          type: 'info',
          content: `Showing results for up to the first 10,000 items.`,
        };
      }

      // TODO: add more cases as needed

      return undefined;
    },
    searchSubfoldersToggleLabel: 'Include subfolders',
    searchPlaceholder: 'Search current folder',
    tableColumnLastModifiedHeader: 'Last modified',
    tableColumnNameHeader: 'Name',
    tableColumnSizeHeader: 'Size',
    tableColumnTypeHeader: 'Type',
    selectFileLabel: 'Select file',
    selectAllFilesLabel: 'Select all files',
    getActionListItemLabel: (key: string = '') => {
      switch (key) {
        case 'Copy':
          return 'Copy';
        case 'Delete':
          return 'Delete';
        case 'Create folder':
          return 'Create folder';
        case 'Upload':
          return 'Upload';
        case 'Download':
          return 'Download';
        default:
          return key;
      }
    },
    getTitle: (location) => {
      const { current, key } = location;
      const { bucket = '' } = current ?? {};
      return key || bucket;
    },
    filePreview: DEFAULT_FILE_PREVIEW_DISPLAY_TEXT,
  };
