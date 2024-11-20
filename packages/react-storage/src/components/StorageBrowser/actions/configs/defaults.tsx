import {
  listLocationItemsHandler,
  createFolderHandler,
  uploadHandler,
  copyHandler,
  deleteHandler,
  downloadHandler,
} from '../handlers';

import {
  CopyActionConfig,
  CreateFolderActionConfig,
  DeleteActionConfig,
  UploadActionConfig,
} from './types';

export const copyActionConfig: CopyActionConfig = {
  viewName: 'CopyView',
  actionListItem: {
    disable: (selected) => !selected,
    hide: (permissions) => !permissions.includes('write'),
    icon: 'copy-file',
    label: 'Copy',
  },
  handler: copyHandler,
};

export const deleteActionConfig: DeleteActionConfig = {
  viewName: 'DeleteView',
  actionListItem: {
    disable: (selected) => !selected,
    hide: (permissions) => !permissions.includes('delete'),
    icon: 'delete-file',
    label: 'Delete',
  },
  handler: deleteHandler,
};

export const createFolderActionConfig: CreateFolderActionConfig = {
  viewName: 'CreateFolderView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'create-folder',
    label: 'Create folder',
  },
  handler: createFolderHandler,
};

export const uploadActionConfig: UploadActionConfig = {
  viewName: 'UploadView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'upload-file',
    label: 'Upload',
  },
  handler: uploadHandler,
};

export const defaultActionViewConfigs = {
  copy: copyActionConfig,
  createFolder: createFolderActionConfig,
  download: downloadHandler,
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
  listLocationItems: listLocationItemsHandler,
};
