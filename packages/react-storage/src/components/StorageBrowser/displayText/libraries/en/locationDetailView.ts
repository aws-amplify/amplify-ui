import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationDetailViewDisplayText } from '../../types';

export const DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT: DefaultLocationDetailViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    getListResultsMessage: () => 'help me',
    searchExhaustedMessage: 'Showing results for up to the first 10,000 items',
    searchSubfoldersToggleLabel: 'Include subfolders',
    searchPlaceholder: 'Search current folder',
    tableColumnLastModifiedHeader: 'Last modified',
    tableColumnNameHeader: 'Name',
    tableColumnSizeHeader: 'Size',
    tableColumnTypeHeader: 'Type',
    selectFileLabel: 'Select file',
    selectAllFilesLabel: 'Select all files',
    title: (location) => {
      const { current, key } = location;
      const { bucket = '' } = current ?? {};
      return key || bucket;
    },
  };
