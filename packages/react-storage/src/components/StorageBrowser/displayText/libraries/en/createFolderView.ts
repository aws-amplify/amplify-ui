import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultCreateFolderViewDisplayText } from '../../types';

export const DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT: DefaultCreateFolderViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'Create folder',
    actionStartLabel: 'Create folder',
    folderNameLabel: 'Folder name',
    folderNamePlaceholder:
      'Folder name cannot contain "/", nor end or start with "."',
    getValidationMessage: () =>
      'Folder name cannot contain "/", nor end or start with "."',
    getActionCompleteMessage: (data) => {
      const { counts } = data ?? {};
      const { FAILED, OVERWRITE_PREVENTED } = counts ?? {};

      if (OVERWRITE_PREVENTED) {
        return {
          content: 'A folder already exists with the provided name',
          type: 'warning',
        };
      }

      if (FAILED) {
        return {
          content: 'There was an issue creating the folder.',
          type: 'error',
        };
      }

      return { content: 'Folder created.', type: 'success' };
    },
  };
