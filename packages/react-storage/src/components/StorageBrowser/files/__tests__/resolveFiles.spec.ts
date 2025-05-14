import { DEFAULT_RESOLVED_FILES, UPLOAD_FILE_SIZE_LIMIT } from '../constants';
import { resolveFiles } from '../resolveFiles';

const mockFile = (name: string, size?: number, type?: string): File => {
  const file = new File([], name, { type });
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
    const validFile = mockFile('valid-file', 5 * 1000, 'image/png');
    const invalidFile = mockFile('invalid-file', UPLOAD_FILE_SIZE_LIMIT - 1);
    const invalidSizeFile = mockFile(
      'invalid-size',
      5 * 1000 * 1000,
      'image/png'
    );
    const invalidTypeFile = mockFile(
      'invalid-type',
      5 * 1000,
      'application/pdf'
    );

    const customFileValidator = (file: File) => {
      const validFileSize = file.size <= 1000 * 1000;
      const onlyImages = ['image/gif', 'image/jpeg', 'image/png'].includes(
        file.type
      );
      return validFileSize && onlyImages;
    };

    const output = resolveFiles(
      [validFile, invalidSizeFile, invalidFile, invalidTypeFile],
      customFileValidator
    );

    const expected = {
      valid: [validFile],
      invalid: [invalidSizeFile, invalidFile, invalidTypeFile],
    };

    expect(output).toStrictEqual(expected);
  });
});
