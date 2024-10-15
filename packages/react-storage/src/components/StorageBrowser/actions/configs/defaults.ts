import {
  listLocationItemsHandler,
  listLocationsHandler,
  createFolderHandler,
  uploadHandler,
} from '../handlers';
import {
  ListLocationItemsActionConfig,
  ListLocationsActionConfig,
  CreateFolderActionConfig,
  UploadActionConfig,
  ActionConfigs,
} from './types';

export const createFolderActionConfig: CreateFolderActionConfig = {
  componentName: 'CreateFolderView',
  actionsListItemConfig: {
    disable: (selected) => !!selected,
    hide: (permission) => permission === 'READ',
    icon: 'create-folder',
    label: 'Create Folder',
  },
  handler: createFolderHandler,
  isCancelable: false,
  displayName: 'Create Folder',
  type: 'SINGLE_ACTION',
};

export const listLocationItemsActionConfig: ListLocationItemsActionConfig = {
  componentName: 'ListLocationItemsView',
  handler: listLocationItemsHandler,
  displayName: (bucket, prefix) => {
    if (bucket && prefix) {
      const prefixes = prefix.split('/');
      return `${bucket}: ${
        prefixes.length > 2 ? `../${prefixes[prefixes.length - 2]}/` : prefix
      }`;
    }
    return !bucket ? '-' : bucket;
  },
  type: 'LIST_LOCATION_ITEMS',
};

export const listLocationsActionConfig: ListLocationsActionConfig = {
  componentName: 'ListLocationsView',
  handler: listLocationsHandler,
  displayName: 'Home',
  type: 'LIST_LOCATIONS',
};

export const uploadActionConfig: UploadActionConfig = {
  componentName: 'UploadView',
  actionsListItemConfig: [
    {
      disable: (selectedValues) => !!selectedValues,
      fileSelection: 'FILE',
      hide: (permission) => permission === 'READ',
      icon: 'upload-file',
      label: 'Upload File',
    },
    {
      disable: (selectedValues) => !!selectedValues,
      fileSelection: 'FOLDER',
      hide: (permission) => permission === 'READ',
      icon: 'upload-folder',
      label: 'Upload FOLDER',
    },
  ],
  isCancelable: true,
  handler: uploadHandler,
  displayName: 'Upload',
  type: 'BATCH_ACTION',
};

export const defaultActionConfigs: ActionConfigs = {
  CreateFolder: createFolderActionConfig,
  ListLocationItems: listLocationItemsActionConfig,
  ListLocations: listLocationsActionConfig,
  Upload: uploadActionConfig,
};
