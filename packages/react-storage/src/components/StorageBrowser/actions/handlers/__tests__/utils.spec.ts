import { LocationAccess as AccessGrantLocation } from '../../../storage-internal';
import { LocationData } from '../types';

import {
  shouldExcludeLocation,
  getFileKey,
  parseAccessGrantLocation,
  getFolderPath,
  getFolderName,
} from '../utils';

describe('parseLocationAccess', () => {
  const bucket = 'test-bucket';
  const folderPrefix = 'test-prefix/';
  const filePath = 'some-file.jpeg2000';

  const id = 'intentionally-static-test-id';
  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => id },
    });
  });

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
      scope: `s3://${bucket}/${folderPrefix}${filePath}`,
      type: 'OBJECT',
    };

    const expected: LocationData = {
      bucket,
      id,
      prefix: `${folderPrefix}${filePath}`,
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

describe('folder functions', () => {
  describe('getFolderPath', () => {
    it('should return the parent folder path for a given folder key', () => {
      expect(getFolderPath('parent-folder/sub-folder/')).toBe('parent-folder/');
    });

    it('should handle root-level folder correctly', () => {
      expect(getFolderPath('root/')).toBe('');
    });

    it('should return an empty string for an empty key', () => {
      expect(getFolderPath('')).toBe('');
    });

    it('should handle nested folder paths correctly', () => {
      expect(getFolderPath('grandparent/parent/child/')).toBe(
        'grandparent/parent/'
      );
    });

    it('should handle multiple slashes', () => {
      expect(getFolderPath('grandparent/parent///child/')).toBe(
        'grandparent/parent///'
      );
    });
  });

  describe('getFolderName', () => {
    it('should return the folder name for a given folder key', () => {
      expect(getFolderName('parent-folder/sub-folder/')).toBe('sub-folder');
    });

    it('should handle root-level folder correctly', () => {
      expect(getFolderName('root/')).toBe('root');
    });

    it('should return an empty string for an empty key', () => {
      expect(getFolderName('')).toBe('');
    });

    it('should handle nested folder names correctly', () => {
      expect(getFolderName('grandparent/parent/child/')).toBe('child');
    });

    it('should handle multiple slashes', () => {
      expect(getFolderName('grandparent///parent/child/')).toBe('child');
    });
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

  it('returns false when provided a location without an exclude value', () => {
    const output = shouldExcludeLocation(location);

    expect(output).toBe(false);
  });
});
