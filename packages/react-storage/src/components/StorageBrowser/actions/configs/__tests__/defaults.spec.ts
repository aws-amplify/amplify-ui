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

    it('is never disabled', () => {
      const disable =
        (createFolderActionConfig.actionsListItemConfig as ActionListItemConfig)!
          .disable!;

      expect(disable([])).toBe(false);
      expect(disable([file])).toBe(false);
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

    it('is never disabled', () => {
      const uploadFileListItem = uploadActionConfig.actionsListItemConfig!;

      expect(uploadFileListItem.disable?.([])).toBe(false);
      expect(uploadFileListItem.disable?.([file])).toBe(false);
      expect(uploadFileListItem.disable?.(undefined)).toBe(false);
    });
  });

  describe('deleteActionConfig', () => {
    it('hides the action list item as expected', () => {
      const deleteFileListItem =
        defaultActionConfigs.delete.actionsListItemConfig!;

      for (const permissionsWithoutDelete of generateCombinations(
        LOCATION_PERMISSION_VALUES.filter((value) => value !== 'delete')
      )) {
        const permissionsWithDelete = [
          ...permissionsWithoutDelete,
          'delete' as const,
        ];
        expect(deleteFileListItem.hide?.(permissionsWithoutDelete)).toBe(true);
        expect(deleteFileListItem.hide?.(permissionsWithDelete)).toBe(false);
      }
    });

    it('is disabled when no files are selected', () => {
      const deleteFileListItem =
        defaultActionConfigs.delete.actionsListItemConfig!;

      expect(deleteFileListItem.disable?.(undefined)).toBe(true);
      expect(deleteFileListItem.disable?.([])).toBe(true);
      expect(deleteFileListItem.disable?.([file])).toBe(false);
    });
  });

  describe('copyActionConfig', () => {
    it('hides the action list item as expected', () => {
      const copyFileListItem = defaultActionConfigs.copy.actionsListItemConfig!;

      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        const permissionsWithWrite = [
          ...permissionValuesWithoutWrite,
          'write' as const,
        ];
        expect(copyFileListItem.hide?.(permissionsWithoutWrite)).toBe(true);
        expect(copyFileListItem.hide?.(permissionsWithWrite)).toBe(false);
      }
    });

    it('is disabled when no files are selected', () => {
      const copyFileListItem = defaultActionConfigs.copy.actionsListItemConfig!;

      expect(copyFileListItem.disable?.(undefined)).toBe(true);
      expect(copyFileListItem.disable?.([])).toBe(true);
      expect(copyFileListItem.disable?.([file])).toBe(false);
    });
  });
});
