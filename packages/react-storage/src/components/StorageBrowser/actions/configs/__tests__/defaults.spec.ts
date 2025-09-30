import { defaultActionConfigs } from '../defaults';
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

  describe('createFolder', () => {
    const { disable, hide } = defaultActionConfigs.createFolder.actionListItem;
    it('hides the action list item as expected', () => {
      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        expect(hide?.(permissionsWithoutWrite)).toBe(true);
        expect(hide?.([...permissionValuesWithoutWrite, 'write'])).toBe(false);
      }
    });

    it('is never disabled', () => {
      expect(disable).toBeUndefined();
    });
  });

  describe('upload', () => {
    const { disable, hide } = defaultActionConfigs.upload.actionListItem;
    it('hides the action list item as expected', () => {
      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        const permissionsWithWrite = [
          ...permissionValuesWithoutWrite,
          'write' as const,
        ];
        expect(hide?.(permissionsWithoutWrite)).toBe(true);
        expect(hide?.(permissionsWithWrite)).toBe(false);
      }
    });

    it('is never disabled', () => {
      expect(disable).toBeUndefined();
    });
  });

  describe('delete', () => {
    const { disable, hide } = defaultActionConfigs.delete.actionListItem;
    it('hides the action list item as expected', () => {
      for (const permissionsWithoutDelete of generateCombinations(
        LOCATION_PERMISSION_VALUES.filter((value) => value !== 'delete')
      )) {
        const permissionsWithDelete = [
          ...permissionsWithoutDelete,
          'delete' as const,
        ];
        expect(hide?.(permissionsWithoutDelete)).toBe(true);
        expect(hide?.(permissionsWithDelete)).toBe(false);
      }
    });

    it('is disabled when no files are selected', () => {
      expect(disable?.(undefined)).toBe(true);
      expect(disable?.([])).toBe(true);
      expect(disable?.([file])).toBe(false);
    });
  });

  describe('download', () => {
    const { disable, hide } = defaultActionConfigs.download.actionListItem;
    it('hides the action list item as expected', () => {
      for (const permissionsWithoutDownload of generateCombinations(
        LOCATION_PERMISSION_VALUES.filter((value) => value !== 'get')
      )) {
        const permissionsWithDownload = [
          ...permissionsWithoutDownload,
          'get' as const,
        ];
        expect(hide?.(permissionsWithoutDownload)).toBe(true);
        expect(hide?.(permissionsWithDownload)).toBe(false);
      }
    });

    it('is disabled when no files are selected', () => {
      expect(disable?.(undefined)).toBe(true);
      expect(disable?.([])).toBe(true);
      expect(disable?.([file])).toBe(false);
    });
  });

  describe('copy', () => {
    const { disable, hide } = defaultActionConfigs.copy.actionListItem;
    it('hides the action list item as expected', () => {
      for (const permissionsWithoutWrite of generateCombinations(
        permissionValuesWithoutWrite
      )) {
        const permissionsWithWrite = [
          ...permissionValuesWithoutWrite,
          'write' as const,
        ];
        expect(hide?.(permissionsWithoutWrite)).toBe(true);
        expect(hide?.(permissionsWithWrite)).toBe(false);
      }
    });

    it('is disabled when no files are selected', () => {
      expect(disable?.(undefined)).toBe(true);
      expect(disable?.([])).toBe(true);
      expect(disable?.([file])).toBe(false);
    });
  });
});
