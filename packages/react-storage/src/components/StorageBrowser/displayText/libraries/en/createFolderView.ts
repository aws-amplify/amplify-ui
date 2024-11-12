import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultCreateFolderViewDisplayText } from '../../types';

export const DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT: DefaultCreateFolderViewDisplayText =
  {
    ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
    title: 'Create folder',
    actionStartLabel: 'Create folder',
    folderNameLabel: 'Enter folder name:',
    folderNamePlaceholder: 'Folder name',
    getValidationMessage: () =>
      'Folder name cannot contain a "/" or "." character',
    getActionCompleteMessage: ({ OVERWRITE_PREVENTED, FAILED }) =>
      OVERWRITE_PREVENTED > 0
        ? 'A folder already exists with the provided name'
        : FAILED > 0
        ? 'There was an issue creating the folder.'
        : 'Folder created.',
  };
