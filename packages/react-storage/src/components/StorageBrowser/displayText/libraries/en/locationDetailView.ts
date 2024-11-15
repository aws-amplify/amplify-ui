import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationDetailViewDisplayText } from '../../types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';

export const DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT: DefaultLocationDetailViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    getListItemsResultMessage: (data) => {
      const {
        items,
        query,
        hasExhaustedSearch,
        hasError = false,
        message,
      } = data ?? {};

      if (hasError) {
        return {
          type: 'error',
          content: message ?? DEFAULT_ERROR_MESSAGE,
        };
      }

      if (!items?.length) {
        return {
          type: 'info',
          content: 'No files.',
        };
      }

      if (query && hasExhaustedSearch) {
        return {
          type: 'warning',
          content: `No more folders or files found by ${query}.`,
        };
      }

      // TODO: add more cases as needed

      return undefined;
    },
    searchExhaustedMessage: 'Showing results for up to the first 10,000 items',
    searchSubfoldersToggleLabel: 'Include subfolders',
    searchPlaceholder: 'Search current folder',
    tableColumnLastModifiedHeader: 'Last modified',
    tableColumnNameHeader: 'Name',
    tableColumnSizeHeader: 'Size',
    tableColumnTypeHeader: 'Type',
    selectFileLabel: 'Select file',
    selectAllFilesLabel: 'Select all files',
    getTitle: (location) => {
      const { current, key } = location;
      const { bucket = '' } = current ?? {};
      return key || bucket;
    },
  };
