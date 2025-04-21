import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultDownloadMultipleViewDisplayText } from '../../types';

export const DEFAULT_DOWNLOAD_MULTIPLE_VIEW_DISPLAY_TEXT: DefaultDownloadMultipleViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'DownloadMultiple',
    actionStartLabel: 'Download',
    getActionCompleteMessage: (data) => {
      const { counts } = data ?? {};
      const { COMPLETE, FAILED, TOTAL } = counts ?? {};

      if (COMPLETE === TOTAL) {
        return { content: 'All files downloaded.', type: 'success' };
      }

      if (FAILED === TOTAL) {
        return { content: 'All files failed to download.', type: 'error' };
      }

      return {
        content: `${COMPLETE} files downloaded, ${FAILED} files failed to download.`,
        type: 'error',
      };
    },
  };
