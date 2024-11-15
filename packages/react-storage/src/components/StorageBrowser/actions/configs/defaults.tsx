import {
  listLocationItemsHandler,
  listLocationsHandler,
  createFolderHandler,
  uploadHandler,
  copyHandler,
  deleteHandler,
} from '../handlers';

import {
  CopyActionConfig,
  CreateFolderActionConfig,
  DeleteActionConfig,
  ListLocationItemsActionConfig,
  ListLocationsActionConfig,
  UploadActionConfig,
} from './types';

export const copyActionConfig: CopyActionConfig = {
  componentName: 'CopyView',
  actionsListItemConfig: {
    disable: (selected) => !selected,
    hide: (permissions) => !permissions.includes('write'),
    // missing copy icon
    icon: 'download',
    label: 'Copy Files',
  },
  displayName: 'Copy',
  handler: copyHandler,
};

export const deleteActionConfig: DeleteActionConfig = {
  componentName: 'DeleteView',
  actionsListItemConfig: {
    disable: (selected) => !selected,
    hide: (permissions) => !permissions.includes('delete'),
    icon: 'delete',
    label: 'Delete Files',
  },
  displayName: 'Delete',
  handler: deleteHandler,
};

export const createFolderActionConfig: CreateFolderActionConfig = {
  componentName: 'CreateFolderView',
  actionsListItemConfig: {
    disable: (selected) => !!selected,
    hide: (permissions) => !permissions.includes('write'),
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
      hide: (permissions) => !permissions.includes('write'),
      icon: 'upload-file',
      label: 'Upload File',
    },
    {
      disable: (selectedValues) => !!selectedValues,
      fileSelection: 'FOLDER',
      hide: (permissions) => !permissions.includes('write'),
      icon: 'upload-folder',
      label: 'Upload FOLDER',
    },
  ],
  isCancelable: true,
  includeProgress: true,
  handler: uploadHandler,
  displayName: 'Upload',
};

export const defaultActionConfigs = {
  // copy: copyActionConfig,
  createFolder: createFolderActionConfig,
  delete: deleteActionConfig,
  listLocationItems: listLocationItemsActionConfig,
  listLocations: listLocationsActionConfig,
  upload: uploadActionConfig,
};
