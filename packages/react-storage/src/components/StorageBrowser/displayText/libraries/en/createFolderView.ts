import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCreateFolderViewDisplayText } from '../../types';

export const DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT: DefaultCreateFolderViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'Create folder',
    actionStartLabel: 'Create folder',
    getValidationMessage: (_error) => {
      // @TODO: maybe add logic to check which character caused the failure
      return `Folder name must be at least one character and cannot contain a "/", ".", or ".."`;
    },
    getActionCompleteMessage: (_counts) => {
      return 'Folder created.';
    },
    getActionFailedMessage: (_error) => {
      return 'There was an issue creating the folder.';
    },
  };
