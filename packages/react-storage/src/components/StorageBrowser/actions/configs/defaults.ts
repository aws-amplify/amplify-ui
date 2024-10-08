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
  actionsListItemConfig: {
    disable: (selected) => !!selected,
    hide: (permission) => permission === 'READ',
    icon: 'create-folder',
    label: 'Create Folder',
  },
  handler: createFolderHandler,
  isCancelable: false,
  title: 'Create Folder',
  type: 'SINGLE_ACTION',
};

export const listLocationItemsActionConfig: ListLocationItemsActionConfig = {
  handler: listLocationItemsHandler,
  title: (bucket, prefix) => {
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
  handler: listLocationsHandler,
  title: 'Home',
  type: 'LIST_LOCATIONS',
};

export const uploadActionConfig: UploadActionConfig = {
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
  title: 'Upload',
  type: 'BATCH_ACTION',
};

export const defaultActionConfigs: ActionConfigs = {
  CreateFolder: createFolderActionConfig,
  ListLocationItems: listLocationItemsActionConfig,
  ListLocations: listLocationsActionConfig,
  Upload: uploadActionConfig,
};
