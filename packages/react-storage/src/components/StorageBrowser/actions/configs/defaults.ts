import {
  listLocationItemsHandler,
  listLocationsHandler,
  createFolderHandler,
  uploadHandler,
} from '../handlers';
import {
  DefaultActionConfigs,
  ListLocationItemsActionConfig,
  ListLocationsActionConfig,
  CreateFolderActionConfig,
  UploadActionConfig,
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
};

export const listLocationItemsActionConfig: ListLocationItemsActionConfig = {
  componentName: 'LocationDetailView',
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
};

export const listLocationsActionConfig: ListLocationsActionConfig = {
  componentName: 'LocationsView',
  handler: listLocationsHandler,
  displayName: 'Home',
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
  includeProgress: true,
  handler: uploadHandler,
  displayName: 'Upload',
};

export const defaultActionConfigs: DefaultActionConfigs = {
  CreateFolder: createFolderActionConfig,
  ListLocationItems: listLocationItemsActionConfig,
  ListLocations: listLocationsActionConfig,
  Upload: uploadActionConfig,
};
