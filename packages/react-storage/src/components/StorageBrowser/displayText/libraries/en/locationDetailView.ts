import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationDetailViewDisplayText } from '../../types';

export const DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT: DefaultLocationDetailViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    getListResultsMessage: () => 'help me',
    searchExhaustedMessage: 'Showing results for up to the first 10,000 items',
    searchIncludeSubfoldersLabel: 'Include subfolders',
    searchPlaceholder: 'Search current folder',
    tableColumnLastModifiedHeader: 'Last modified',
    tableColumnNameHeader: 'Name',
    tableColumnSizeHeader: 'Size',
    tableColumnTypeHeader: 'Type',
    title: (location) => {
      const { current, key } = location;
      const { bucket = '', prefix } = current ?? {};
      return prefix ? key : bucket;
    },
  };
