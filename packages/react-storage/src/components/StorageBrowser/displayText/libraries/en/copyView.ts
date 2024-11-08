import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCopyViewDisplayText } from '../../types';

export const DEFAULT_COPY_VIEW_DISPLAY_TEXT: DefaultCopyViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Copy',
  actionStartLabel: 'Copy',
  overwriteWarningMessage:
    'Copy action might overwrite existing files at selected destination.',
  searchPlaceholder: 'Search for folders',
  getActionCompleteMessage: (_counts) => {
    return 'All copy operations complete.';
  },
  getFolderSelectedMessage: (key: string) => {
    return `Current folder selected: ${key}. There are no additional folders under this path.`;
  },
};
