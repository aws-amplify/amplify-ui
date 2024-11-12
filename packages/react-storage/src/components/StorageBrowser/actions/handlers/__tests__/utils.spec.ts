import { LocationAccess } from '../../../storage-internal';
import { LocationData } from '../types';

import {
  shouldExcludeLocation,
  getFileKey,
  parseLocationAccess,
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
    const invalidLocation: LocationAccess = {
      scope: 'nope',
      permission: 'READ',
      type: 'BUCKET',
    };

    expect(() => parseLocationAccess(invalidLocation)).toThrow(
      'Invalid scope: nope'
    );
  });

  it('throws if provided an invalid location type', () => {
    const invalidLocation: LocationAccess = {
      scope: 's3://yes',
      permission: 'READ',
      // @ts-expect-error intentional coercing to allow unhappy path test
      type: 'NOT_BUCKET',
    };

    expect(() => parseLocationAccess(invalidLocation)).toThrow(
      'Invalid location type: NOT_BUCKET'
    );
  });

  it('parses a BUCKET location as expected', () => {
    const location: LocationAccess = {
      permission: 'WRITE',
      scope: `s3://${bucket}/*`,
      type: 'BUCKET',
    };
    const expected: LocationData = {
      bucket,
      id,
      prefix: '',
      permission: 'WRITE',
      type: 'BUCKET',
    };

    expect(parseLocationAccess(location)).toStrictEqual(expected);
  });

  it('parses a PREFIX location as expected', () => {
    const location: LocationAccess = {
      permission: 'WRITE',
      scope: `s3://${bucket}/${folderPrefix}*`,
      type: 'PREFIX',
    };

    const expected: LocationData = {
      bucket,
      id,
      prefix: folderPrefix,
      permission: 'WRITE',
      type: 'PREFIX',
    };

    expect(parseLocationAccess(location)).toStrictEqual(expected);
  });

  it('parses an OBJECT location as expected', () => {
    const location: LocationAccess = {
      permission: 'WRITE',
      scope: `s3://${bucket}/${folderPrefix}${filePath}`,
      type: 'OBJECT',
    };

    const expected: LocationData = {
      bucket,
      id,
      prefix: `${folderPrefix}${filePath}`,
      permission: 'WRITE',
      type: 'OBJECT',
    };

    expect(parseLocationAccess(location)).toStrictEqual(expected);
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
  const location = {
    bucket: 'bucket',
    id: 'id',
    permission: 'READ',
    prefix: 'prefix/',
    type: 'PREFIX',
  } as const;

  it('returns true when the provided location permissions match excluded permissions', () => {
    const output = shouldExcludeLocation(location, 'READ');

    expect(output).toBe(true);
  });

  it('returns true when the provided location type match excluded type', () => {
    const output = shouldExcludeLocation(location, 'PREFIX');

    expect(output).toBe(true);
  });

  it('returns false when provided a location without an exclude value', () => {
    const output = shouldExcludeLocation(location);

    expect(output).toBe(false);
  });
});
