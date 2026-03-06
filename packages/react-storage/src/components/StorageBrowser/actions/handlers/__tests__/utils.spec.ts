import { LocationAccess as AccessGrantLocation } from '../../../storage-internal';

import { MULTIPART_UPLOAD_THRESHOLD_BYTES } from '../constants';
import { LocationData } from '../types';

const mockGetConfig = jest.fn();
jest.mock('aws-amplify', () => ({
  Amplify: {
    getConfig: mockGetConfig,
  },
}));

import {
  createFileDataItem,
  deduplicateLocations,
  getBucketRegion,
  getFileKey,
  getFilteredLocations,
  isFileDataItem,
  isFileItem,
  isMultipartUpload,
  parseAccessGrantLocation,
  shouldExcludeLocation,
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

  describe('isMultipartUpload', () => {
    it('returns "true" for a `file.size` greater than the value of MULTIPART_UPLOAD_THRESHOLD_BYTES', () => {
      const output = isMultipartUpload({
        size: 1.1 * MULTIPART_UPLOAD_THRESHOLD_BYTES,
      } as File);
      expect(output).toBe(true);
    });

    it('returns "false" for a `file.size` equal to the value of MULTIPART_UPLOAD_THRESHOLD_BYTES', () => {
      const output = isMultipartUpload({
        size: MULTIPART_UPLOAD_THRESHOLD_BYTES,
      } as File);
      expect(output).toBe(false);
    });

    it('returns "false" for a `file.size` less than the value of MULTIPART_UPLOAD_THRESHOLD_BYTES', () => {
      const output = isMultipartUpload({
        size: MULTIPART_UPLOAD_THRESHOLD_BYTES / 2,
      } as File);
      expect(output).toBe(false);
    });
  });

  describe('deduplicateLocations', () => {
    it('returns all locations when there are no duplicates', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix1/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket2',
          id: 'id2',
          permissions: ['get', 'list'],
          prefix: 'prefix2/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(2);
      expect(result).toEqual(locations);
    });

    it('deduplicates READ + READWRITE, keeping READWRITE (superset)', () => {
      const locations: LocationData[] = [
        {
          bucket: 'idfc-sboms',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: '',
          type: 'BUCKET',
        },
        {
          bucket: 'idfc-sboms',
          id: 'id2',
          permissions: ['delete', 'get', 'list', 'write'],
          prefix: '',
          type: 'BUCKET',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(1);
      expect(result[0].permissions).toEqual(['delete', 'get', 'list', 'write']);
      expect(result[0].id).toBe('id2');
    });

    it('does NOT deduplicate READ + WRITE (not superset, keeps both)', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id2',
          permissions: ['delete', 'write'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(2);
      expect(result.find((l) => l.id === 'id1')).toBeDefined();
      expect(result.find((l) => l.id === 'id2')).toBeDefined();
    });

    it('keeps first location when permissions are identical', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id2',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('id1');
    });

    it('deduplicates when READWRITE is superset of READ and WRITE', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id2',
          permissions: ['delete', 'write'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id3',
          permissions: ['delete', 'get', 'list', 'write'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      // READWRITE is superset of both READ and WRITE, so only READWRITE should remain
      expect(result).toHaveLength(1);
      expect(result[0].permissions).toEqual(['delete', 'get', 'list', 'write']);
      expect(result[0].id).toBe('id3');
    });

    it('treats different prefixes as separate locations', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix1/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id2',
          permissions: ['delete', 'get', 'list', 'write'],
          prefix: 'prefix2/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(2);
    });

    it('treats different buckets as separate locations', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket2',
          id: 'id2',
          permissions: ['get', 'list'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(2);
    });

    it('handles empty location array', () => {
      const result = deduplicateLocations([]);
      expect(result).toEqual([]);
    });

    it('deduplicates WRITE + READWRITE, keeping READWRITE (superset)', () => {
      const locations: LocationData[] = [
        {
          bucket: 'bucket1',
          id: 'id1',
          permissions: ['delete', 'write'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
        {
          bucket: 'bucket1',
          id: 'id2',
          permissions: ['delete', 'get', 'list', 'write'],
          prefix: 'prefix/',
          type: 'PREFIX',
        },
      ];

      const result = deduplicateLocations(locations);
      expect(result).toHaveLength(1);
      expect(result[0].permissions).toEqual(['delete', 'get', 'list', 'write']);
      expect(result[0].id).toBe('id2');
    });
  });

  describe('getBucketRegion', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns bucket-specific region when found', () => {
      mockGetConfig.mockReturnValue({
        Storage: {
          S3: {
            buckets: {
              TestBucket: {
                bucketName: 'test-bucket',
                region: 'us-west-2',
              },
            },
          },
        },
      });

      const result = getBucketRegion('test-bucket', 'us-east-1');
      expect(result).toBe('us-west-2');
    });

    it('returns fallback region when bucket not found', () => {
      mockGetConfig.mockReturnValue({
        Storage: {
          S3: {
            buckets: {
              OtherBucket: {
                bucketName: 'other-bucket',
                region: 'us-west-2',
              },
            },
          },
        },
      });

      const result = getBucketRegion('test-bucket', 'us-east-1');
      expect(result).toBe('us-east-1');
    });

    it('returns fallback region when no buckets config', () => {
      mockGetConfig.mockReturnValue({
        Storage: {
          S3: {},
        },
      });

      const result = getBucketRegion('test-bucket', 'us-east-1');
      expect(result).toBe('us-east-1');
    });

    it('returns fallback region when getConfig throws error', () => {
      mockGetConfig.mockImplementation(() => {
        throw new Error('Config error');
      });

      const result = getBucketRegion('test-bucket', 'us-east-1');
      expect(result).toBe('us-east-1');
    });
  });
});
