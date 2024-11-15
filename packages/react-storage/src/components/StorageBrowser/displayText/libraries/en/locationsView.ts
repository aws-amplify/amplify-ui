import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationsViewDisplayText } from '../../types';
import { Permission } from '../../../storage-internal';

const PERMISSION_DISPLAY_TEXT: Record<Permission, string> = {
  READ: 'Read',
  WRITE: 'Write',
  READWRITE: 'Read/Write',
};

export const DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT: DefaultLocationsViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    title: 'Home',
    searchPlaceholder: 'Filter folders and files',
    getListLocationsResultMessage: (data) => {
      const { locations, hasExhaustedSearch, errorMessage, query } = data ?? {};

      if (errorMessage !== undefined) {
        return {
          type: 'error',
          content: errorMessage,
        };
      }

      if (locations?.length === 0 && !hasExhaustedSearch) {
        return {
          type: 'info',
          content: 'No folders or files.',
        };
      }

      if (query && hasExhaustedSearch) {
        return {
          type: 'warning',
          content: 'No more folders or files found.',
        };
      }

      // TODO: add more cases as needed

      return undefined;
    },
    getPermissionsDisplayValue: (permission: Permission) =>
      PERMISSION_DISPLAY_TEXT[permission] ?? permission,
    getDownloadLabel: (fileName: string) => `Download ${fileName}`,
    tableColumnBucketHeader: 'Bucket',
    tableColumnFolderHeader: 'Folder',
    tableColumnPermissionsHeader: 'Permissions',
    tableColumnActionsHeader: 'Actions',
  };
