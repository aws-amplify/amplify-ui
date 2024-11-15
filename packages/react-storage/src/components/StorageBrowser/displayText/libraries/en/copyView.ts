import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCopyViewDisplayText } from '../../types';

export const DEFAULT_COPY_VIEW_DISPLAY_TEXT: DefaultCopyViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Copy',
  actionStartLabel: 'Copy',
  actionDestinationLabel: 'Copy destination:',
  getFolderListResultsMessage: ({ folders, query, defaultMessage }) => {
    if (!folders?.length) {
      return query
        ? `No folders found matching "${query}"`
        : 'No subfolders found within selected folder.';
    }

    return defaultMessage;
  },
  loadingIndicatorLabel: 'Loading',
  overwriteWarningMessage:
    'Copied files will overwrite existing files at selected destination.',
  getActionCompleteMessage: (_counts) => {
    return 'All copy operations complete.';
  },
  getFolderSelectedMessage: (key: string) => {
    return `Current folder selected: ${key}. There are no additional folders under this path.`;
  },
  searchPlaceholder: 'Search for folders',
  searchSubmitLabel: 'Submit',
  searchClearLabel: 'Clear search',
};
