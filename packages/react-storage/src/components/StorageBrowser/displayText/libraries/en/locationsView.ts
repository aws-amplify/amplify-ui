import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import type { LocationPermissions } from '../../../actions';
import type { DefaultLocationsViewDisplayText } from '../../types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

export const DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT: DefaultLocationsViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    title: 'Home',
    searchPlaceholder: 'Filter folders and files',
    getListLocationsResultMessage: (data) => {
      const {
        isLoading,
        items,
        hasExhaustedSearch,
        hasError = false,
        message,
      } = data ?? {};

      if (isLoading) {
        return undefined;
      }

      if (hasError) {
        return {
          type: 'error',
          content: message ?? DEFAULT_ERROR_MESSAGE,
        };
      }

      if (items?.length === 0 && !hasExhaustedSearch) {
        return {
          type: 'info',
          content: 'No folders or files.',
        };
      }

      if (hasExhaustedSearch) {
        return {
          type: 'info',
          content: `Showing results for up to the first 10,000 items.`,
        };
      }

      // TODO: add more cases as needed

      return undefined;
    },
    getPermissionName: (permissions: LocationPermissions) => {
      let text = '';
      if (permissions.includes('get') || permissions.includes('list')) {
        text = 'Read';
      }
      if (permissions.includes('write') || permissions.includes('delete')) {
        text = text ? 'Read/Write' : 'Write';
      }
      if (!text) {
        text = permissions.join('/');
      }
      return text;
    },
    getDownloadLabel: (fileName: string) => `Download ${fileName}`,
    tableColumnBucketHeader: 'Bucket',
    tableColumnFolderHeader: 'Folder',
    tableColumnPermissionsHeader: 'Permissions',
    tableColumnActionsHeader: 'Actions',
  };
