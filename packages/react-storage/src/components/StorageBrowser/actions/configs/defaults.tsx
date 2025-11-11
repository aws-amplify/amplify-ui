/* eslint-disable no-console */
import { defaultHandlers } from '../handlers';

import type {
  CopyActionConfig,
  CreateFolderActionConfig,
  DeleteActionConfig,
  DownloadActionConfig,
  UploadActionConfig,
} from './types';

export const copyActionConfig: CopyActionConfig = {
  viewName: 'CopyView',
  actionListItem: {
    disable: (selected) => !selected || selected.length === 0,
    hide: (permissions) => !permissions.includes('write'),
    icon: 'copy-file',
    label: 'Copy',
  },
  handler: defaultHandlers.copy,
};

export const deleteActionConfig: DeleteActionConfig = {
  viewName: 'DeleteView',
  actionListItem: {
    disable: (selected) => {
      const hasNoSelection = !selected || selected.length === 0;

      console.log(
        '[folder-action] DELETE_CONFIG_PHASE-1: deleteActionConfig.disable - Evaluating delete availability',
        {
          selectedCount: selected?.length ?? 0,
          hasNoSelection,
          selectedItems:
            selected?.map((item) => ({
              id: item.id,
              type: item.type,
              key:
                item.key?.substring(0, 50) +
                (item.key?.length > 50 ? '...' : ''),
            })) ?? [],
          finalDisabled: hasNoSelection,
        }
      );

      return hasNoSelection;
    },
    hide: (permissions) => {
      const shouldHide = !permissions.includes('delete');

      console.log(
        '[folder-action] DELETE_CONFIG_PHASE-2: deleteActionConfig.hide - Evaluating delete visibility',
        {
          permissions,
          hasDeletePermission: permissions.includes('delete'),
          shouldHide,
        }
      );

      return shouldHide;
    },
    icon: 'delete-file',
    label: 'Delete',
  },
  handler: defaultHandlers.delete,
};

export const createFolderActionConfig: CreateFolderActionConfig = {
  viewName: 'CreateFolderView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'create-folder',
    label: 'Create folder',
  },
  handler: defaultHandlers.createFolder,
};

export const uploadActionConfig: UploadActionConfig = {
  viewName: 'UploadView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'upload-file',
    label: 'Upload',
  },
  handler: defaultHandlers.upload,
};

export const downloadActionConfig: DownloadActionConfig = {
  viewName: 'DownloadView',
  actionListItem: {
    disable: (selected) => {
      const hasNoSelection = !selected || selected.length === 0;
      const hasFolders =
        selected?.some((item) => item.type === 'FOLDER') ?? false;

      console.log(
        '[folder-action] ACTION_CONFIG_PHASE-1: downloadActionConfig.disable - Evaluating download availability',
        {
          selectedCount: selected?.length ?? 0,
          hasNoSelection,
          hasFolders,
          selectedTypes: selected?.map((item) => item.type) ?? [],
          finalDisabled: hasNoSelection || hasFolders,
        }
      );

      return hasNoSelection || hasFolders;
    },
    hide: (permissions) => {
      const shouldHide = !permissions.includes('get');
      console.log(
        '[folder-action] ACTION_CONFIG_PHASE-2: downloadActionConfig.hide - Evaluating download visibility',
        {
          permissions,
          hasGetPermission: permissions.includes('get'),
          shouldHide,
        }
      );
      return shouldHide;
    },
    icon: 'download',
    label: 'Download',
  },
  handler: defaultHandlers.download,
};

// Action view configs only, does not include `listLocationItems`
export const defaultActionViewConfigs = {
  copy: copyActionConfig,
  createFolder: createFolderActionConfig,
  download: downloadActionConfig,
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
  listLocationItems: defaultHandlers.listLocationItems,
};
