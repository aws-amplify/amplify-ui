import { DEFAULT_LIST_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultLocationsViewDisplayText } from '../../types';
import { LocationPermissions } from '../../../credentials/types';

export const DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT: DefaultLocationsViewDisplayText =
  {
    ...DEFAULT_LIST_VIEW_DISPLAY_TEXT,
    title: 'Home',
    searchPlaceholder: 'Filter folders and files',
    getListResultsMessage: () => 'lol',
    getPermissionName: (permissions: LocationPermissions) => {
      let text = '';
      if (permissions.includes('get') || permissions.includes('list')) {
        text = 'Read';
      }
      if (permissions.includes('write') || permissions.includes('delete')) {
        text = text ? 'Read/Write' : 'Write';
      }
      if (!text) {
        throw new Error(`invalid permission ${JSON.stringify(permissions)}`);
      }
      return text;
    },
    getDownloadLabel: (fileName: string) => `Download ${fileName}`,
    tableColumnBucketHeader: 'Bucket',
    tableColumnFolderHeader: 'Folder',
    tableColumnPermissionsHeader: 'Permissions',
    tableColumnActionsHeader: 'Actions',
  };
