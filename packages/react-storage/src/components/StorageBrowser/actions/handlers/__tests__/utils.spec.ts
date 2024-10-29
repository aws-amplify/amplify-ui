import * as StorageModule from 'aws-amplify/storage';

import { LocationAccess, LocationData } from '../types';

import { parseLocationAccess, resolveHandlerResult } from '../utils';

const isCancelErrorSpy = jest.spyOn(StorageModule, 'isCancelError');

const onCancel = jest.fn();
const onComplete = jest.fn();
const onError = jest.fn();

const key = 'hello.png';

describe('resolveHandlerResult', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    const result = Promise.resolve();
    const output = resolveHandlerResult({ result, isCancelable: false, key });

    expect(await output).toBe('COMPLETE');
  });

  it('returns "OVERWRITE_PREVENTED" on `PreconditionFailed` error', async () => {
    const mockError = new Error();
    mockError.name = 'PreconditionFailed';
    const mockResult = Promise.reject(mockError);

    const result = await resolveHandlerResult({
      result: mockResult,
      isCancelable: false,
      key,
    });

    expect(result).toBe('OVERWRITE_PREVENTED');
  });

  it('calls `onComplete` as expected', async () => {
    const result = Promise.resolve();

    await resolveHandlerResult({
      result,
      isCancelable: false,
      key,
      options: { onComplete },
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(key);
  });

  it('behaves as expected on error', async () => {
    const result = Promise.reject(new Error());
    const output = resolveHandlerResult({ result, isCancelable: false, key });

    expect(await output).toBe('FAILED');
  });

  it('calls `onError` as expected', async () => {
    const error = new Error('oh no!');
    const result = Promise.reject(error);

    await resolveHandlerResult({
      result,
      isCancelable: false,
      key,
      options: { onError },
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(key, error.message);
  });

  it('behaves as expected on cancelation', async () => {
    isCancelErrorSpy.mockReturnValueOnce(true);

    const result = Promise.reject(new Error());
    const output = resolveHandlerResult({ result, isCancelable: true, key });

    expect(await output).toBe('CANCELED');
  });

  it('calls `onCancel` as expected', async () => {
    isCancelErrorSpy.mockReturnValueOnce(true);

    const result = Promise.reject(new Error());

    await resolveHandlerResult({
      result,
      isCancelable: true,
      key,
      options: { onCancel },
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledWith(key);
  });
});

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
