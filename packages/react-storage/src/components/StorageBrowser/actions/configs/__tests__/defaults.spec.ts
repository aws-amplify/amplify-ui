import { ActionListItemConfig } from '../types';
import {
  createFolderActionConfig,
  defaultActionConfigs,
  listLocationItemsActionConfig,
  uploadActionConfig,
} from '../defaults';
import {
  generateCombinations,
  LOCATION_PERMISSION_VALUES,
} from '../../__testUtils__/permissions';

const file = {
  key: 'key',
  id: 'id',
  lastModified: new Date(),
  size: 100,
  type: 'FILE' as const,
};

const permissionValuesWithoutWrite = LOCATION_PERMISSION_VALUES.filter(
  (value) => value !== 'write'
);

describe('defaultActionConfigs', () => {
  it('matches expected shape', () => {
    expect(defaultActionConfigs).toMatchSnapshot();
  });

  describe('createFolderActionConfig', () => {
    it('hides the action list item as expected', () => {
      const hide =
        (createFolderActionConfig.actionsListItemConfig as ActionListItemConfig)!
          .hide!;
      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        expect(hide(permissionsWithoutWrite)).toBe(true);
        expect(hide([...permissionValuesWithoutWrite, 'write'])).toBe(false);
      }
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
      const { displayName } = listLocationItemsActionConfig;

      expect(displayName(undefined, undefined)).toBe('-');
      expect(displayName('bucket', undefined)).toBe('bucket');
      expect(displayName('bucket', 'prefix/')).toBe('bucket: prefix/');
      expect(displayName('bucket', 'prefix/nested/')).toBe(
        'bucket: ../nested/'
      );
    });
  });

  describe('uploadActionConfig', () => {
    it('hides the action list item as expected', () => {
      const uploadFileListItem = uploadActionConfig.actionsListItemConfig!;

      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        const permissionsWithWrite = [
          ...permissionValuesWithoutWrite,
          'write' as const,
        ];
        expect(uploadFileListItem.hide?.(permissionsWithoutWrite)).toBe(true);
        expect(uploadFileListItem.hide?.(permissionsWithWrite)).toBe(false);
      }
    });

    it('disables the action list item as expected', () => {
      const uploadFileListItem = uploadActionConfig.actionsListItemConfig!;

      expect(uploadFileListItem.disable?.([file])).toBe(true);
      expect(uploadFileListItem.disable?.(undefined)).toBe(false);
    });
  });
});
