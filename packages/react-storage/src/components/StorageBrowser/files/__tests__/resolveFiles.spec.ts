import { DEFAULT_RESOLVED_FILES, UPLOAD_FILE_SIZE_LIMIT } from '../constants';
import { resolveFiles } from '../resolveFiles';

const fileOne = new File([], 'file-one');
const fileTwo = new File([], 'file-two');
const invalidFileOne = {
  ...new File([], 'invalid-file-one'),
  size: UPLOAD_FILE_SIZE_LIMIT + 1,
};
const invalidFileTwo = {
  ...new File([], 'invalid-file-two'),
  size: UPLOAD_FILE_SIZE_LIMIT + 2,
};

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
});
