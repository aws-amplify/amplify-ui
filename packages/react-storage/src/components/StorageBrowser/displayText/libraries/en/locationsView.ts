import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationsViewDisplayText } from '../../types';
import { Permission } from '../../../storage-internal';

const PERMISSION_DISPLAY_TEXT: Record<Permission, string> = {
  READ: 'Read',
  WRITE: 'Write',
  READWRITE: 'Read/Write',
};

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

export const DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT: DefaultLocationsViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    title: 'Home',
    searchPlaceholder: 'Filter folders and files',
    getListLocationsResultMessage: (data) => {
      const {
        locations,
        query,
        hasExhaustedSearch,
        hasError = false,
        errorMessage,
      } = data ?? {};

      if (hasError) {
        return {
          type: 'error',
          content: errorMessage ?? DEFAULT_ERROR_MESSAGE,
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
          content: `No more folders or files found by ${query}.`,
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
