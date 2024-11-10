import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCreateFolderViewDisplayText } from '../../types';

export const DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT: DefaultCreateFolderViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'Create folder',
    actionStartLabel: 'Create folder',
    getValidationMessage: (_folderName) => {
      // @TODO: maybe add logic to check which character caused the failure
      return `Folder name cannot contain "/", ".", or ".."`;
    },
    getActionCompleteMessage: ({ FAILED }) => {
      if (FAILED > 0) {
        return 'There was an issue creating the folder.';
      }
      return 'Folder created.';
    },
  };
