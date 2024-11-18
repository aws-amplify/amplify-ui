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
    icon: 'copy-file',
    label: 'Copy',
  },
  displayName: 'Copy',
  handler: copyHandler,
};

export const deleteActionConfig: DeleteActionConfig = {
  componentName: 'DeleteView',
  actionsListItemConfig: {
    disable: (selected) => !selected,
    hide: (permissions) => !permissions.includes('delete'),
    icon: 'delete-file',
    label: 'Delete',
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
    label: 'Create folder',
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
  actionsListItemConfig: {
    disable: (selectedValues) => !!selectedValues,
    fileSelection: 'FILE',
    hide: (permissions) => !permissions.includes('write'),
    icon: 'upload-file',
    label: 'Upload',
  },
  isCancelable: true,
  includeProgress: true,
  handler: uploadHandler,
  displayName: 'Upload',
};

export const defaultActionViewConfigs = {
  copy: copyActionConfig,
  createFolder: createFolderActionConfig,
  delete: deleteActionConfig,
  upload: uploadActionConfig,
};

export type DefaultActionViewType = keyof typeof defaultActionViewConfigs;

export const DEFAULT_ACTION_VIEW_TYPES = Object.keys(
  defaultActionViewConfigs
) as DefaultActionViewType[];

export const isDefaultActionViewType = (
  value?: string
): value is DefaultActionViewType =>
  DEFAULT_ACTION_VIEW_TYPES.some((type) => type === value);

export const defaultActionConfigs = {
  ...defaultActionViewConfigs,
  listLocationItems: listLocationItemsActionConfig,
  listLocations: listLocationsActionConfig,
};
