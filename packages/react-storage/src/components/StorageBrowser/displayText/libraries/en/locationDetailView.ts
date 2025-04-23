import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultLocationDetailViewDisplayText } from '../../types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';

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
        default:
          return key;
      }
    },
    getTitle: (location) => {
      const { current, key } = location;
      const { bucket = '' } = current ?? {};
      return key || bucket;
    },
  };
