import { LocationAccess, LocationData } from '../types';

import { parseLocationAccess } from '../utils';

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
