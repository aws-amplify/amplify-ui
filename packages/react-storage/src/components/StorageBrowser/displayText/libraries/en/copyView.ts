import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCopyViewDisplayText } from '../../types';

export const DEFAULT_COPY_VIEW_DISPLAY_TEXT: DefaultCopyViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Copy',
  actionStartLabel: 'Copy',
  actionDestinationLabel: 'Copy destination:',
  getListFoldersResultsMessage: ({ folders, query, message }) => {
    if (!folders?.length) {
      return {
        content: query
          ? `No folders found matching "${query}"`
          : 'No subfolders found within selected folder.',
        type: 'info',
      };
    }

    if (message && !!query) {
      return { content: 'Error loading folders.', type: 'error' };
    }

    if (message) {
      return { content: 'Error loading folders.', type: 'error' };
    }
  },
  loadingIndicatorLabel: 'Loading',
  overwriteWarningMessage:
    'Copied files will overwrite existing files at selected destination.',
  searchPlaceholder: 'Search for folders',
  getActionCompleteMessage: (data) => {
    const { counts } = data ?? {};
    const { COMPLETE, FAILED, TOTAL } = counts ?? {};

    if (COMPLETE === TOTAL) {
      return {
        content: 'All files copied.',
        type: 'success',
      };
    }

    if (FAILED === TOTAL) {
      return { content: 'All files failed to copy.', type: 'error' };
    }

    return {
      content: `${COMPLETE} files copied, ${FAILED} files failed to copy.`,
      type: 'error',
    };
  },
};
