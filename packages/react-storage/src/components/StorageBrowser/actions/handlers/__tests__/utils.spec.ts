import { LocationAccess as AccessGrantLocation } from '../../../storage-internal';
import { LocationData } from '../types';

import {
  shouldExcludeLocation,
  getFileKey,
  parseAccessGrantLocation,
  getFilteredLocations,
  isFileItem,
  isFileDataItem,
  createFileDataItemFromLocation,
  createFileDataItem,
} from '../utils';

describe('utils', () => {
  const bucket = 'test-bucket';
  const folderPrefix = 'test-prefix/';
  const fileKey = 'some-file.jpeg2000';
  const id = 'intentionally-static-test-id';

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => id },
    });
  });

  describe('parseAccessGrantLocation', () => {
    it('throws if provided an invalid location scope', () => {
      const invalidLocation: AccessGrantLocation = {
        scope: 'nope',
        permission: 'READ',
        type: 'BUCKET',
      };

      expect(() => parseAccessGrantLocation(invalidLocation)).toThrow(
        'Invalid scope: nope'
      );
    });

    it('throws if provided an invalid location type', () => {
      const invalidLocation: AccessGrantLocation = {
        scope: 's3://yes',
        permission: 'READ',
        // @ts-expect-error intentional coercing to allow unhappy path test
        type: 'NOT_BUCKET',
      };

      expect(() => parseAccessGrantLocation(invalidLocation)).toThrow(
        'Invalid location type: NOT_BUCKET'
      );
    });

    it('throws if provided an invalid location permission', () => {
      const invalidLocation: AccessGrantLocation = {
        scope: `s3://${bucket}/*`,
        // @ts-expect-error force unhandled permission
        permission: 'INVALID',
        type: 'BUCKET',
      };

      expect(() => parseAccessGrantLocation(invalidLocation)).toThrow(
        'Invalid location permission'
      );
    });

    it('parses a BUCKET location as expected', () => {
      const location: AccessGrantLocation = {
        permission: 'WRITE',
        scope: `s3://${bucket}/*`,
        type: 'BUCKET',
      };
      const expected: LocationData = {
        bucket,
        id,
        prefix: '',
        permissions: ['delete', 'write'],
        type: 'BUCKET',
      };

      expect(parseAccessGrantLocation(location)).toStrictEqual(expected);
    });

    it('parses a PREFIX location as expected', () => {
      const location: AccessGrantLocation = {
        permission: 'WRITE',
        scope: `s3://${bucket}/${folderPrefix}*`,
        type: 'PREFIX',
      };

      const expected: LocationData = {
        bucket,
        id,
        prefix: folderPrefix,
        permissions: ['delete', 'write'],
        type: 'PREFIX',
      };

      expect(parseAccessGrantLocation(location)).toStrictEqual(expected);
    });

    it('parses an OBJECT location as expected', () => {
      const location: AccessGrantLocation = {
        permission: 'WRITE',
        scope: `s3://${bucket}/${folderPrefix}${fileKey}`,
        type: 'OBJECT',
      };

      const expected: LocationData = {
        bucket,
        id,
        prefix: `${folderPrefix}${fileKey}`,
        permissions: ['delete', 'write'],
        type: 'OBJECT',
      };

      expect(parseAccessGrantLocation(location)).toStrictEqual(expected);
    });
  });

  describe('getFileKey', () => {
    it('should return the filename without the path', () => {
      expect(getFileKey('/path/to/file.txt')).toBe('file.txt');
      expect(getFileKey('document.pdf')).toBe('document.pdf');
    });

    it('should handle paths with multiple slashes', () => {
      expect(getFileKey('/path//to///file.txt')).toBe('file.txt');
    });
  });

  describe('shouldExcludeLocation', () => {
    const location: LocationData = {
      bucket: 'bucket',
      id: 'id',
      permissions: ['list', 'get'],
      prefix: 'prefix/',
      type: 'PREFIX',
    };

    it('returns true when the provided location permissions match excluded permissions', () => {
      const output = shouldExcludeLocation(location, {
        exactPermissions: ['list', 'get'],
      });

      expect(output).toBe(true);
    });

    it('returns true when the provided location type match excluded type', () => {
      const output = shouldExcludeLocation(location, { type: 'PREFIX' });

      expect(output).toBe(true);
    });

    it('returns true when the provided location type is included in excluded types', () => {
      const output = shouldExcludeLocation(location, { type: ['PREFIX'] });

      expect(output).toBe(true);
    });

    it('returns false when provided a location without an exclude value', () => {
      const output = shouldExcludeLocation(location);

      expect(output).toBe(false);
    });
  });

  describe('getFilteredLocations', () => {
    it('should filter out non-folder-like prefix locations', () => {
      const locations: AccessGrantLocation[] = [
        {
          permission: 'WRITE',
          scope: `s3://${bucket}/${folderPrefix}*`,
          type: 'PREFIX',
        },
        {
          permission: 'WRITE',
          scope: `s3://${bucket}/non-folder-like-prefix*`,
          type: 'PREFIX',
        },
      ];

      expect(getFilteredLocations(locations)).toStrictEqual([
        expect.objectContaining({ prefix: folderPrefix }),
      ]);
    });
  });

  describe('createFileDataItem', () => {
    it('creates a FileDataItem from FileData', () => {
      expect(
        createFileDataItem({
          key: `prefix/${fileKey}`,
          lastModified: new Date(1),
          id,
          size: 0,
          type: 'FILE' as const,
        })
      ).toStrictEqual(expect.objectContaining({ fileKey }));
    });
  });

  describe('createFileDataItemFromLocation', () => {
    const location: LocationData = {
      bucket: 'bucket',
      id: 'id',
      permissions: ['list', 'get'],
      prefix: `prefix/${fileKey}`,
      type: 'OBJECT',
    };

    it('creates a FileDataItem from location', () => {
      expect(createFileDataItemFromLocation(location)).toStrictEqual(
        expect.objectContaining({
          id: location.id,
          type: 'FILE',
          key: location.prefix,
          fileKey,
          lastModified: expect.any(Date),
          size: 0,
        })
      );
    });
  });

  describe('isFileItem', () => {
    it('should return true if object is FileItem', () => {
      expect(isFileItem({ file: {} })).toBe(true);
      expect(isFileItem({})).toBe(false);
    });
  });

  describe('isFileDataItem', () => {
    it('should return true if object is FileDataItem', () => {
      expect(isFileDataItem({ fileKey: 'file-key' })).toBe(true);
      expect(isFileDataItem({})).toBe(false);
    });
  });
});
