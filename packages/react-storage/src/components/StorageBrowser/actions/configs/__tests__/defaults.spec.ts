import { ActionListItemConfig } from '../types';
import {
  createFolderActionConfig,
  defaultActionConfigs,
  listLocationItemsActionConfig,
  uploadActionConfig,
} from '../defaults';

const file = {
  key: 'key',
  lastModified: new Date(),
  size: 100,
  type: 'FILE' as const,
};

describe('defaultActionConfigs', () => {
  it('matches expected shape', () => {
    expect(defaultActionConfigs).toMatchSnapshot();
  });

  describe('createFolderActionConfig', () => {
    it('hides the action list item as expected', () => {
      const hide =
        (createFolderActionConfig.actionsListItemConfig as ActionListItemConfig)!
          .hide!;

      expect(hide('READ')).toBe(true);
      expect(hide('READWRITE')).toBe(false);
      expect(hide('WRITE')).toBe(false);
    });

    it('disables the action list item as expected', () => {
      const disable =
        (createFolderActionConfig.actionsListItemConfig as ActionListItemConfig)!
          .disable!;

      expect(disable([file])).toBe(true);
      expect(disable(undefined)).toBe(false);
    });
  });

  describe('listLocationItemsActionConfig', () => {
    it('returns the expected value of title', () => {
      const { title } = listLocationItemsActionConfig;

      expect(title(undefined, undefined)).toBe('-');
      expect(title('bucket', undefined)).toBe('bucket');
      expect(title('bucket', 'prefix/')).toBe('bucket: prefix/');
      expect(title('bucket', 'prefix/nested/')).toBe('bucket: ../nested/');
    });
  });

  describe('uploadActionConfig', () => {
    it('hides the action list item as expected', () => {
      const [uploadFileListItem, uploadFolderListItem] =
        uploadActionConfig.actionsListItemConfig as ActionListItemConfig[];

      expect(uploadFileListItem.hide?.('READ')).toBe(true);
      expect(uploadFileListItem.hide?.('READWRITE')).toBe(false);
      expect(uploadFileListItem.hide?.('WRITE')).toBe(false);

      expect(uploadFolderListItem.hide?.('READ')).toBe(true);
      expect(uploadFolderListItem.hide?.('READWRITE')).toBe(false);
      expect(uploadFolderListItem.hide?.('WRITE')).toBe(false);
    });

    it('disables the action list item as expected', () => {
      const [uploadFileListItem, uploadFolderListItem] =
        uploadActionConfig.actionsListItemConfig as ActionListItemConfig[];

      expect(uploadFileListItem.disable?.([file])).toBe(true);
      expect(uploadFileListItem.disable?.(undefined)).toBe(false);

      expect(uploadFolderListItem.disable?.([file])).toBe(true);
      expect(uploadFolderListItem.disable?.(undefined)).toBe(false);
    });
  });
});
