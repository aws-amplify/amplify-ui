import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultDeleteViewDisplayText } from '../../types';

export const DEFAULT_DELETE_VIEW_DISPLAY_TEXT: DefaultDeleteViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Delete',
  actionStartLabel: 'Delete',
  getActionCompleteMessage: (_counts) => {
    return 'All delete operations complete.';
  },
};
