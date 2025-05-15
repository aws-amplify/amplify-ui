import {
  DEFAULT_RESOLVED_FILES,
  MAX_UPLOAD_OBJECT_SIZE,
  UPLOAD_FILE_SIZE_LIMIT,
} from '../constants';
import { resolveFiles } from '../resolveFiles';

const mockFile = (name: string, size?: number): File => {
  const file = new File([], name);
  if (size) {
    Object.defineProperty(file, 'size', { value: size });
  }
  return file;
};

const fileOne = mockFile('file-one');
const fileTwo = mockFile('file-two');
const invalidFileOne = mockFile('invalid-file-one', UPLOAD_FILE_SIZE_LIMIT + 1);
const invalidFileTwo = mockFile('invalid-file-two', UPLOAD_FILE_SIZE_LIMIT + 2);

describe('resolveFiles', () => {
  it('returns the default value when `files` is `undefined`', () => {
    const output = resolveFiles(undefined);

    expect(output).toStrictEqual(DEFAULT_RESOLVED_FILES);
  });

  it('returns the default value when `files` is an empty array', () => {
    const output = resolveFiles([]);

    expect(output).toStrictEqual(DEFAULT_RESOLVED_FILES);
  });

  it('returns the expected value when only valid files are provided', () => {
    const output = resolveFiles([fileOne, fileTwo]);
    const expected = {
      valid: [fileOne, fileTwo],
      invalid: undefined,
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected value when only invalid files are provided', () => {
    const output = resolveFiles([invalidFileOne, invalidFileTwo]);
    const expected = {
      valid: undefined,
      invalid: [invalidFileOne, invalidFileTwo],
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected value when valid and invalid files are provided', () => {
    const output = resolveFiles([
      invalidFileTwo,
      fileOne,
      invalidFileOne,
      fileTwo,
    ]);
    const expected = {
      valid: [fileOne, fileTwo],
      invalid: [invalidFileTwo, invalidFileOne],
    };
    expect(output).toStrictEqual(expected);
  });

  it('returns the expected value when a custom file validator function is provided', () => {
    const CUSTOM_FILE_SIZE_LIMIT = 1000 * 1000; // 1 MB

    const customFileValidator = (file: File) =>
      file.size <= CUSTOM_FILE_SIZE_LIMIT;

    const validFile = mockFile('valid-file', CUSTOM_FILE_SIZE_LIMIT);
    const invalidFileOne = mockFile('invalid-file', UPLOAD_FILE_SIZE_LIMIT - 1);
    const invalidFileTwo = mockFile('invalid-size', CUSTOM_FILE_SIZE_LIMIT + 1);

    const output = resolveFiles(
      [validFile, invalidFileTwo, invalidFileOne],
      customFileValidator
    );

    const expected = {
      valid: [validFile],
      invalid: [invalidFileTwo, invalidFileOne],
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected value when a file passes custom file validation but not storage validation', () => {
    const customFileValidator = (_file: File) => true;

    const invalidFile = mockFile('invalid-file', MAX_UPLOAD_OBJECT_SIZE + 1);

    const output = resolveFiles([invalidFile], customFileValidator);

    const expected = {
      valid: undefined,
      invalid: [invalidFile],
    };

    expect(output).toStrictEqual(expected);
  });
});
