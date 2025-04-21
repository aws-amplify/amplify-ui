import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultDeleteViewDisplayText } from '../../types';

export const DEFAULT_DELETE_VIEW_DISPLAY_TEXT: DefaultDeleteViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Delete',
  actionStartLabel: 'Delete',
  getActionCompleteMessage: (data) => {
    const { counts } = data ?? {};
    const { COMPLETE, FAILED, TOTAL } = counts ?? {};

    if (COMPLETE === TOTAL) {
      return { content: 'All files deleted.', type: 'success' };
    }

    if (FAILED === TOTAL) {
      return { content: 'All files failed to delete.', type: 'error' };
    }

    return {
      content: `${COMPLETE} files deleted, ${FAILED} files failed to delete.`,
      type: 'error',
    };
  },
};
