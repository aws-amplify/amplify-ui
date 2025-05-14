import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultDownloadViewDisplayText } from '../../types';

export const DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT: DefaultDownloadViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'Download',
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
